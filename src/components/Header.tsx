import React, { useState, useMemo, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Newspaper,
  Search,
  PlusCircle,
  Settings,
  LogOut,
  User,
  FileText,
  Users,
  Menu,
  Home,
} from "lucide-react";

export const Header: React.FC = () => {
  const { user, logout, isAuthenticated, hasRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  // Memoize auth checks to prevent unnecessary re-renders
  const authState = useMemo(
    () => ({
      isAuthenticated,
      isAdmin: isAuthenticated && hasRole("admin"),
      isEmployee: isAuthenticated && (hasRole("admin") || hasRole("employee")),
    }),
    [isAuthenticated, user?.role],
  ); // Only depend on user role, not hasRole function

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      }
    },
    [searchQuery, navigate],
  );

  const handleLogout = useCallback(() => {
    logout();
    navigate("/");
  }, [logout, navigate]);

  const getRoleColor = useCallback((role: string) => {
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
  }, []);

  const getAvatarBackground = useCallback((role: string) => {
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
  }, []);

  const NavLinks = React.memo(({ mobile = false }: { mobile?: boolean }) => (
    <>
      <Link
        to="/"
        className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
          location.pathname === "/" ? "text-primary" : "text-muted-foreground"
        } ${mobile ? "py-2" : ""}`}
      >
        <Home className="h-4 w-4" />
        Home
      </Link>

      {authState.isAdmin && (
        <Link
          to="/admin"
          className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
            location.pathname.startsWith("/admin")
              ? "text-primary"
              : "text-muted-foreground"
          } ${mobile ? "py-2" : ""}`}
        >
          <Settings className="h-4 w-4" />
          Admin
        </Link>
      )}

      {authState.isEmployee && (
        <>
          <Link
            to="/create-article"
            className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === "/create-article"
                ? "text-primary"
                : "text-muted-foreground"
            } ${mobile ? "py-2" : ""}`}
          >
            <PlusCircle className="h-4 w-4" />
            Create Article
          </Link>

          <Link
            to="/my-submissions"
            className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === "/my-submissions"
                ? "text-primary"
                : "text-muted-foreground"
            } ${mobile ? "py-2" : ""}`}
          >
            <FileText className="h-4 w-4" />
            My Articles
          </Link>
        </>
      )}
    </>
  ));

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <Newspaper className="h-6 w-6" />
          <span className="font-bold text-xl">NewsHub</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium ml-6">
          <NavLinks />
        </nav>

        {/* Search */}
        <div className="flex-1 flex justify-center px-4">
          <form onSubmit={handleSearch} className="w-full max-w-sm">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
        </div>

        {/* User Menu / Auth Buttons */}
        <div className="flex items-center space-x-4">
          {authState.isAuthenticated && user ? (
            <>
              {/* Desktop User Menu */}
              <div className="hidden md:block">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback
                          className={`${getAvatarBackground(user.role)} text-white font-semibold`}
                        >
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                        <Badge
                          className={getRoleColor(user.role)}
                          variant="outline"
                        >
                          {user.role.charAt(0).toUpperCase() +
                            user.role.slice(1)}
                        </Badge>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    {authState.isAdmin && (
                      <DropdownMenuItem asChild>
                        <Link to="/admin/users" className="flex items-center">
                          <Users className="mr-2 h-4 w-4" />
                          Manage Users
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Mobile Menu */}
              <div className="md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-80">
                    <div className="flex flex-col space-y-4 mt-4">
                      {/* User Info */}
                      <div className="flex items-center space-x-3 p-4 border rounded-lg">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback
                            className={`${getAvatarBackground(user.role)} text-white font-semibold`}
                          >
                            {user.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {user.email}
                          </p>
                          <Badge
                            className={getRoleColor(user.role)}
                            variant="outline"
                          >
                            {user.role.charAt(0).toUpperCase() +
                              user.role.slice(1)}
                          </Badge>
                        </div>
                      </div>

                      {/* Navigation */}
                      <nav className="flex flex-col space-y-2">
                        <NavLinks mobile />
                      </nav>

                      {/* Actions */}
                      <div className="flex flex-col space-y-2 pt-4 border-t">
                        <Button
                          variant="ghost"
                          asChild
                          className="justify-start"
                        >
                          <Link to="/profile">
                            <User className="mr-2 h-4 w-4" />
                            Profile
                          </Link>
                        </Button>
                        {authState.isAdmin && (
                          <Button
                            variant="ghost"
                            asChild
                            className="justify-start"
                          >
                            <Link to="/admin/users">
                              <Users className="mr-2 h-4 w-4" />
                              Manage Users
                            </Link>
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          onClick={handleLogout}
                          className="justify-start"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Log out
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
