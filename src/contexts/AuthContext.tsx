"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { SessionProvider, useSession } from 'next-auth/react';
import { Session } from 'next-auth';

interface AuthContextType {
  user: Session['user'] | null;
  loading: boolean;
  signIn: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProviderInner = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status !== 'loading') {
      setLoading(false);
    }
  }, [status]);

  const signIn = () => {
    window.location.href = '/api/auth/signin';
  };

  const signOut = () => {
    window.location.href = '/api/auth/signout';
  };

  const value = {
    user: session?.user || null,
    loading,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <AuthProviderInner>{children}</AuthProviderInner>
    </SessionProvider>
  );
};
