import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  Article,
  Comment,
  CreateArticleRequest,
  UpdateArticleRequest,
  ArticleFilters,
  PaginatedResponse,
} from "@/types";
import { newsService } from "@/services/newsService";
import { toast } from "@/hooks/use-toast";

interface NewsContextType {
  // Articles
  articles: Article[];
  totalArticles: number;
  currentPage: number;
  isLoadingArticles: boolean;
  loadArticles: (page?: number, filters?: ArticleFilters) => Promise<void>;
  getArticleById: (id: string) => Promise<Article | null>;
  createArticle: (articleData: CreateArticleRequest) => Promise<Article>;
  updateArticle: (
    id: string,
    updates: UpdateArticleRequest,
  ) => Promise<Article>;
  deleteArticle: (id: string) => Promise<void>;

  // Comments
  comments: Record<string, Comment[]>; // articleId -> comments
  isLoadingComments: boolean;
  loadComments: (articleId: string) => Promise<void>;
  createComment: (articleId: string, content: string) => Promise<Comment>;
  deleteComment: (commentId: string, articleId: string) => Promise<void>;

  // Filters and search
  currentFilters: ArticleFilters;
  setFilters: (filters: ArticleFilters) => void;

  // Refresh data
  refreshArticles: () => Promise<void>;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

interface NewsProviderProps {
  children: ReactNode;
}

export const NewsProvider: React.FC<NewsProviderProps> = ({ children }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [totalArticles, setTotalArticles] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingArticles, setIsLoadingArticles] = useState(false);

  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [isLoadingComments, setIsLoadingComments] = useState(false);

  const [currentFilters, setCurrentFilters] = useState<ArticleFilters>({});

  const loadArticles = async (
    page: number = 1,
    filters: ArticleFilters = currentFilters,
  ) => {
    try {
      setIsLoadingArticles(true);
      const response: PaginatedResponse<Article> =
        await newsService.getArticles(page, 10, filters);

      if (page === 1) {
        setArticles(response.data);
      } else {
        setArticles((prev) => [...prev, ...response.data]);
      }

      setTotalArticles(response.total);
      setCurrentPage(page);
      setCurrentFilters(filters);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load articles",
        variant: "destructive",
      });
    } finally {
      setIsLoadingArticles(false);
    }
  };

  const getArticleById = React.useCallback(
    async (id: string): Promise<Article | null> => {
      try {
        return await newsService.getArticleById(id);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load article",
          variant: "destructive",
        });
        return null;
      }
    },
    [],
  ); // Memoize to prevent unnecessary re-renders

  const createArticle = async (
    articleData: CreateArticleRequest,
  ): Promise<Article> => {
    try {
      const newArticle = await newsService.createArticle(articleData);

      // Add to local state if it matches current filters
      if (
        newArticle.status === "approved" ||
        currentFilters.status === newArticle.status
      ) {
        setArticles((prev) => [newArticle, ...prev]);
        setTotalArticles((prev) => prev + 1);
      }

      toast({
        title: "Success",
        description:
          newArticle.status === "approved"
            ? "Article published successfully!"
            : "Article submitted for review",
      });

      return newArticle;
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to create article",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateArticle = async (
    id: string,
    updates: UpdateArticleRequest,
  ): Promise<Article> => {
    try {
      const updatedArticle = await newsService.updateArticle(id, updates);

      // Update local state
      setArticles((prev) =>
        prev.map((article) => (article.id === id ? updatedArticle : article)),
      );

      toast({
        title: "Success",
        description: "Article updated successfully",
      });

      return updatedArticle;
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to update article",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteArticle = async (id: string): Promise<void> => {
    try {
      await newsService.deleteArticle(id);

      // Remove from local state
      setArticles((prev) => prev.filter((article) => article.id !== id));
      setTotalArticles((prev) => prev - 1);

      // Remove comments for this article
      setComments((prev) => {
        const newComments = { ...prev };
        delete newComments[id];
        return newComments;
      });

      toast({
        title: "Success",
        description: "Article deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to delete article",
        variant: "destructive",
      });
      throw error;
    }
  };

  const loadComments = React.useCallback(async (articleId: string) => {
    try {
      setIsLoadingComments(true);
      const articleComments =
        await newsService.getCommentsByArticleId(articleId);
      setComments((prev) => ({
        ...prev,
        [articleId]: articleComments,
      }));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load comments",
        variant: "destructive",
      });
    } finally {
      setIsLoadingComments(false);
    }
  }, []); // Memoize to prevent unnecessary re-renders

  const createComment = async (
    articleId: string,
    content: string,
  ): Promise<Comment> => {
    try {
      const newComment = await newsService.createComment(articleId, content);

      // Add to local state
      setComments((prev) => ({
        ...prev,
        [articleId]: [...(prev[articleId] || []), newComment],
      }));

      // Update article comment count in local state
      setArticles((prev) =>
        prev.map((article) =>
          article.id === articleId
            ? { ...article, commentsCount: article.commentsCount + 1 }
            : article,
        ),
      );

      toast({
        title: "Success",
        description: "Comment posted successfully",
      });

      return newComment;
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to post comment",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteComment = async (
    commentId: string,
    articleId: string,
  ): Promise<void> => {
    try {
      await newsService.deleteComment(commentId);

      // Remove from local state
      setComments((prev) => ({
        ...prev,
        [articleId]: (prev[articleId] || []).filter(
          (comment) => comment.id !== commentId,
        ),
      }));

      // Update article comment count in local state
      setArticles((prev) =>
        prev.map((article) =>
          article.id === articleId
            ? {
                ...article,
                commentsCount: Math.max(0, article.commentsCount - 1),
              }
            : article,
        ),
      );

      toast({
        title: "Success",
        description: "Comment deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to delete comment",
        variant: "destructive",
      });
      throw error;
    }
  };

  const setFilters = (filters: ArticleFilters) => {
    setCurrentFilters(filters);
    loadArticles(1, filters);
  };

  const refreshArticles = async () => {
    await loadArticles(1, currentFilters);
  };

  const contextValue: NewsContextType = {
    articles,
    totalArticles,
    currentPage,
    isLoadingArticles,
    loadArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle,

    comments,
    isLoadingComments,
    loadComments,
    createComment,
    deleteComment,

    currentFilters,
    setFilters,

    refreshArticles,
  };

  return (
    <NewsContext.Provider value={contextValue}>{children}</NewsContext.Provider>
  );
};

export const useNews = () => {
  const context = useContext(NewsContext);
  if (context === undefined) {
    throw new Error("useNews must be used within a NewsProvider");
  }
  return context;
};
