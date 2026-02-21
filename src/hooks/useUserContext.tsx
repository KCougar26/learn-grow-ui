import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface User {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  current_streak: number;
  max_streak: number;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize with Alice (user_id 1) by default
    const storedUserId = localStorage.getItem('userId') || '1';
    const userId = parseInt(storedUserId);

    const mockUsers: Record<number, User> = {
      1: {
        user_id: 1,
        first_name: 'Alice',
        last_name: 'Johnson',
        email: 'alice@example.com',
        current_streak: 5,
        max_streak: 10,
      },
      2: {
        user_id: 2,
        first_name: 'Bob',
        last_name: 'Smith',
        email: 'bob@example.com',
        current_streak: 2,
        max_streak: 4,
      },
      3: {
        user_id: 3,
        first_name: 'Charlie',
        last_name: 'Brown',
        email: 'charlie@example.com',
        current_streak: 7,
        max_streak: 12,
      },
    };

    const userData = mockUsers[userId];
    if (userData) {
      setUser(userData);
    }
    setLoading(false);
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
