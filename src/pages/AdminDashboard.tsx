import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNews } from "@/contexts/NewsContext";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, FileText } from "lucide-react";

const AdminDashboard = () => {
  const { user, hasRole } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    console.log("AdminDashboard mounted");
    console.log("Current user:", user);
    console.log("Has admin role:", hasRole("admin"));
  }, [user, hasRole]);

  console.log(
    "AdminDashboard rendering - mounted:",
    mounted,
    "user:",
    user?.role,
  );

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4">Loading...</p>
          </div>
        </main>
      </div>
    );
  }

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
            <p className="text-sm text-muted-foreground mb-4">
              Current user: {user?.email} ({user?.role})
            </p>
            <Button asChild>
              <Link to="/">Back to Home</Link>
            </Button>
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
                Welcome, {user?.name}! You have admin access.
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

          {/* Simple Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Articles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Loading...</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Pending Review</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Loading...</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Published</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Loading...</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Loading...</div>
              </CardContent>
            </Card>
          </div>

          {/* Debug Info */}
          <Card>
            <CardHeader>
              <CardTitle>Debug Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Current User:</strong> {user?.email}
                </p>
                <p>
                  <strong>User Role:</strong> {user?.role}
                </p>
                <p>
                  <strong>Has Admin Role:</strong>{" "}
                  {hasRole("admin") ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Component Mounted:</strong> {mounted ? "Yes" : "No"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-4">
              <Button asChild>
                <Link to="/create-article">Create Article</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/my-submissions">View All Articles</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/">Back to Homepage</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
