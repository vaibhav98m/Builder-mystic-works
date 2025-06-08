import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import { User, LoginRequest, RegisterRequest, UserRole } from "@/types";
import { authService } from "@/services/authService";
import { toast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (role: UserRole) => boolean;
  hasAnyRole: (roles: UserRole[]) => boolean;
  canCreateArticles: boolean;
  canPublishArticles: boolean;
  canManageUsers: boolean;
  canComment: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize auth state only once
  useEffect(() => {
    if (!isInitialized) {
      const currentUser = authService.getCurrentUser();
      setUser(currentUser);
      setIsLoading(false);
      setIsInitialized(true);
    }
  }, [isInitialized]);

  const login = useCallback(async (credentials: LoginRequest) => {
    try {
      setIsLoading(true);
      const response = await authService.login(credentials);
      setUser(response.user);
      toast({
        title: "Success",
        description: `Welcome back, ${response.user.name}!`,
      });
    } catch (error) {
      toast({
        title: "Login Failed",
        description:
          error instanceof Error
            ? error.message
            : "An error occurred during login",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (userData: RegisterRequest) => {
    try {
      setIsLoading(true);
      const response = await authService.register(userData);
      setUser(response.user);
      toast({
        title: "Success",
        description: `Welcome to the platform, ${response.user.name}!`,
      });
    } catch (error) {
      toast({
        title: "Registration Failed",
        description:
          error instanceof Error
            ? error.message
            : "An error occurred during registration",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  }, []);

  // Memoize authentication state based on user object only
  const authState = useMemo(() => {
    const isAuthenticated = user !== null;
    const userRole = user?.role;

    return {
      isAuthenticated,
      hasRole: (role: UserRole) => userRole === role,
      hasAnyRole: (roles: UserRole[]) =>
        userRole ? roles.includes(userRole) : false,
      canCreateArticles: userRole === "admin" || userRole === "employee",
      canPublishArticles: userRole === "admin",
      canManageUsers: userRole === "admin",
      canComment: isAuthenticated,
    };
  }, [user]);

  const contextValue: AuthContextType = useMemo(
    () => ({
      user,
      isLoading,
      login,
      register,
      logout,
      isAuthenticated: authState.isAuthenticated,
      hasRole: authState.hasRole,
      hasAnyRole: authState.hasAnyRole,
      canCreateArticles: authState.canCreateArticles,
      canPublishArticles: authState.canPublishArticles,
      canManageUsers: authState.canManageUsers,
      canComment: authState.canComment,
    }),
    [
      user,
      isLoading,
      login,
      register,
      logout,
      authState.isAuthenticated,
      authState.hasRole,
      authState.hasAnyRole,
      authState.canCreateArticles,
      authState.canPublishArticles,
      authState.canManageUsers,
      authState.canComment,
    ],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
