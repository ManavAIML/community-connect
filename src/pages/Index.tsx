
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from '../components/auth/SignIn';
import SignUp from '../components/auth/SignUp';
import Dashboard from '../components/Dashboard';
import { UserProvider } from '../contexts/UserContext';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <UserProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        {!isAuthenticated ? (
          <Router>
            <Routes>
              <Route path="/" element={<SignIn onAuth={setIsAuthenticated} />} />
              <Route path="/signup" element={<SignUp onAuth={setIsAuthenticated} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Router>
        ) : (
          <Dashboard />
        )}
      </div>
    </UserProvider>
  );
};

export default Index;
