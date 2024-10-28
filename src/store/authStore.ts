import create from 'zustand';
import { AuthUser, UserRegistrationData } from '../types';

interface AuthStore {
  user: AuthUser | null;
  users: AuthUser[];
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (data: UserRegistrationData) => boolean;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  users: [],
  login: (email: string, password: string) => {
    // Admin login
    if (email === 'zhetai@518004.com' && password === 'zhetai') {
      set({ 
        user: { 
          id: 'admin',
          email, 
          isAuthenticated: true,
          role: 'admin'
        } 
      });
      return true;
    }

    // Regular user login
    const users = get().users;
    const user = users.find(u => u.email === email);
    if (user) {
      set({ user: { ...user, isAuthenticated: true } });
      return true;
    }

    return false;
  },
  logout: () => set({ user: null }),
  register: (data: UserRegistrationData) => {
    const users = get().users;
    
    // Check if email already exists
    if (users.some(u => u.email === data.email)) {
      return false;
    }

    const newUser: AuthUser = {
      id: Math.random().toString(36).substr(2, 9),
      email: data.email,
      isAuthenticated: false,
      role: 'user'
    };

    set({ users: [...users, newUser] });
    return true;
  },
}));