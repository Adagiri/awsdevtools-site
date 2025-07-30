'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { AWSAccount } from '@/types/aws';
import { useAuth } from '@/lib/auth/AuthProvider';

interface AccountContextType {
  accounts: AWSAccount[];
  currentAccount: AWSAccount | null;
  isLoading: boolean;
  switchAccount: (account: AWSAccount) => Promise<void>;
  addAccount: (accountData: Omit<AWSAccount, 'userId' | 'connectedAt' | 'status'>) => Promise<AWSAccount>;
  removeAccount: (accountId: string) => Promise<void>;
  refreshAccounts: () => Promise<void>;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export function AccountProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuth();
  const [accounts, setAccounts] = useState<AWSAccount[]>([]);
  const [currentAccount, setCurrentAccount] = useState<AWSAccount | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && user) {
      loadAccounts();
    } else {
      setAccounts([]);
      setCurrentAccount(null);
      setIsLoading(false);
    }
  }, [isAuthenticated, user]);

  const loadAccounts = async () => {
    try {
      setIsLoading(true);
      
      // Simulate API call to load user's AWS accounts
      const mockAccounts: AWSAccount[] = [
        {
          userId: user!.id,
          accountId: '123456789012',
          accountName: 'Production',
          roleArn: 'arn:aws:iam::123456789012:role/AWSDevToolsRole',
          externalId: 'unique-external-id-prod',
          status: 'active',
          connectedAt: new Date(Date.now() - 86400000).toISOString(),
          region: 'us-east-1',
        },
        {
          userId: user!.id,
          accountId: '210987654321',
          accountName: 'Development',
          roleArn: 'arn:aws:iam::210987654321:role/AWSDevToolsRole',
          externalId: 'unique-external-id-dev',
          status: 'active',
          connectedAt: new Date(Date.now() - 172800000).toISOString(),
          region: 'us-west-2',
        },
        {
          userId: user!.id,
          accountId: '345678901234',
          accountName: 'Staging',
          roleArn: 'arn:aws:iam::345678901234:role/AWSDevToolsRole',
          externalId: 'unique-external-id-staging',
          status: 'pending',
          connectedAt: new Date().toISOString(),
          region: 'eu-west-1',
        },
      ];

      setAccounts(mockAccounts);
      
      // Set current account from localStorage or first active account
      const savedAccountId = localStorage.getItem('currentAccountId');
      const savedAccount = mockAccounts.find(acc => acc.accountId === savedAccountId && acc.status === 'active');
      const firstActiveAccount = mockAccounts.find(acc => acc.status === 'active');
      
      setCurrentAccount(savedAccount || firstActiveAccount || null);
    } catch (error) {
      console.error('Failed to load accounts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const switchAccount = async (account: AWSAccount) => {
    if (account.status !== 'active') {
      throw new Error('Cannot switch to inactive account');
    }

    setCurrentAccount(account);
    localStorage.setItem('currentAccountId', account.accountId);
    
    // Clear any cached tool data
    localStorage.removeItem('toolsCache');
    
    // Trigger a soft refresh of tool states without full page reload
    window.dispatchEvent(new CustomEvent('accountChanged', { detail: account }));
  };

  const addAccount = async (accountData: Omit<AWSAccount, 'userId' | 'connectedAt' | 'status'>) => {
    const newAccount: AWSAccount = {
      ...accountData,
      userId: user!.id,
      status: 'pending',
      connectedAt: new Date().toISOString(),
    };

    // Simulate API call to add account
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate role validation
    const isValid = Math.random() > 0.2; // 80% success rate for demo
    
    const finalAccount = {
      ...newAccount,
      status: isValid ? 'active' : 'error' as const,
    };

    setAccounts(prev => [...prev, finalAccount]);
    
    if (isValid && !currentAccount) {
      setCurrentAccount(finalAccount);
      localStorage.setItem('currentAccountId', finalAccount.accountId);
    }
    
    return finalAccount;
  };

  const removeAccount = async (accountId: string) => {
    setAccounts(prev => prev.filter(acc => acc.accountId !== accountId));
    
    if (currentAccount?.accountId === accountId) {
      const remainingAccounts = accounts.filter(acc => acc.accountId !== accountId && acc.status === 'active');
      const newCurrent = remainingAccounts[0] || null;
      setCurrentAccount(newCurrent);
      
      if (newCurrent) {
        localStorage.setItem('currentAccountId', newCurrent.accountId);
      } else {
        localStorage.removeItem('currentAccountId');
      }
    }
  };

  return (
    <AccountContext.Provider
      value={{
        accounts,
        currentAccount,
        isLoading,
        switchAccount,
        addAccount,
        removeAccount,
        refreshAccounts: loadAccounts,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}

export function useAccount() {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error('useAccount must be used within an AccountProvider');
  }
  return context;
}