'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthState } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGitHub: () => Promise<void>;
  logout: () => Promise<void>;
  requireMFA: boolean;
  verifyMFA: (code: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    requireMFA: false
  });

  useEffect(() => {
    // Check for existing session
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      // Simulate checking for existing session
      const token = localStorage.getItem('auth_token');
      if (token) {
        // Validate token and get user info
        const user = await validateToken(token);
        setAuthState({
          user,
          isLoading: false,
          isAuthenticated: true,
          requireMFA: false
        });
      } else {
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const validateToken = async (token: string): Promise<User> => {
    // Simulate token validation
    return {
      id: '1',
      email: 'user@example.com',
      githubId: 'github123',
      mfaEnabled: true,
      mfaForMutations: true,
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };
  };

  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      // Simulate login API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        requireMFA: true
      });
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const loginWithGitHub = async () => {
    // Redirect to GitHub OAuth
    window.location.href = '/api/auth/github';
  };

  const verifyMFA = async (code: string) => {
    try {
      // Simulate MFA verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user: User = {
        id: '1',
        email: 'user@example.com',
        githubId: 'github123',
        mfaEnabled: true,
        mfaForMutations: true,
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString()
      };

      localStorage.setItem('auth_token', 'mock_token');
      
      setAuthState({
        user,
        isLoading: false,
        isAuthenticated: true,
        requireMFA: false
      });
    } catch (error) {
      throw new Error('Invalid MFA code');
    }
  };

  const logout = async () => {
    localStorage.removeItem('auth_token');
    setAuthState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
      requireMFA: false
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: authState.user,
        isLoading: authState.isLoading,
        isAuthenticated: authState.isAuthenticated,
        requireMFA: authState.requireMFA,
        login,
        loginWithGitHub,
        logout,
        verifyMFA
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}