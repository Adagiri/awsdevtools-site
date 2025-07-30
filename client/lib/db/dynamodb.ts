import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, PutCommand, QueryCommand, UpdateCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1',
});

export const docClient = DynamoDBDocumentClient.from(client);

export class DynamoDBService {
  private tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  async get(pk: string, sk?: string) {
    const params = {
      TableName: this.tableName,
      Key: sk ? { PK: pk, SK: sk } : { PK: pk },
    };

    const result = await docClient.send(new GetCommand(params));
    return result.Item;
  }

  async put(item: Record<string, any>) {
    const params = {
      TableName: this.tableName,
      Item: item,
    };

    await docClient.send(new PutCommand(params));
    return item;
  }

  async query(pk: string, skPrefix?: string, options: {
    limit?: number;
    scanIndexForward?: boolean;
    exclusiveStartKey?: Record<string, any>;
  } = {}) {
    const params: any = {
      TableName: this.tableName,
      KeyConditionExpression: 'PK = :pk',
      ExpressionAttributeValues: {
        ':pk': pk,
      },
      ...options,
    };

    if (skPrefix) {
      params.KeyConditionExpression += ' AND begins_with(SK, :sk)';
      params.ExpressionAttributeValues[':sk'] = skPrefix;
    }

    const result = await docClient.send(new QueryCommand(params));
    return {
      items: result.Items || [],
      lastEvaluatedKey: result.LastEvaluatedKey,
      count: result.Count || 0,
    };
  }

  async update(pk: string, sk: string, updates: Record<string, any>) {
    const updateExpression = Object.keys(updates)
      .map(key => `#${key} = :${key}`)
      .join(', ');

    const expressionAttributeNames = Object.keys(updates).reduce((acc, key) => {
      acc[`#${key}`] = key;
      return acc;
    }, {} as Record<string, string>);

    const expressionAttributeValues = Object.keys(updates).reduce((acc, key) => {
      acc[`:${key}`] = updates[key];
      return acc;
    }, {} as Record<string, any>);

    const params = {
      TableName: this.tableName,
      Key: { PK: pk, SK: sk },
      UpdateExpression: `SET ${updateExpression}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW' as const,
    };

    const result = await docClient.send(new UpdateCommand(params));
    return result.Attributes;
  }

  async delete(pk: string, sk: string) {
    const params = {
      TableName: this.tableName,
      Key: { PK: pk, SK: sk },
    };

    await docClient.send(new DeleteCommand(params));
  }
}

// Service instances
export const usersService = new DynamoDBService('awsdevtools-users');
export const accountsService = new DynamoDBService('awsdevtools-accounts');
export const toolsService = new DynamoDBService('awsdevtools-tools');
export const auditService = new DynamoDBService('awsdevtools-audit');