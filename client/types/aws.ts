export interface AWSAccount {
  userId: string;
  accountId: string;
  accountName: string;
  roleArn: string;
  externalId: string;
  status: 'active' | 'pending' | 'error';
  connectedAt: string;
  region?: string;
}

export interface AWSCredentials {
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken: string;
  expiration: string;
}

export interface AssumeRoleParams {
  roleArn: string;
  externalId: string;
  sessionName: string;
  durationSeconds?: number;
}

export interface AWSError {
  code: string;
  message: string;
  statusCode: number;
  retryable: boolean;
}