
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import SignIn from '../components/auth/SignIn';
import SignUp from '../components/auth/SignUp';
import Dashboard from '../components/Dashboard';
import { UserProvider } from '../contexts/UserContext';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  return (
    <UserProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        {!isAuthenticated ? (
          <div>
            {authMode === 'signin' ? (
              <SignIn 
                onAuth={setIsAuthenticated} 
                onSwitchToSignUp={() => setAuthMode('signup')}
              />
            ) : (
              <SignUp 
                onAuth={setIsAuthenticated}
                onSwitchToSignIn={() => setAuthMode('signin')}
              />
            )}
          </div>
        ) : (
          <Dashboard />
        )}
      </div>
    </UserProvider>
  );
};

export default Index;
