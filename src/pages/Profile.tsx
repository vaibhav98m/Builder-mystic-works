import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ArrowLeft,
  User,
  Mail,
  Calendar,
  Shield,
  Home,
  FileText,
  Settings,
  PlusCircle,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Not Logged In</h1>
            <p className="text-muted-foreground mb-6">
              Please log in to view your profile.
            </p>
            <Button asChild>
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

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

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800 border-red-300";
      case "employee":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "reader":
        return "bg-green-100 text-green-800 border-green-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getRoleDescription = (role: string) => {
    switch (role) {
      case "admin":
        return "Full access to manage users, moderate content, and publish articles";
      case "employee":
        return "Can create and submit articles for review";
      case "reader":
        return "Can read articles and leave comments";
      default:
        return "Standard user account";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Back Button */}
          <Button variant="ghost" asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>

          {/* Profile Card */}
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Avatar className="h-20 w-20">
                  <AvatarFallback
                    className={`${getAvatarBackground(user.role)} text-white font-bold text-2xl`}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-2xl">{user.name}</CardTitle>
              <CardDescription className="text-lg">
                {user.email}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Role Information */}
              <div className="text-center space-y-3">
                <div className="flex justify-center">
                  <Badge className={getRoleColor(user.role)} variant="outline">
                    <Shield className="mr-1 h-3 w-3" />
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {getRoleDescription(user.role)}
                </p>
              </div>

              {/* Account Details */}
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Full Name</p>
                    <p className="text-sm text-muted-foreground">{user.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Email Address</p>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Member Since</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDistanceToNow(user.createdAt, { addSuffix: true })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="pt-4 border-t">
                <h3 className="font-medium mb-3">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" asChild className="h-auto p-3">
                    <Link to="/">
                      <div className="text-center">
                        <Home className="h-5 w-5 mx-auto mb-1" />
                        <span className="text-sm">Home</span>
                      </div>
                    </Link>
                  </Button>

                  {(user.role === "admin" || user.role === "employee") && (
                    <Button variant="outline" asChild className="h-auto p-3">
                      <Link to="/my-submissions">
                        <div className="text-center">
                          <FileText className="h-5 w-5 mx-auto mb-1" />
                          <span className="text-sm">My Articles</span>
                        </div>
                      </Link>
                    </Button>
                  )}

                  {user.role === "admin" && (
                    <Button variant="outline" asChild className="h-auto p-3">
                      <Link to="/admin">
                        <div className="text-center">
                          <Settings className="h-5 w-5 mx-auto mb-1" />
                          <span className="text-sm">Admin</span>
                        </div>
                      </Link>
                    </Button>
                  )}

                  {(user.role === "admin" || user.role === "employee") && (
                    <Button variant="outline" asChild className="h-auto p-3">
                      <Link to="/create-article">
                        <div className="text-center">
                          <PlusCircle className="h-5 w-5 mx-auto mb-1" />
                          <span className="text-sm">Create</span>
                        </div>
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Settings (placeholder) */}
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account preferences and settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6 text-muted-foreground">
                <p>Account settings will be available in a future update.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Profile;
