export type UserRole = "admin" | "employee" | "reader";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  summary: string;
  authorId: string;
  author: User;
  status: "draft" | "pending" | "approved" | "rejected";
  category: string;
  tags: string[];
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  imageUrl?: string;
  likesCount: number;
  commentsCount: number;
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  author: User;
  articleId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateArticleRequest {
  title: string;
  content: string;
  summary: string;
  category: string;
  tags: string[];
  imageUrl?: string;
}

export interface UpdateArticleRequest extends Partial<CreateArticleRequest> {
  status?: Article["status"];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  role?: UserRole;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ArticleFilters {
  category?: string;
  search?: string;
  authorId?: string;
  status?: Article["status"];
  tags?: string[];
}
