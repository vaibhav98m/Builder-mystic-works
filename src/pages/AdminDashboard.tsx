import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNews } from "@/contexts/NewsContext";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { ArticleCard } from "@/components/ArticleCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  Shield,
  MoreVertical,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  Users,
  FileText,
  Calendar,
  TrendingUp,
  Clock,
} from "lucide-react";
import { Article } from "@/types";
import { newsService } from "@/services/newsService";

const AdminDashboard = () => {
  const {
    loadArticles,
    articles,
    isLoadingArticles,
    updateArticle,
    deleteArticle,
  } = useNews();
  const { hasRole } = useAuth();
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    drafts: 0,
    byCategory: {} as Record<string, number>,
  });
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Load all articles for admin view
      await loadArticles(1, {}); // No filters to see all articles

      // Load stats
      try {
        const articleStats = await newsService.getArticleStats();
        setStats(articleStats);
      } catch (error) {
        console.error("Failed to load stats:", error);
      } finally {
        setIsLoadingStats(false);
      }
    };

    if (hasRole("admin")) {
      fetchData();
    }
  }, [hasRole, loadArticles]);

  const handleApprove = async (articleId: string) => {
    try {
      await updateArticle(articleId, { status: "approved" });
    } catch (error) {
      // Error is handled by the context
    }
  };

  const handleReject = async (articleId: string) => {
    try {
      await updateArticle(articleId, { status: "rejected" });
    } catch (error) {
      // Error is handled by the context
    }
  };

  const handleDelete = async (articleId: string) => {
    try {
      await deleteArticle(articleId);
    } catch (error) {
      // Error is handled by the context
    }
  };

  const renderArticleActions = (article: Article) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link to={`/article/${article.id}`} className="flex items-center">
            <Eye className="mr-2 h-4 w-4" />
            View
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            to={`/edit-article/${article.id}`}
            className="flex items-center"
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </DropdownMenuItem>
        {article.status === "pending" && (
          <>
            <DropdownMenuItem onClick={() => handleApprove(article.id)}>
              <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
              Approve
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleReject(article.id)}>
              <XCircle className="mr-2 h-4 w-4 text-red-600" />
              Reject
            </DropdownMenuItem>
          </>
        )}
        {article.status === "rejected" && (
          <DropdownMenuItem onClick={() => handleApprove(article.id)}>
            <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
            Approve
          </DropdownMenuItem>
        )}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Trash2 className="mr-2 h-4 w-4 text-red-600" />
              Delete
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Article</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete "{article.title}"? This action
                cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDelete(article.id)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const pendingArticles = articles.filter(
    (article) => article.status === "pending",
  );
  const approvedArticles = articles.filter(
    (article) => article.status === "approved",
  );
  const rejectedArticles = articles.filter(
    (article) => article.status === "rejected",
  );
  const draftArticles = articles.filter(
    (article) => article.status === "draft",
  );

  const renderArticleList = (articleList: Article[], emptyMessage: string) => {
    if (articleList.length === 0) {
      return (
        <div className="text-center py-12 text-muted-foreground">
          <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>{emptyMessage}</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articleList.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            showStatus
            actions={renderArticleActions(article)}
          />
        ))}
      </div>
    );
  };

  // Show loading for admin check

  if (!hasRole("admin")) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto text-center">
            <Shield className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
            <p className="text-muted-foreground mb-6">
              You need admin privileges to access this page.
            </p>
            <Button asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i}>
                    <CardContent className="p-4">
                      <div className="h-8 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Shield className="h-8 w-8" />
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground">
                Manage articles, moderate content, and oversee the platform
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link to="/admin/users">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Users
                </Link>
              </Button>
              <Button asChild>
                <Link to="/create-article">
                  <FileText className="mr-2 h-4 w-4" />
                  Create Article
                </Link>
              </Button>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 text-blue-600 mb-2">
                  <FileText className="h-5 w-5" />
                  <span className="text-2xl font-bold">{stats.total}</span>
                </div>
                <p className="text-sm text-muted-foreground">Total Articles</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 text-yellow-600 mb-2">
                  <Clock className="h-5 w-5" />
                  <span className="text-2xl font-bold">{stats.pending}</span>
                </div>
                <p className="text-sm text-muted-foreground">Pending Review</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 text-green-600 mb-2">
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-2xl font-bold">{stats.approved}</span>
                </div>
                <p className="text-sm text-muted-foreground">Published</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 text-orange-600 mb-2">
                  <TrendingUp className="h-5 w-5" />
                  <span className="text-2xl font-bold">{stats.drafts}</span>
                </div>
                <p className="text-sm text-muted-foreground">Drafts</p>
              </CardContent>
            </Card>
          </div>

          {/* Category Breakdown */}
          {Object.keys(stats.byCategory).length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Articles by Category</CardTitle>
                <CardDescription>
                  Distribution of articles across different categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  {Object.entries(stats.byCategory).map(([category, count]) => (
                    <div key={category} className="text-center">
                      <div className="text-2xl font-bold">{count}</div>
                      <div className="text-sm text-muted-foreground">
                        {category}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Priority Section - Pending Articles */}
          {pendingArticles.length > 0 && (
            <Card className="border-yellow-200 bg-yellow-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-800">
                  <Clock className="h-5 w-5" />
                  Pending Review ({pendingArticles.length})
                </CardTitle>
                <CardDescription>
                  Articles waiting for your approval
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderArticleList(pendingArticles, "")}
              </CardContent>
            </Card>
          )}

          {/* Main Content Tabs */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All ({articles.length})</TabsTrigger>
              <TabsTrigger value="pending">
                Pending ({pendingArticles.length})
              </TabsTrigger>
              <TabsTrigger value="approved">
                Published ({approvedArticles.length})
              </TabsTrigger>
              <TabsTrigger value="rejected">
                Rejected ({rejectedArticles.length})
              </TabsTrigger>
              <TabsTrigger value="drafts">
                Drafts ({draftArticles.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              {renderArticleList(articles, "No articles found.")}
            </TabsContent>

            <TabsContent value="pending">
              {renderArticleList(
                pendingArticles,
                "No articles pending review. Great job staying on top of submissions!",
              )}
            </TabsContent>

            <TabsContent value="approved">
              {renderArticleList(
                approvedArticles,
                "No published articles yet.",
              )}
            </TabsContent>

            <TabsContent value="rejected">
              {renderArticleList(
                rejectedArticles,
                "No rejected articles. That's great - quality submissions!",
              )}
            </TabsContent>

            <TabsContent value="drafts">
              {renderArticleList(draftArticles, "No draft articles found.")}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
