import { authenticator } from 'otplib';
import { toDataURL } from 'qrcode';
import { randomBytes } from 'crypto';

export class MFAService {
  generateSecret(): string {
    return authenticator.generateSecret();
  }

  async generateQRCode(email: string, secret: string): Promise<string> {
    const service = 'AWS Dev Tools';
    const otpauth = authenticator.keyuri(email, service, secret);
    return await toDataURL(otpauth);
  }

  verifyToken(token: string, secret: string): boolean {
    try {
      return authenticator.verify({ token, secret });
    } catch (error) {
      return false;
    }
  }

  generateBackupCodes(count: number = 10): string[] {
    const codes: string[] = [];
    for (let i = 0; i < count; i++) {
      const code = randomBytes(4).toString('hex').toUpperCase();
      codes.push(`${code.slice(0, 4)}-${code.slice(4)}`);
    }
    return codes;
  }

  verifyBackupCode(code: string, backupCodes: string[]): boolean {
    const normalizedCode = code.replace(/\s|-/g, '').toUpperCase();
    return backupCodes.some(backupCode => 
      backupCode.replace(/\s|-/g, '').toUpperCase() === normalizedCode
    );
  }

  removeUsedBackupCode(code: string, backupCodes: string[]): string[] {
    const normalizedCode = code.replace(/\s|-/g, '').toUpperCase();
    return backupCodes.filter(backupCode => 
      backupCode.replace(/\s|-/g, '').toUpperCase() !== normalizedCode
    );
  }

  encryptSecret(secret: string): string {
    // In production, use proper encryption with AWS KMS
    return Buffer.from(secret).toString('base64');
  }

  decryptSecret(encryptedSecret: string): string {
    // In production, use proper decryption with AWS KMS
    return Buffer.from(encryptedSecret, 'base64').toString();
  }
}

export const mfaService = new MFAService();