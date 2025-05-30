
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
  loadUserComplaints: () => Promise<void>;
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

  const loadUserComplaints = async () => {
    if (!session?.user) return;

    try {
      const { data: complaintsData, error } = await supabase
        .from('complaints')
        .select('*')
        .eq('user_id', session.user.id)
        .order('date_created', { ascending: false });

      if (error) {
        console.error('Error loading complaints:', error);
        return;
      }

      const formattedComplaints: Complaint[] = complaintsData.map(complaint => ({
        id: complaint.id,
        title: complaint.title,
        category: complaint.category,
        description: complaint.description,
        location: complaint.location,
        priority: complaint.priority as 'low' | 'medium' | 'high',
        status: complaint.status as 'pending' | 'assigned' | 'in-progress' | 'resolved',
        dateCreated: complaint.date_created,
        assignedEmployee: complaint.assigned_employee,
        images: complaint.images || []
      }));

      setComplaints(formattedComplaints);
    } catch (error) {
      console.error('Error in loadUserComplaints:', error);
    }
  };

  const createOrUpdateProfile = async (authUser: User) => {
    try {
      // First try to get existing profile
      const { data: existingProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .maybeSingle();

      if (fetchError && fetchError.code !== 'PGRST116') {
        console.error('Error fetching profile:', fetchError);
        return null;
      }

      if (existingProfile) {
        // Profile exists, return it
        return {
          id: existingProfile.id,
          name: existingProfile.name,
          email: existingProfile.email,
          phone: existingProfile.phone,
          userType: existingProfile.user_type as 'user' | 'government' | 'employee',
          address: existingProfile.address,
          dob: existingProfile.dob,
          government_id: existingProfile.government_id,
          official_number: existingProfile.official_number,
        };
      } else {
        // Profile doesn't exist, create it from user metadata
        const userData = authUser.user_metadata || {};
        const newProfile = {
          id: authUser.id,
          name: userData.name || authUser.email?.split('@')[0] || 'User',
          email: authUser.email || '',
          phone: userData.phone || '',
          user_type: userData.user_type || 'user',
          government_id: userData.government_id || '',
          official_number: userData.official_number || '',
        };

        const { data: createdProfile, error: createError } = await supabase
          .from('profiles')
          .insert([newProfile])
          .select()
          .single();

        if (createError) {
          console.error('Error creating profile:', createError);
          return null;
        }

        return {
          id: createdProfile.id,
          name: createdProfile.name,
          email: createdProfile.email,
          phone: createdProfile.phone,
          userType: createdProfile.user_type as 'user' | 'government' | 'employee',
          address: createdProfile.address,
          dob: createdProfile.dob,
          government_id: createdProfile.government_id,
          official_number: createdProfile.official_number,
        };
      }
    } catch (error) {
      console.error('Error in createOrUpdateProfile:', error);
      return null;
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session);
        setSession(session);
        
        if (session?.user) {
          // Fetch or create user profile
          setTimeout(async () => {
            const profile = await createOrUpdateProfile(session.user);
            if (profile) {
              setUser(profile);
            }
          }, 0);
        } else {
          setUser(null);
          setComplaints([]);
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

  // Load complaints when user changes
  useEffect(() => {
    if (user && session) {
      loadUserComplaints();
    }
  }, [user, session]);

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
      signOut,
      loadUserComplaints
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
