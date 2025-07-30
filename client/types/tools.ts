export interface Tool {
  id: string;
  name: string;
  displayName: string;
  description: string;
  category: ToolCategory;
  icon: string;
  features: string[];
  requiredPermissions: string[];
  estimatedSavings?: string;
  complexity: 'beginner' | 'intermediate' | 'advanced';
  status: 'available' | 'beta' | 'coming_soon';
}

export interface EnabledTool {
  accountId: string;
  toolName: string;
  enabled: boolean;
  config: Record<string, any>;
  roleArn?: string;
  lastRun?: string;
  status: 'active' | 'error' | 'disabled';
  results?: ToolResults;
}

export interface ToolResults {
  lastUpdated: string;
  summary: Record<string, any>;
  details: Record<string, any>;
  recommendations?: Recommendation[];
  metrics?: Metric[];
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'high' | 'medium' | 'low';
  estimatedSavings?: string;
  category: string;
  actionUrl?: string;
}

export interface Metric {
  name: string;
  value: number;
  unit: string;
  trend?: 'up' | 'down' | 'stable';
  change?: number;
}

export type ToolCategory = 
  | 'cost-optimization'
  | 'security'
  | 'performance'
  | 'management'
  | 'monitoring'
  | 'compliance'
  | 'automation'
  | 'storage'
  | 'networking'
  | 'compute';

export interface ToolConfig {
  [key: string]: {
    type: 'string' | 'number' | 'boolean' | 'select' | 'multiselect';
    label: string;
    description?: string;
    required?: boolean;
    options?: { value: string; label: string }[];
    default?: any;
    validation?: {
      min?: number;
      max?: number;
      pattern?: string;
    };
  };
}