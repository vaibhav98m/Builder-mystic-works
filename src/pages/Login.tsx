import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Loader2, Newspaper, Mail, Lock } from "lucide-react";

const Login = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Get the page the user was trying to access
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      await login({ email, password });
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
  };

  const demoAccounts = [
    {
      email: "admin@news.com",
      role: "Admin",
      description: "Can publish articles and manage users",
    },
    {
      email: "employee@news.com",
      role: "Writer",
      description: "Can create and submit articles for review",
    },
    {
      email: "reader@news.com",
      role: "Reader",
      description: "Can read articles and leave comments",
    },
  ];

  const handleDemoLogin = (email: string) => {
    setEmail(email);
    setPassword("demo"); // Any password works for demo
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-2xl font-bold"
          >
            <Newspaper className="h-8 w-8" />
            NewsHub
          </Link>
          <p className="text-muted-foreground mt-2">Sign in to your account</p>
        </div>

        {/* Demo Accounts */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Demo Accounts</CardTitle>
            <CardDescription>Try different user roles</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {demoAccounts.map((account) => (
              <Button
                key={account.email}
                variant="outline"
                className="w-full justify-start h-auto p-3"
                onClick={() => handleDemoLogin(account.email)}
              >
                <div className="text-left">
                  <div className="font-medium">{account.role}</div>
                  <div className="text-xs text-muted-foreground">
                    {account.description}
                  </div>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or sign in manually
            </span>
          </div>
        </div>

        {/* Login Form */}
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="pl-9"
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-primary hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          This is a demo application. Any password will work for the demo
          accounts.
        </p>
      </div>
    </div>
  );
};

export default Login;
