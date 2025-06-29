
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  role: 'Admin' | 'Inspector' | 'Engineer';
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USERS = [
  { id: '1', role: 'Admin' as const, email: 'admin@entnt.in', password: 'admin123', name: 'Admin User' },
  { id: '2', role: 'Inspector' as const, email: 'inspector@entnt.in', password: 'inspect123', name: 'Inspector Smith' },
  { id: '3', role: 'Engineer' as const, email: 'engineer@entnt.in', password: 'engine123', name: 'Engineer Johnson' }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (foundUser) {
      const userWithoutPassword = {
        id: foundUser.id,
        role: foundUser.role,
        email: foundUser.email,
        name: foundUser.name
      };
      setUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
