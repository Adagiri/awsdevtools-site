import { STSClient, AssumeRoleCommand } from '@aws-sdk/client-sts';
import { AWSCredentials, AssumeRoleParams, AWSError } from '@/types/aws';

const stsClient = new STSClient({
  region: process.env.AWS_REGION || 'us-east-1',
});

export class AssumeRoleService {
  async assumeRole(params: AssumeRoleParams): Promise<AWSCredentials> {
    try {
      const command = new AssumeRoleCommand({
        RoleArn: params.roleArn,
        RoleSessionName: params.sessionName,
        ExternalId: params.externalId,
        DurationSeconds: params.durationSeconds || 3600,
      });

      const response = await stsClient.send(command);

      if (!response.Credentials) {
        throw new Error('Failed to assume role: No credentials returned');
      }

      return {
        accessKeyId: response.Credentials.AccessKeyId!,
        secretAccessKey: response.Credentials.SecretAccessKey!,
        sessionToken: response.Credentials.SessionToken!,
        expiration: response.Credentials.Expiration!.toISOString(),
      };
    } catch (error: any) {
      throw this.handleAWSError(error);
    }
  }

  private handleAWSError(error: any): AWSError {
    const awsError: AWSError = {
      code: error.name || 'UnknownError',
      message: error.message || 'An unknown error occurred',
      statusCode: error.$metadata?.httpStatusCode || 500,
      retryable: this.isRetryableError(error),
    };

    return awsError;
  }

  private isRetryableError(error: any): boolean {
    const retryableCodes = [
      'Throttling',
      'ThrottlingException',
      'ServiceUnavailable',
      'InternalError',
      'RequestTimeout',
    ];

    return retryableCodes.includes(error.name) || 
           (error.$metadata?.httpStatusCode >= 500);
  }

  async validateRole(roleArn: string, externalId: string): Promise<boolean> {
    try {
      await this.assumeRole({
        roleArn,
        externalId,
        sessionName: 'awsdevtools-validation',
        durationSeconds: 900, // 15 minutes minimum
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}

export const assumeRoleService = new AssumeRoleService();