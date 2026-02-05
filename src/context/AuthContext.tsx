import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { mockApi, type User } from '../api/mockApi';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (role: 'creator' | 'supporter') => Promise<void>;
    logout: () => void;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Check for persisted session logic could go here, for now we just load if we have a flag
    // or purely rely on mock "login"

    useEffect(() => {
        const initAuth = async () => {
            // Check if previously logged in (mock)
            const storedAuth = localStorage.getItem('pulse_auth');
            if (storedAuth === 'true') {
                try {
                    const userData = await mockApi.getUser();
                    setUser(userData);
                    setIsAuthenticated(true);
                } catch (err) {
                    console.error("Failed to restore session", err);
                    localStorage.removeItem('pulse_auth');
                }
            }
            setIsLoading(false);
        };
        initAuth();
    }, []);

    const login = async (_role: 'creator' | 'supporter') => {
        setIsLoading(true);
        try {
            // In a real app, we'd pass credentials.
            // Here we just fetch the mock user.
            // If role is creator, we might fetch a specific creator user, but for now we default to the single mock user.
            const userData = await mockApi.getUser();
            setUser(userData);
            setIsAuthenticated(true);
            localStorage.setItem('pulse_auth', 'true');
        } catch (error) {
            console.error("Login failed", error);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('pulse_auth');
    };

    const refreshUser = async () => {
        if (!isAuthenticated) return;
        try {
            const updatedUser = await mockApi.getUser();
            setUser(updatedUser);
        } catch (error) {
            console.error("Failed to refresh user", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout, refreshUser }}>
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
