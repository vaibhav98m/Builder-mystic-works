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
  PlusCircle,
} from "lucide-react";
import { Article } from "@/types";
import { newsService } from "@/services/newsService";
import { authService } from "@/services/authService";

const AdminDashboardFixed = () => {
  const { user } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    drafts: 0,
    rejected: 0,
    totalUsers: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAdminData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Load articles with a high limit to get all articles
        const articlesResult = await newsService.getArticles(1, 100, {});
        const allArticles = articlesResult?.data || [];
        setArticles(allArticles);

        // Calculate statistics
        const totalUsers = authService.getAllUsers().length;
        const statsData = {
          total: allArticles.length,
          approved: allArticles.filter((a) => a.status === "approved").length,
          pending: allArticles.filter((a) => a.status === "pending").length,
          drafts: allArticles.filter((a) => a.status === "draft").length,
          rejected: allArticles.filter((a) => a.status === "rejected").length,
          totalUsers,
        };

        setStats(statsData);
      } catch (err) {
        console.error("Error loading admin data:", err);
        setError("Failed to load admin data");
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      loadAdminData();
    }
  }, [user]);

  const handleApproveArticle = async (articleId: string) => {
    try {
      await newsService.updateArticle(articleId, { status: "approved" });
      // Refresh articles
      const result = await newsService.getArticles(1, 100, {});
      setArticles(result?.data || []);
    } catch (err) {
      console.error("Error approving article:", err);
    }
  };

  const handleRejectArticle = async (articleId: string) => {
    try {
      await newsService.updateArticle(articleId, { status: "rejected" });
      // Refresh articles
      const result = await newsService.getArticles(1, 100, {});
      setArticles(result?.data || []);
    } catch (err) {
      console.error("Error rejecting article:", err);
    }
  };

  const handleDeleteArticle = async (articleId: string) => {
    try {
      await newsService.deleteArticle(articleId);
      // Refresh articles
      const result = await newsService.getArticles(1, 100, {});
      setArticles(result?.data || []);
    } catch (err) {
      console.error("Error deleting article:", err);
    }
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
            <h3 className="text-lg font-semibold mb-2">Error Loading Data</h3>
            <p className="text-muted-foreground">{error}</p>
            <Button className="mt-4" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const pendingArticles = articles.filter((a) => a.status === "pending");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Shield className="h-8 w-8 text-blue-600" />
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Manage articles, users, and platform settings
              </p>
            </div>
            <div className="flex gap-2">
              <Link to="/manage-users">
                <Button variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Users
                </Button>
              </Link>
              <Link to="/create-article">
                <Button>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create Article
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-2 text-blue-600 mb-2">
                <FileText className="h-5 w-5" />
                <span className="text-2xl font-bold">{stats.total}</span>
              </div>
              <p className="text-sm text-muted-foreground">Total Articles</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-2 text-yellow-600 mb-2">
                <Clock className="h-5 w-5" />
                <span className="text-2xl font-bold">{stats.pending}</span>
              </div>
              <p className="text-sm text-muted-foreground">Pending Review</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-2 text-green-600 mb-2">
                <CheckCircle className="h-5 w-5" />
                <span className="text-2xl font-bold">{stats.approved}</span>
              </div>
              <p className="text-sm text-muted-foreground">Published</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-2 text-red-600 mb-2">
                <XCircle className="h-5 w-5" />
                <span className="text-2xl font-bold">{stats.rejected}</span>
              </div>
              <p className="text-sm text-muted-foreground">Rejected</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-2 text-purple-600 mb-2">
                <Users className="h-5 w-5" />
                <span className="text-2xl font-bold">{stats.totalUsers}</span>
              </div>
              <p className="text-sm text-muted-foreground">Total Users</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pending Articles */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Articles Pending Review ({pendingArticles.length})
                </CardTitle>
                <CardDescription>
                  Review and approve or reject submitted articles
                </CardDescription>
              </CardHeader>
              <CardContent>
                {pendingArticles.length === 0 ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      All caught up! No articles pending review.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingArticles.slice(0, 5).map((article) => (
                      <div key={article.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-1">
                              {article.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              {article.summary}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>By {article.author.name}</span>
                              <span>
                                {new Date(
                                  article.createdAt,
                                ).toLocaleDateString()}
                              </span>
                              <Badge variant="secondary">
                                {article.category}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleApproveArticle(article.id)}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleRejectArticle(article.id)}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  Preview
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <DropdownMenuItem
                                      onSelect={(e) => e.preventDefault()}
                                    >
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Delete
                                    </DropdownMenuItem>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Delete Article
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to delete this
                                        article? This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>
                                        Cancel
                                      </AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() =>
                                          handleDeleteArticle(article.id)
                                        }
                                      >
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    ))}
                    {pendingArticles.length > 5 && (
                      <div className="text-center">
                        <Button variant="outline">
                          View All Pending Articles ({pendingArticles.length})
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/manage-users" className="block">
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="h-4 w-4 mr-2" />
                    Manage Users
                  </Button>
                </Link>
                <Link to="/create-article" className="block">
                  <Button className="w-full justify-start" variant="outline">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Create Article
                  </Button>
                </Link>
                <Button className="w-full justify-start" variant="outline">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Content Calendar
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Article approved by you</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-500" />
                    <span>New user registered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-purple-500" />
                    <span>Article submitted for review</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardFixed;
