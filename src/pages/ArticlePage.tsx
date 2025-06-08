import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useNews } from "@/contexts/NewsContext";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { CommentSection } from "@/components/CommentSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Heart,
  MessageCircle,
  Edit,
  Trash2,
  User,
  Share2,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Article } from "@/types";

const ArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, hasRole } = useAuth();
  const { getArticleById, deleteArticle } = useNews();

  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const loadArticle = async () => {
      if (!id) {
        navigate("/");
        return;
      }

      try {
        setIsLoading(true);
        const articleData = await getArticleById(id);

        if (!articleData) {
          navigate("/not-found");
          return;
        }

        setArticle(articleData);
      } catch (error) {
        navigate("/not-found");
      } finally {
        setIsLoading(false);
      }
    };

    loadArticle();
  }, [id, getArticleById, navigate]);

  const handleDelete = async () => {
    if (!article) return;

    try {
      setIsDeleting(true);
      await deleteArticle(article.id);
      navigate("/");
    } catch (error) {
      setIsDeleting(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article?.title,
          text: article?.summary,
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  const canEdit = () => {
    if (!user || !article) return false;
    return (
      hasRole("admin") || (hasRole("employee") && article.authorId === user.id)
    );
  };

  const canDelete = () => {
    if (!user || !article) return false;
    return (
      hasRole("admin") || (hasRole("employee") && article.authorId === user.id)
    );
  };

  const getStatusColor = (status: Article["status"]) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-300";
      case "draft":
        return "bg-gray-100 text-gray-800 border-gray-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getAvatarBackground = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-500";
      case "employee":
        return "bg-blue-500";
      case "reader":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-6 bg-gray-200 rounded w-24"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="aspect-video bg-gray-200 rounded"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const displayDate = article.publishedAt || article.createdAt;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Articles
            </Link>
          </Button>

          <article className="space-y-6">
            {/* Header */}
            <header className="space-y-4">
              {/* Category and Status */}
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{article.category}</Badge>
                {(hasRole("admin") ||
                  (hasRole("employee") && article.authorId === user?.id)) && (
                  <Badge
                    className={getStatusColor(article.status)}
                    variant="outline"
                  >
                    {article.status.charAt(0).toUpperCase() +
                      article.status.slice(1)}
                  </Badge>
                )}
              </div>

              {/* Title */}
              <h1 className="text-4xl font-bold leading-tight">
                {article.title}
              </h1>

              {/* Summary */}
              <p className="text-xl text-muted-foreground leading-relaxed">
                {article.summary}
              </p>

              {/* Meta Information */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4 border-y">
                <div className="flex items-center gap-4">
                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback
                        className={`${getAvatarBackground(article.author.role)} text-white font-semibold`}
                      >
                        {article.author.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{article.author.name}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        {article.publishedAt ? (
                          <Calendar className="h-3 w-3" />
                        ) : (
                          <Clock className="h-3 w-3" />
                        )}
                        <span>
                          {formatDistanceToNow(displayDate, {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      <span>{article.likesCount}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{article.commentsCount}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>

                  {canEdit() && (
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/edit-article/${article.id}`}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Link>
                    </Button>
                  )}

                  {canDelete() && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Article</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this article? This
                            action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            {isDeleting ? "Deleting..." : "Delete"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </div>
            </header>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {article.content.split("\n\n").map((paragraph, index) => (
                <p key={index} className="mb-6 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-6 border-t">
                <span className="text-sm font-medium text-muted-foreground">
                  Tags:
                </span>
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </article>

          <Separator className="my-12" />

          {/* Comments Section */}
          <CommentSection articleId={article.id} />
        </div>
      </main>
    </div>
  );
};

export default ArticlePage;
