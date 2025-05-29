
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  userType: 'user' | 'government' | 'employee';
  address?: string;
  dob?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  complaints: Complaint[];
  setComplaints: (complaints: Complaint[]) => void;
}

interface Complaint {
  id: string;
  title: string;
  category: string;
  description: string;
  location: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'assigned' | 'in-progress' | 'resolved';
  dateCreated: string;
  assignedEmployee?: string;
  images?: string[];
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  return (
    <UserContext.Provider value={{ user, setUser, complaints, setComplaints }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
