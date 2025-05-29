
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  userType: 'user' | 'government' | 'employee';
  address?: string;
  dob?: string;
  government_id?: string;
  official_number?: string;
}

interface UserContextType {
  user: UserProfile | null;
  session: Session | null;
  loading: boolean;
  setUser: (user: UserProfile | null) => void;
  complaints: Complaint[];
  setComplaints: (complaints: Complaint[]) => void;
  signOut: () => Promise<void>;
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
  const [user, setUser] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session);
        setSession(session);
        
        if (session?.user) {
          // Fetch user profile from our profiles table
          setTimeout(async () => {
            try {
              const { data: profile, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();

              if (error) {
                console.error('Error fetching profile:', error);
              } else if (profile) {
                setUser({
                  id: profile.id,
                  name: profile.name,
                  email: profile.email,
                  phone: profile.phone,
                  userType: profile.user_type as 'user' | 'government' | 'employee',
                  address: profile.address,
                  dob: profile.dob,
                  government_id: profile.government_id,
                  official_number: profile.official_number,
                });
              }
            } catch (error) {
              console.error('Error in profile fetch:', error);
            }
          }, 0);
        } else {
          setUser(null);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setComplaints([]);
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      session, 
      loading, 
      setUser, 
      complaints, 
      setComplaints, 
      signOut 
    }}>
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
