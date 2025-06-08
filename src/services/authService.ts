import {
  User,
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  UserRole,
} from "@/types";
import { mockUsers } from "./mockData";

const AUTH_TOKEN_KEY = "news_auth_token";
const CURRENT_USER_KEY = "news_current_user";

// Mock authentication service
class AuthService {
  private users: User[] = [...mockUsers];
  private currentUser: User | null = null;

  constructor() {
    // Check for existing session on initialization
    this.initializeSession();
  }

  private initializeSession() {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const userString = localStorage.getItem(CURRENT_USER_KEY);

    if (token && userString) {
      try {
        this.currentUser = JSON.parse(userString);
      } catch (error) {
        this.logout();
      }
    }
  }

  private generateToken(user: User): string {
    // In a real app, this would be a JWT from the backend
    return `mock_token_${user.id}_${Date.now()}`;
  }

  private setSession(user: User, token: string) {
    this.currentUser = user;
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  }

  async login(credentials: LoginRequest): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const user = this.users.find((u) => u.email === credentials.email);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    // In a real app, you'd verify the password hash
    // For mock purposes, any password works

    const token = this.generateToken(user);
    this.setSession(user, token);

    return { user, token };
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check if user already exists
    const existingUser = this.users.find((u) => u.email === userData.email);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      name: userData.name,
      role: userData.role || "reader",
      createdAt: new Date(),
    };

    this.users.push(newUser);
    const token = this.generateToken(newUser);
    this.setSession(newUser, token);

    return { user: newUser, token };
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(CURRENT_USER_KEY);
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  hasRole(role: UserRole): boolean {
    const hasRoleResult = this.currentUser?.role === role;
    console.log(
      `AuthService.hasRole(${role}):`,
      hasRoleResult,
      "currentUser:",
      this.currentUser?.role,
    );
    return hasRoleResult;
  }

  hasRole(role: UserRole): boolean {
    return this.currentUser?.role === role;
  }

  canCreateArticles(): boolean {
    return this.hasAnyRole(["admin", "employee"]);
  }

  canPublishArticles(): boolean {
    return this.hasRole("admin");
  }

  canManageUsers(): boolean {
    return this.hasRole("admin");
  }

  canComment(): boolean {
    return this.isAuthenticated();
  }

  // Admin functions
  async getAllUsers(): Promise<User[]> {
    if (!this.hasRole("admin")) {
      throw new Error("Unauthorized: Admin access required");
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
    return [...this.users];
  }

  async updateUserRole(userId: string, newRole: UserRole): Promise<User> {
    if (!this.hasRole("admin")) {
      throw new Error("Unauthorized: Admin access required");
    }

    await new Promise((resolve) => setTimeout(resolve, 500));

    const userIndex = this.users.findIndex((u) => u.id === userId);
    if (userIndex === -1) {
      throw new Error("User not found");
    }

    this.users[userIndex] = { ...this.users[userIndex], role: newRole };
    return this.users[userIndex];
  }
}

export const authService = new AuthService();
