import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
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
  FileText,
  PlusCircle,
  Edit,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
} from "lucide-react";
import { Article } from "@/types";
import { newsService } from "@/services/newsService";

const MySubmissionsFixed = () => {
  const { user } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUserArticles = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // Get articles by the current user
        const result = await newsService.getArticles(1, { authorId: user.id });

        // Ensure we always set an array, even if the result is unexpected
        const articlesData = result?.articles || [];
        setArticles(Array.isArray(articlesData) ? articlesData : []);
      } catch (err) {
        console.error("Error loading user articles:", err);
        setError("Failed to load articles");
        setArticles([]); // Ensure articles is still an array on error
      } finally {
        setIsLoading(false);
      }
    };

    loadUserArticles();
  }, [user]);

  // Group articles by status with safety checks
  const safeArticles = Array.isArray(articles) ? articles : [];
  const groupedArticles = {
    draft: safeArticles.filter((a) => a.status === "draft"),
    pending: safeArticles.filter((a) => a.status === "pending"),
    approved: safeArticles.filter((a) => a.status === "approved"),
    rejected: safeArticles.filter((a) => a.status === "rejected"),
  };

  const getStatusColor = (status: Article["status"]) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: Article["status"]) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4" />;
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "rejected":
        return <XCircle className="h-4 w-4" />;
      case "draft":
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const renderArticleCard = (article: Article) => (
    <Card key={article.id} className="transition-shadow hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg leading-6 line-clamp-2">
            {article.title}
          </CardTitle>
          <Badge
            className={`ml-2 flex-shrink-0 ${getStatusColor(article.status)}`}
          >
            <div className="flex items-center gap-1">
              {getStatusIcon(article.status)}
              <span className="capitalize">{article.status}</span>
            </div>
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">
          {article.summary}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(article.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>Category: {article.category}</span>
            </div>
          </div>
          <div className="flex gap-2">
            {article.status === "approved" && (
              <Link to={`/article/${article.id}`}>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
              </Link>
            )}
            {(article.status === "draft" || article.status === "rejected") && (
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Error Loading Articles
            </h3>
            <p className="text-muted-foreground">{error}</p>
            <Button className="mt-4" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalArticles = safeArticles.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Articles</h1>
              <p className="text-gray-600 mt-2">
                Manage your articles and track their publication status
              </p>
            </div>
            <Link to="/create-article">
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                New Article
              </Button>
            </Link>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-2 text-gray-600 mb-2">
                <FileText className="h-5 w-5" />
                <span className="text-2xl font-bold">
                  {groupedArticles.draft.length}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">Drafts</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-2 text-yellow-600 mb-2">
                <Clock className="h-5 w-5" />
                <span className="text-2xl font-bold">
                  {groupedArticles.pending.length}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">Pending</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-2 text-green-600 mb-2">
                <CheckCircle className="h-5 w-5" />
                <span className="text-2xl font-bold">
                  {groupedArticles.approved.length}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">Published</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-2 text-red-600 mb-2">
                <XCircle className="h-5 w-5" />
                <span className="text-2xl font-bold">
                  {groupedArticles.rejected.length}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">Rejected</p>
            </CardContent>
          </Card>
        </div>

        {/* Articles Content */}
        {totalArticles === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No articles yet</h3>
              <p className="text-muted-foreground mb-4">
                Start writing your first article to see it here.
              </p>
              <Link to="/create-article">
                <Button>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create Your First Article
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList>
              <TabsTrigger value="all">All ({totalArticles})</TabsTrigger>
              <TabsTrigger value="draft">
                Drafts ({groupedArticles.draft.length})
              </TabsTrigger>
              <TabsTrigger value="pending">
                Pending ({groupedArticles.pending.length})
              </TabsTrigger>
              <TabsTrigger value="approved">
                Published ({groupedArticles.approved.length})
              </TabsTrigger>
              <TabsTrigger value="rejected">
                Rejected ({groupedArticles.rejected.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {safeArticles.map(renderArticleCard)}
            </TabsContent>

            <TabsContent value="draft" className="space-y-4">
              {groupedArticles.draft.length > 0 ? (
                groupedArticles.draft.map(renderArticleCard)
              ) : (
                <Card>
                  <CardContent className="py-8 text-center">
                    <p className="text-muted-foreground">No draft articles</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="pending" className="space-y-4">
              {groupedArticles.pending.length > 0 ? (
                groupedArticles.pending.map(renderArticleCard)
              ) : (
                <Card>
                  <CardContent className="py-8 text-center">
                    <p className="text-muted-foreground">No pending articles</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="approved" className="space-y-4">
              {groupedArticles.approved.length > 0 ? (
                groupedArticles.approved.map(renderArticleCard)
              ) : (
                <Card>
                  <CardContent className="py-8 text-center">
                    <p className="text-muted-foreground">
                      No published articles yet
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="rejected" className="space-y-4">
              {groupedArticles.rejected.length > 0 ? (
                groupedArticles.rejected.map(renderArticleCard)
              ) : (
                <Card>
                  <CardContent className="py-8 text-center">
                    <p className="text-muted-foreground">
                      No rejected articles
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default MySubmissionsFixed;
