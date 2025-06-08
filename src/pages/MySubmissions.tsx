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
  FileText,
  PlusCircle,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
} from "lucide-react";
import { Article } from "@/types";

const MySubmissions = () => {
  const { user } = useAuth();
  const { loadArticles, articles, isLoadingArticles, deleteArticle } =
    useNews();
  const [myArticles, setMyArticles] = useState<{
    drafts: Article[];
    pending: Article[];
    approved: Article[];
    rejected: Article[];
  }>({
    drafts: [],
    pending: [],
    approved: [],
    rejected: [],
  });

  useEffect(() => {
    const fetchMyArticles = async () => {
      if (!user) return;

      // Load all articles for this user
      await loadArticles(1, { authorId: user.id });
    };

    fetchMyArticles();
  }, [user, loadArticles]);

  useEffect(() => {
    // Group articles by status
    const userArticles = articles.filter(
      (article) => article.authorId === user?.id,
    );

    setMyArticles({
      drafts: userArticles.filter((article) => article.status === "draft"),
      pending: userArticles.filter((article) => article.status === "pending"),
      approved: userArticles.filter((article) => article.status === "approved"),
      rejected: userArticles.filter((article) => article.status === "rejected"),
    });
  }, [articles, user]);

  const handleDelete = async (articleId: string) => {
    try {
      await deleteArticle(articleId);
    } catch (error) {
      // Error is handled by the context
    }
  };

  const getStatusIcon = (status: Article["status"]) => {
    switch (status) {
      case "draft":
        return <Edit className="h-4 w-4" />;
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "approved":
        return <CheckCircle className="h-4 w-4" />;
      case "rejected":
        return <XCircle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusDescription = (status: Article["status"]) => {
    switch (status) {
      case "draft":
        return "Saved but not submitted for review";
      case "pending":
        return "Submitted and awaiting admin review";
      case "approved":
        return "Published and visible to readers";
      case "rejected":
        return "Rejected by admin - needs revision";
      default:
        return "";
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
        {(article.status === "draft" || article.status === "rejected") && (
          <DropdownMenuItem asChild>
            <Link
              to={`/edit-article/${article.id}`}
              className="flex items-center"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </DropdownMenuItem>
        )}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Trash2 className="mr-2 h-4 w-4" />
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

  if (isLoadingArticles) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <div className="aspect-video bg-gray-200"></div>
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-gray-200 rounded"></div>
                          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        </div>
                      </div>
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

  const totalArticles =
    myArticles.drafts.length +
    myArticles.pending.length +
    myArticles.approved.length +
    myArticles.rejected.length;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">My Articles</h1>
              <p className="text-muted-foreground">
                Manage your articles and track their publication status
              </p>
            </div>
            <Button asChild>
              <Link to="/create-article">
                <PlusCircle className="mr-2 h-4 w-4" />
                Write New Article
              </Link>
            </Button>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 text-orange-600 mb-2">
                  <Edit className="h-5 w-5" />
                  <span className="text-2xl font-bold">
                    {myArticles.drafts.length}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">Drafts</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 text-yellow-600 mb-2">
                  <Clock className="h-5 w-5" />
                  <span className="text-2xl font-bold">
                    {myArticles.pending.length}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">Pending</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 text-green-600 mb-2">
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-2xl font-bold">
                    {myArticles.approved.length}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">Published</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 text-red-600 mb-2">
                  <XCircle className="h-5 w-5" />
                  <span className="text-2xl font-bold">
                    {myArticles.rejected.length}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">Rejected</p>
              </CardContent>
            </Card>
          </div>

          {totalArticles === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                <CardTitle className="mb-2">No Articles Yet</CardTitle>
                <CardDescription className="mb-6">
                  Start sharing your knowledge and insights with the community.
                </CardDescription>
                <Button asChild>
                  <Link to="/create-article">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Write Your First Article
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">All ({totalArticles})</TabsTrigger>
                <TabsTrigger value="drafts">
                  Drafts ({myArticles.drafts.length})
                </TabsTrigger>
                <TabsTrigger value="pending">
                  Pending ({myArticles.pending.length})
                </TabsTrigger>
                <TabsTrigger value="approved">
                  Published ({myArticles.approved.length})
                </TabsTrigger>
                <TabsTrigger value="rejected">
                  Rejected ({myArticles.rejected.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-6">
                {Object.entries(myArticles).map(([status, articleList]) => {
                  if (articleList.length === 0) return null;

                  return (
                    <div key={status} className="space-y-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(status as Article["status"])}
                        <h3 className="text-lg font-semibold capitalize">
                          {status}
                        </h3>
                        <Badge variant="secondary">{articleList.length}</Badge>
                        <span className="text-sm text-muted-foreground">
                          - {getStatusDescription(status as Article["status"])}
                        </span>
                      </div>
                      {renderArticleList(articleList, "")}
                    </div>
                  );
                })}
              </TabsContent>

              <TabsContent value="drafts">
                {renderArticleList(
                  myArticles.drafts,
                  "No drafts yet. Start writing to save your work in progress.",
                )}
              </TabsContent>

              <TabsContent value="pending">
                {renderArticleList(
                  myArticles.pending,
                  "No articles pending review. Submit an article to see it here.",
                )}
              </TabsContent>

              <TabsContent value="approved">
                {renderArticleList(
                  myArticles.approved,
                  "No published articles yet. Keep writing great content!",
                )}
              </TabsContent>

              <TabsContent value="rejected">
                {renderArticleList(
                  myArticles.rejected,
                  "No rejected articles. That's great!",
                )}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
    </div>
  );
};

export default MySubmissions;
