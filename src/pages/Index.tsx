
import { useState, useEffect } from 'react';
import SignIn from '../components/auth/SignIn';
import SignUp from '../components/auth/SignUp';
import Dashboard from '../components/Dashboard';
import { UserProvider, useUser } from '../contexts/UserContext';

const AuthenticatedApp = () => {
  const { user, loading } = useUser();
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      {!user ? (
        <div>
          {authMode === 'signin' ? (
            <SignIn 
              onAuth={() => {}} // Auth state is handled by context
              onSwitchToSignUp={() => setAuthMode('signup')}
            />
          ) : (
            <SignUp 
              onAuth={() => {}} // Auth state is handled by context
              onSwitchToSignIn={() => setAuthMode('signin')}
            />
          )}
        </div>
      ) : (
        <Dashboard />
      )}
    </div>
  );
};

const Index = () => {
  return (
    <UserProvider>
      <AuthenticatedApp />
    </UserProvider>
  );
};

export default Index;
