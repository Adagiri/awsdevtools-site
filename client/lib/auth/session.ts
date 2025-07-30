import { User } from '@/types/auth';
import { usersService } from '@/lib/db/dynamodb';
import { sign, verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '24h';
const REFRESH_TOKEN_EXPIRES_IN = '7d';

export interface SessionData {
  userId: string;
  email: string;
  mfaVerified: boolean;
  lastMfaVerification?: string;
}

export class SessionService {
  generateTokens(user: User, mfaVerified: boolean = false) {
    const sessionData: SessionData = {
      userId: user.id,
      email: user.email,
      mfaVerified,
      lastMfaVerification: mfaVerified ? new Date().toISOString() : undefined,
    };

    const accessToken = sign(sessionData, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    const refreshToken = sign(
      { userId: user.id, type: 'refresh' },
      JWT_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
    );

    return { accessToken, refreshToken };
  }

  verifyToken(token: string): SessionData {
    try {
      const decoded = verify(token, JWT_SECRET) as SessionData;
      return decoded;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  async refreshSession(refreshToken: string) {
    try {
      const decoded = verify(refreshToken, JWT_SECRET) as any;
      
      if (decoded.type !== 'refresh') {
        throw new Error('Invalid refresh token');
      }

      const user = await usersService.get(`USER#${decoded.userId}`, 'PROFILE');
      if (!user) {
        throw new Error('User not found');
      }

      return this.generateTokens(user as User, false);
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  requiresMFA(sessionData: SessionData, user: User): boolean {
    if (!user.mfaEnabled) return false;

    // Always require MFA on login
    if (!sessionData.mfaVerified) return true;

    // Check if MFA grace period has expired (5 minutes)
    if (sessionData.lastMfaVerification) {
      const lastMfa = new Date(sessionData.lastMfaVerification);
      const now = new Date();
      const gracePeriod = 5 * 60 * 1000; // 5 minutes in milliseconds
      
      return (now.getTime() - lastMfa.getTime()) > gracePeriod;
    }

    return true;
  }

  requiresMFAForMutation(sessionData: SessionData, user: User): boolean {
    if (!user.mfaForMutations) return false;
    return this.requiresMFA(sessionData, user);
  }

  updateMFAVerification(sessionData: SessionData): SessionData {
    return {
      ...sessionData,
      mfaVerified: true,
      lastMfaVerification: new Date().toISOString(),
    };
  }
}

export const sessionService = new SessionService();