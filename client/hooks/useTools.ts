'use client';

import { useState, useEffect } from 'react';
import { Tool, EnabledTool, ToolResults } from '@/types/tools';
import { useAuth } from './useAuth';
import { useAccount } from './useAccount';

const MOCK_TOOLS: Tool[] = [
  {
    id: 'cost-optimizer',
    name: 'cost-optimizer',
    displayName: 'Cost Optimizer',
    description: 'Identify and eliminate wasteful AWS spending with AI-powered recommendations',
    category: 'cost-optimization',
    icon: 'DollarSign',
    features: [
      'Unused resource detection',
      'Right-sizing recommendations',
      'Reserved instance optimization',
      'Automated cost alerts',
      'Cost trend analysis',
      'Budget forecasting',
      'Multi-account cost tracking',
      'Custom cost reports'
    ],
    requiredPermissions: [
      'ec2:DescribeInstances',
      'rds:DescribeDBInstances',
      'cloudwatch:GetMetricStatistics',
      'ce:GetCostAndUsage',
      'ce:GetDimensionValues',
      'ce:GetReservationCoverage'
    ],
    estimatedSavings: 'Up to 40%',
    complexity: 'beginner',
    status: 'available'
  },
  {
    id: 'security-auditor',
    name: 'security-auditor',
    displayName: 'Security Auditor',
    description: 'Comprehensive security scanning and compliance monitoring',
    category: 'security',
    icon: 'Shield',
    features: [
      'IAM policy analysis',
      'Security group auditing',
      'Compliance reporting',
      'Vulnerability scanning',
      'Access key rotation tracking',
      'MFA enforcement monitoring',
      'Encryption status checks',
      'Security best practices validation'
    ],
    requiredPermissions: [
      'iam:ListPolicies',
      'ec2:DescribeSecurityGroups',
      'config:GetComplianceDetailsByConfigRule',
      'inspector:DescribeFindings',
      'iam:GetAccountSummary',
      'kms:ListKeys'
    ],
    estimatedSavings: 'Risk reduction',
    complexity: 'intermediate',
    status: 'available'
  }
];

export function useTools() {
  const { user } = useAuth();
  const { currentAccount } = useAccount();
  const [tools, setTools] = useState<Tool[]>([]);
  const [enabledTools, setEnabledTools] = useState<EnabledTool[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTools();
  }, []);

  useEffect(() => {
    if (currentAccount) {
      loadEnabledTools();
    }
  }, [currentAccount]);

  const loadTools = async () => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setTools(MOCK_TOOLS);
    } catch (error) {
      console.error('Failed to load tools:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadEnabledTools = async () => {
    if (!currentAccount) return;

    try {
      // Simulate API call to load enabled tools for current account
      const mockEnabledTools: EnabledTool[] = [
        {
          accountId: currentAccount.accountId,
          toolName: 'cost-optimizer',
          enabled: true,
          config: {
            alertThreshold: 100,
            includeReservedInstances: true,
            regions: ['us-east-1', 'us-west-2']
          },
          lastRun: new Date(Date.now() - 3600000).toISOString(),
          status: 'active',
          results: {
            lastUpdated: new Date(Date.now() - 3600000).toISOString(),
            summary: {
              totalSavings: 2450,
              recommendations: 12,
              criticalIssues: 3
            },
            details: {
              unusedResources: 8,
              rightsizingOpportunities: 4,
              reservedInstanceRecommendations: 2
            },
            recommendations: [
              {
                id: '1',
                title: 'Terminate unused EC2 instances',
                description: '3 EC2 instances have been idle for over 7 days',
                impact: 'high',
                effort: 'low',
                estimatedSavings: '$1,200/month',
                category: 'compute',
                actionUrl: 'https://console.aws.amazon.com/ec2/v2/home#Instances'
              },
              {
                id: '2',
                title: 'Right-size RDS instances',
                description: 'Database instances are over-provisioned based on usage patterns',
                impact: 'medium',
                effort: 'medium',
                estimatedSavings: '$800/month',
                category: 'database'
              }
            ],
            metrics: [
              { name: 'Monthly Spend', value: 5200, unit: 'USD', trend: 'down', change: -12 },
              { name: 'Unused Resources', value: 8, unit: 'count', trend: 'up', change: 2 }
            ]
          }
        },
        {
          accountId: currentAccount.accountId,
          toolName: 'security-auditor',
          enabled: true,
          config: {
            complianceFrameworks: ['SOC2', 'PCI-DSS'],
            alertSeverity: 'medium'
          },
          lastRun: new Date(Date.now() - 7200000).toISOString(),
          status: 'active',
          results: {
            lastUpdated: new Date(Date.now() - 7200000).toISOString(),
            summary: {
              securityScore: 85,
              vulnerabilities: 5,
              complianceStatus: 'partial'
            },
            details: {
              highRiskFindings: 2,
              mediumRiskFindings: 3,
              lowRiskFindings: 8
            }
          }
        }
      ];

      setEnabledTools(mockEnabledTools);
    } catch (error) {
      console.error('Failed to load enabled tools:', error);
    }
  };

  const enableTool = async (toolName: string, config: Record<string, any> = {}) => {
    if (!currentAccount) throw new Error('No account selected');

    const newEnabledTool: EnabledTool = {
      accountId: currentAccount.accountId,
      toolName,
      enabled: true,
      config,
      status: 'active',
      lastRun: new Date().toISOString()
    };

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setEnabledTools(prev => [...prev.filter(t => t.toolName !== toolName), newEnabledTool]);
    return newEnabledTool;
  };

  const disableTool = async (toolName: string) => {
    if (!currentAccount) throw new Error('No account selected');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    setEnabledTools(prev => prev.filter(t => t.toolName !== toolName));
  };

  const updateToolConfig = async (toolName: string, config: Record<string, any>) => {
    if (!currentAccount) throw new Error('No account selected');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setEnabledTools(prev => prev.map(tool => 
      tool.toolName === toolName 
        ? { ...tool, config: { ...tool.config, ...config } }
        : tool
    ));
  };

  const runTool = async (toolName: string) => {
    if (!currentAccount) throw new Error('No account selected');

    // Update tool status to running
    setEnabledTools(prev => prev.map(tool => 
      tool.toolName === toolName 
        ? { ...tool, status: 'active', lastRun: new Date().toISOString() }
        : tool
    ));

    // Simulate tool execution
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Update with new results
    setEnabledTools(prev => prev.map(tool => 
      tool.toolName === toolName 
        ? { 
            ...tool, 
            status: 'active',
            results: {
              lastUpdated: new Date().toISOString(),
              summary: { status: 'completed', executionTime: '2.3s' },
              details: { itemsProcessed: Math.floor(Math.random() * 100) + 50 }
            }
          }
        : tool
    ));
  };

  const getToolByName = (name: string) => tools.find(tool => tool.name === name);
  const getEnabledTool = (name: string) => enabledTools.find(tool => tool.toolName === name);
  const isToolEnabled = (name: string) => enabledTools.some(tool => tool.toolName === name && tool.enabled);

  const getToolsByCategory = (category: string) => tools.filter(tool => tool.category === category);
  const getEnabledToolsCount = () => enabledTools.filter(tool => tool.enabled).length;

  return {
    tools,
    enabledTools,
    isLoading,
    enableTool,
    disableTool,
    updateToolConfig,
    runTool,
    getToolByName,
    getEnabledTool,
    isToolEnabled,
    getToolsByCategory,
    getEnabledToolsCount,
    refreshTools: loadTools,
    refreshEnabledTools: loadEnabledTools
  };
}