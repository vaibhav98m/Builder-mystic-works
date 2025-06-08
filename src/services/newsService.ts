import {
  Article,
  Comment,
  CreateArticleRequest,
  UpdateArticleRequest,
  PaginatedResponse,
  ArticleFilters,
  User,
} from "@/types";
import { mockArticles, mockComments, mockUsers } from "./mockData";
import { authService } from "./authService";

class NewsService {
  private articles: Article[] = [...mockArticles];
  private comments: Comment[] = [...mockComments];

  // Articles
  async getArticles(
    page: number = 1,
    limit: number = 10,
    filters: ArticleFilters = {},
  ): Promise<PaginatedResponse<Article>> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    let filteredArticles = [...this.articles];

    // Apply filters
    if (filters.status) {
      filteredArticles = filteredArticles.filter(
        (article) => article.status === filters.status,
      );
    } else {
      // By default, only show approved articles for non-admin users
      const currentUser = authService.getCurrentUser();
      if (!currentUser || !authService.hasRole("admin")) {
        filteredArticles = filteredArticles.filter(
          (article) => article.status === "approved",
        );
      }
    }

    if (filters.category) {
      filteredArticles = filteredArticles.filter(
        (article) =>
          article.category.toLowerCase() === filters.category!.toLowerCase(),
      );
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredArticles = filteredArticles.filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm) ||
          article.summary.toLowerCase().includes(searchTerm) ||
          article.tags.some((tag) => tag.toLowerCase().includes(searchTerm)),
      );
    }

    if (filters.authorId) {
      filteredArticles = filteredArticles.filter(
        (article) => article.authorId === filters.authorId,
      );
    }

    if (filters.tags && filters.tags.length > 0) {
      filteredArticles = filteredArticles.filter((article) =>
        filters.tags!.some((tag) => article.tags.includes(tag)),
      );
    }

    // Sort by publishedAt or createdAt (most recent first)
    filteredArticles.sort((a, b) => {
      const dateA = a.publishedAt || a.createdAt;
      const dateB = b.publishedAt || b.createdAt;
      return dateB.getTime() - dateA.getTime();
    });

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

    return {
      data: paginatedArticles,
      total: filteredArticles.length,
      page,
      limit,
    };
  }

  async getArticleById(id: string): Promise<Article | null> {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const article = this.articles.find((a) => a.id === id);
    if (!article) return null;

    // Check permissions
    const currentUser = authService.getCurrentUser();
    if (article.status !== "approved") {
      if (!currentUser) return null;
      if (currentUser.role === "reader") return null;
      if (
        currentUser.role === "employee" &&
        article.authorId !== currentUser.id
      )
        return null;
    }

    return article;
  }

  async createArticle(articleData: CreateArticleRequest): Promise<Article> {
    const currentUser = authService.getCurrentUser();
    if (!currentUser || !authService.canCreateArticles()) {
      throw new Error("Unauthorized: Cannot create articles");
    }

    await new Promise((resolve) => setTimeout(resolve, 500));

    const newArticle: Article = {
      id: Date.now().toString(),
      ...articleData,
      authorId: currentUser.id,
      author: currentUser,
      status: currentUser.role === "admin" ? "approved" : "pending",
      publishedAt: currentUser.role === "admin" ? new Date() : undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
      likesCount: 0,
      commentsCount: 0,
    };

    this.articles.unshift(newArticle);
    return newArticle;
  }

  async updateArticle(
    id: string,
    updates: UpdateArticleRequest,
  ): Promise<Article> {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      throw new Error("Unauthorized: Must be logged in");
    }

    await new Promise((resolve) => setTimeout(resolve, 500));

    const articleIndex = this.articles.findIndex((a) => a.id === id);
    if (articleIndex === -1) {
      throw new Error("Article not found");
    }

    const article = this.articles[articleIndex];

    // Check permissions
    if (
      currentUser.role === "employee" &&
      article.authorId !== currentUser.id
    ) {
      throw new Error("Unauthorized: Can only edit your own articles");
    }

    if (currentUser.role === "reader") {
      throw new Error("Unauthorized: Readers cannot edit articles");
    }

    // Handle status changes
    if (updates.status && updates.status !== article.status) {
      if (!authService.hasRole("admin")) {
        throw new Error("Unauthorized: Only admins can change article status");
      }

      if (updates.status === "approved") {
        updates.publishedAt = new Date();
      }
    }

    const updatedArticle: Article = {
      ...article,
      ...updates,
      updatedAt: new Date(),
    };

    this.articles[articleIndex] = updatedArticle;
    return updatedArticle;
  }

  async deleteArticle(id: string): Promise<void> {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      throw new Error("Unauthorized: Must be logged in");
    }

    await new Promise((resolve) => setTimeout(resolve, 300));

    const articleIndex = this.articles.findIndex((a) => a.id === id);
    if (articleIndex === -1) {
      throw new Error("Article not found");
    }

    const article = this.articles[articleIndex];

    // Check permissions
    if (
      currentUser.role === "employee" &&
      article.authorId !== currentUser.id
    ) {
      throw new Error("Unauthorized: Can only delete your own articles");
    }

    if (currentUser.role === "reader") {
      throw new Error("Unauthorized: Readers cannot delete articles");
    }

    this.articles.splice(articleIndex, 1);
    // Also remove associated comments
    this.comments = this.comments.filter((c) => c.articleId !== id);
  }

  // Comments
  async getCommentsByArticleId(articleId: string): Promise<Comment[]> {
    await new Promise((resolve) => setTimeout(resolve, 200));

    return this.comments
      .filter((c) => c.articleId === articleId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  async createComment(articleId: string, content: string): Promise<Comment> {
    const currentUser = authService.getCurrentUser();
    if (!currentUser || !authService.canComment()) {
      throw new Error("Unauthorized: Must be logged in to comment");
    }

    await new Promise((resolve) => setTimeout(resolve, 300));

    // Check if article exists and is accessible
    const article = await this.getArticleById(articleId);
    if (!article) {
      throw new Error("Article not found or not accessible");
    }

    const newComment: Comment = {
      id: Date.now().toString(),
      content,
      authorId: currentUser.id,
      author: currentUser,
      articleId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.comments.push(newComment);

    // Update article comment count
    const articleIndex = this.articles.findIndex((a) => a.id === articleId);
    if (articleIndex !== -1) {
      this.articles[articleIndex].commentsCount++;
    }

    return newComment;
  }

  async deleteComment(commentId: string): Promise<void> {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      throw new Error("Unauthorized: Must be logged in");
    }

    await new Promise((resolve) => setTimeout(resolve, 200));

    const commentIndex = this.comments.findIndex((c) => c.id === commentId);
    if (commentIndex === -1) {
      throw new Error("Comment not found");
    }

    const comment = this.comments[commentIndex];

    // Check permissions - users can delete their own comments, admins can delete any
    if (comment.authorId !== currentUser.id && !authService.hasRole("admin")) {
      throw new Error("Unauthorized: Can only delete your own comments");
    }

    this.comments.splice(commentIndex, 1);

    // Update article comment count
    const articleIndex = this.articles.findIndex(
      (a) => a.id === comment.articleId,
    );
    if (articleIndex !== -1) {
      this.articles[articleIndex].commentsCount = Math.max(
        0,
        this.articles[articleIndex].commentsCount - 1,
      );
    }
  }

  // Analytics
  async getArticleStats(): Promise<{
    total: number;
    approved: number;
    pending: number;
    drafts: number;
    byCategory: Record<string, number>;
  }> {
    const currentUser = authService.getCurrentUser();
    if (!currentUser || !authService.hasRole("admin")) {
      throw new Error("Unauthorized: Admin access required");
    }

    await new Promise((resolve) => setTimeout(resolve, 300));

    const stats = {
      total: this.articles.length,
      approved: this.articles.filter((a) => a.status === "approved").length,
      pending: this.articles.filter((a) => a.status === "pending").length,
      drafts: this.articles.filter((a) => a.status === "draft").length,
      byCategory: {} as Record<string, number>,
    };

    // Calculate by category
    this.articles.forEach((article) => {
      stats.byCategory[article.category] =
        (stats.byCategory[article.category] || 0) + 1;
    });

    return stats;
  }
}

export const newsService = new NewsService();
