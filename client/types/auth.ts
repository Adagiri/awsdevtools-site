export interface User {
  id: string;
  email: string;
  githubId?: string;
  mfaEnabled: boolean;
  mfaSecret?: string;
  backupCodes?: string[];
  mfaForMutations: boolean;
  lastLogin: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  requireMFA: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface MFASetup {
  secret: string;
  qrCode: string;
  backupCodes: string[];
}

export interface AuditLog {
  userId: string;
  action: 'login' | 'mfa' | 'tool_enable' | 'settings_change' | 'account_switch';
  ip: string;
  userAgent: string;
  success: boolean;
  timestamp: string;
  metadata?: Record<string, any>;
}