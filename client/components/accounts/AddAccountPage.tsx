'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft,
  Cloud,
  Shield,
  CheckCircle,
  Copy,
  ExternalLink,
  AlertTriangle,
  Loader2
} from 'lucide-react';
import { useAccount } from '@/lib/aws/AccountProvider';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface FormData {
  accountName: string;
  accountId: string;
  roleArn: string;
  externalId: string;
  region: string;
}

export function AddAccountPage() {
  const { addAccount } = useAccount();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    accountName: '',
    accountId: '',
    roleArn: '',
    externalId: '',
    region: 'us-east-1'
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addAccount({
        accountName: formData.accountName,
        accountId: formData.accountId,
        roleArn: formData.roleArn,
        externalId: formData.externalId,
        region: formData.region
      });
      
      router.push('/dashboard');
    } catch (error) {
      console.error('Failed to add account:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const cloudFormationTemplate = `{
  "AWSTemplateFormatVersion": "2010-09-09",
  "Description": "AWS Dev Tools Cross-Account Role",
  "Parameters": {
    "ExternalId": {
      "Type": "String",
      "Default": "${formData.externalId || 'your-unique-external-id'}",
      "Description": "External ID for role assumption"
    }
  },
  "Resources": {
    "AWSDevToolsRole": {
      "Type": "AWS::IAM::Role",
      "Properties": {
        "RoleName": "AWSDevToolsRole",
        "AssumeRolePolicyDocument": {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Effect": "Allow",
              "Principal": {
                "AWS": "arn:aws:iam::123456789012:root"
              },
              "Action": "sts:AssumeRole",
              "Condition": {
                "StringEquals": {
                  "sts:ExternalId": {
                    "Ref": "ExternalId"
                  }
                }
              }
            }
          ]
        },
        "ManagedPolicyArns": [
          "arn:aws:iam::aws:policy/ReadOnlyAccess",
          "arn:aws:iam::aws:policy/AWSSupportAccess"
        ]
      }
    }
  },
  "Outputs": {
    "RoleArn": {
      "Description": "ARN of the created role",
      "Value": {
        "Fn::GetAtt": ["AWSDevToolsRole", "Arn"]
      }
    }
  }
}`;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const generateExternalId = () => {
    const id = `awsdevtools-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    handleInputChange('externalId', id);
  };

  // Generate AWS Console URLs with pre-filled values
  const getIAMRoleCreationURL = () => {
    const baseURL = 'https://console.aws.amazon.com/iam/home';
    const params = new URLSearchParams({
      region: formData.region,
      '#/roles$new': '',
      step: 'review'
    });
    return `${baseURL}?${params.toString()}`;
  };

  const getTrustPolicyJSON = () => {
    return JSON.stringify({
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Principal": {
            "AWS": "arn:aws:iam::123456789012:root"
          },
          "Action": "sts:AssumeRole",
          "Condition": {
            "StringEquals": {
              "sts:ExternalId": formData.externalId
            }
          }
        }
      ]
    }, null, 2);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1a1a1a' }}>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 md:p-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">Add AWS Account</h1>
                <p className="text-slate-400">
                  Connect your AWS account to start using our tools
                </p>
              </div>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-6 md:mb-8">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step >= 1 ? 'bg-orange-500 text-white' : 'bg-slate-700 text-slate-400'
              }`}>
                1
              </div>
              <div className={`w-16 h-1 ${step >= 2 ? 'bg-orange-500' : 'bg-slate-700'}`} />
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step >= 2 ? 'bg-orange-500 text-white' : 'bg-slate-700 text-slate-400'
              }`}>
                2
              </div>
              <div className={`w-16 h-1 ${step >= 3 ? 'bg-orange-500' : 'bg-slate-700'}`} />
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step >= 3 ? 'bg-orange-500 text-white' : 'bg-slate-700 text-slate-400'
              }`}>
                3
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div className="max-w-4xl mx-auto">
            {step === 1 && (
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Cloud className="w-5 h-5 mr-2 text-orange-400" />
                    Account Information
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Provide basic information about your AWS account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="accountName" className="text-slate-300">
                        Account Name *
                      </Label>
                      <Input
                        id="accountName"
                        placeholder="e.g., Production, Development"
                        value={formData.accountName}
                        onChange={(e) => handleInputChange('accountName', e.target.value)}
                        className="bg-slate-900/50 border-slate-600 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accountId" className="text-slate-300">
                        AWS Account ID *
                      </Label>
                      <Input
                        id="accountId"
                        placeholder="123456789012"
                        value={formData.accountId}
                        onChange={(e) => handleInputChange('accountId', e.target.value)}
                        className="bg-slate-900/50 border-slate-600 text-white"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="region" className="text-slate-300">
                      Primary Region *
                    </Label>
                    <select
                      id="region"
                      value={formData.region}
                      onChange={(e) => handleInputChange('region', e.target.value)}
                      className="w-full p-2 bg-slate-900/50 border border-slate-600 rounded-md text-white"
                    >
                      <option value="us-east-1">US East (N. Virginia)</option>
                      <option value="us-west-2">US West (Oregon)</option>
                      <option value="eu-west-1">Europe (Ireland)</option>
                      <option value="ap-southeast-1">Asia Pacific (Singapore)</option>
                    </select>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={() => setStep(2)}
                      disabled={!formData.accountName || !formData.accountId}
                      className="bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      Next: Setup IAM Role
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-orange-400" />
                    Manual IAM Role Setup
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Create the required IAM role manually in your AWS account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* External ID Generation */}
                  <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-white">External ID</h4>
                      <Button
                        size="sm"
                        onClick={generateExternalId}
                        className="bg-orange-500/20 text-orange-500 hover:bg-orange-500/30"
                      >
                        Generate New ID
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input
                        value={formData.externalId}
                        onChange={(e) => handleInputChange('externalId', e.target.value)}
                        className="bg-slate-900/50 border-slate-600 text-white font-mono text-sm"
                        placeholder="Click 'Generate New ID' to create a secure external ID"
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(formData.externalId)}
                        className="text-slate-400 hover:text-white"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Manual Setup Instructions */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-white">Step-by-Step Instructions</h4>
                    
                    {/* Step 1: Create Role */}
                    <div className="p-4 bg-slate-900/30 rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium text-white">1. Create IAM Role</h5>
                        <a
                          href={getIAMRoleCreationURL()}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            size="sm"
                            className="bg-orange-500 hover:bg-orange-600 text-white"
                          >
                            <ExternalLink className="w-4 h-4 mr-1" />
                            Open AWS Console
                          </Button>
                        </a>
                      </div>
                      <ul className="text-sm text-slate-300 space-y-1 list-disc list-inside ml-4">
                        <li>Click "Create role" in the IAM console</li>
                        <li>Select "AWS account" as the trusted entity type</li>
                        <li>Choose "Another AWS account"</li>
                        <li>Enter Account ID: <code className="bg-slate-800 px-1 rounded">123456789012</code></li>
                        <li>Check "Require external ID" and enter the External ID above</li>
                      </ul>
                    </div>

                    {/* Step 2: Attach Policies */}
                    <div className="p-4 bg-slate-900/30 rounded-lg space-y-3">
                      <h5 className="font-medium text-white">2. Attach Permissions</h5>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-300">ReadOnlyAccess</span>
                          <Badge variant="outline" className="border-green-500/50 text-green-400 text-xs">
                            AWS Managed
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-300">AWSSupportAccess</span>
                          <Badge variant="outline" className="border-green-500/50 text-green-400 text-xs">
                            AWS Managed
                          </Badge>
                        </div>
                      </div>
                      <p className="text-xs text-slate-400">
                        Search for and attach these AWS managed policies to the role
                      </p>
                    </div>

                    {/* Step 3: Name and Create */}
                    <div className="p-4 bg-slate-900/30 rounded-lg space-y-3">
                      <h5 className="font-medium text-white">3. Name and Create Role</h5>
                      <ul className="text-sm text-slate-300 space-y-1 list-disc list-inside ml-4">
                        <li>Role name: <code className="bg-slate-800 px-1 rounded">AWSDevToolsRole</code></li>
                        <li>Add description: "Cross-account role for AWS Dev Tools"</li>
                        <li>Review and create the role</li>
                        <li>Copy the Role ARN from the role summary page</li>
                      </ul>
                    </div>
                  </div>

                  {/* Trust Policy Reference */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-white">Trust Policy (Reference)</h4>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(getTrustPolicyJSON())}
                        className="text-slate-400 hover:text-white"
                      >
                        <Copy className="w-4 h-4 mr-1" />
                        Copy Policy
                      </Button>
                    </div>
                    <Textarea
                      value={getTrustPolicyJSON()}
                      readOnly
                      className="h-48 bg-slate-900/50 border-slate-600 text-slate-300 font-mono text-xs"
                    />
                    <p className="text-xs text-slate-400">
                      This trust policy is automatically created when you follow the steps above
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="border-slate-700 text-slate-300 hover:bg-slate-800"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={() => setStep(3)}
                      disabled={!formData.externalId}
                      className="bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      Next: Verify Connection
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 3 && (
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-orange-400" />
                    Verify Connection
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Enter the Role ARN from your CloudFormation deployment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="roleArn" className="text-slate-300">
                      IAM Role ARN *
                    </Label>
                    <Input
                      id="roleArn"
                      placeholder="arn:aws:iam::123456789012:role/AWSDevToolsRole"
                      value={formData.roleArn}
                      onChange={(e) => handleInputChange('roleArn', e.target.value)}
                      className="bg-slate-900/50 border-slate-600 text-white font-mono"
                    />
                    <p className="text-xs text-slate-400">
                      Copy this from the IAM role summary page after creation
                    </p>
                  </div>

                  {/* Summary */}
                  <div className="p-4 bg-slate-900/30 rounded-lg space-y-3">
                    <h4 className="font-medium text-white">Account Summary</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-400">Name:</span>
                        <span className="text-white ml-2">{formData.accountName}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Account ID:</span>
                        <span className="text-white ml-2">{formData.accountId}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Region:</span>
                        <span className="text-white ml-2">{formData.region}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">External ID:</span>
                        <span className="text-white ml-2 font-mono text-xs">{formData.externalId}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-slate-400">Role ARN:</span>
                        <span className="text-white ml-2 font-mono text-xs break-all">
                          {formData.roleArn || 'Not provided yet'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(2)}
                        className="border-slate-700 text-slate-300 hover:bg-slate-800"
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        disabled={!formData.roleArn || isSubmitting}
                        className="bg-orange-500 hover:bg-orange-600 text-white"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Connecting Account...
                          </>
                        ) : (
                          'Connect Account'
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}