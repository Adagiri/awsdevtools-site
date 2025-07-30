'use client';

import { useState, useEffect } from 'react';
import { AWSAccount } from '@/types/aws';
import { useAuth } from './useAuth';

export function useAccount() {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState<AWSAccount[]>([]);
  const [currentAccount, setCurrentAccount] = useState<AWSAccount | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadAccounts();
    }
  }, [user]);

  const loadAccounts = async () => {
    try {
      setIsLoading(true);
      // Simulate API call
      const mockAccounts: AWSAccount[] = [
        {
          userId: user!.id,
          accountId: '123456789012',
          accountName: 'Production',
          roleArn: 'arn:aws:iam::123456789012:role/AWSDevToolsRole',
          externalId: 'unique-external-id-1',
          status: 'active',
          connectedAt: new Date().toISOString(),
          region: 'us-east-1',
        },
        {
          userId: user!.id,
          accountId: '210987654321',
          accountName: 'Development',
          roleArn: 'arn:aws:iam::210987654321:role/AWSDevToolsRole',
          externalId: 'unique-external-id-2',
          status: 'active',
          connectedAt: new Date().toISOString(),
          region: 'us-west-2',
        },
      ];

      setAccounts(mockAccounts);
      
      // Set current account from localStorage or first account
      const savedAccountId = localStorage.getItem('currentAccountId');
      const savedAccount = mockAccounts.find(acc => acc.accountId === savedAccountId);
      setCurrentAccount(savedAccount || mockAccounts[0] || null);
    } catch (error) {
      console.error('Failed to load accounts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const switchAccount = async (account: AWSAccount) => {
    setCurrentAccount(account);
    localStorage.setItem('currentAccountId', account.accountId);
    
    // Trigger app refresh to clear tool states
    window.location.reload();
  };

  const addAccount = async (accountData: Omit<AWSAccount, 'userId' | 'connectedAt' | 'status'>) => {
    const newAccount: AWSAccount = {
      ...accountData,
      userId: user!.id,
      status: 'pending',
      connectedAt: new Date().toISOString(),
    };

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setAccounts(prev => [...prev, { ...newAccount, status: 'active' }]);
    return newAccount;
  };

  const removeAccount = async (accountId: string) => {
    setAccounts(prev => prev.filter(acc => acc.accountId !== accountId));
    
    if (currentAccount?.accountId === accountId) {
      const remainingAccounts = accounts.filter(acc => acc.accountId !== accountId);
      setCurrentAccount(remainingAccounts[0] || null);
    }
  };

  return {
    accounts,
    currentAccount,
    isLoading,
    switchAccount,
    addAccount,
    removeAccount,
    refreshAccounts: loadAccounts,
  };
}