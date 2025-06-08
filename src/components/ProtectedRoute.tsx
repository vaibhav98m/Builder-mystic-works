import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  allowedRoles?: UserRole[];
  requireAuth?: boolean;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  allowedRoles,
  requireAuth = true,
  redirectTo = "/login",
}) => {
  const { isAuthenticated, hasRole, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    // Save the attempted location for redirecting after login
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Check role permissions with hierarchy (admin can access everything)
  if (requiredRole || allowedRoles) {
    const isAdmin = hasRole("admin");

    // Admin can access all pages
    if (isAdmin) {
      return <>{children}</>;
    }

    // Check specific role requirements for non-admin users
    if (requiredRole && !hasRole(requiredRole)) {
      return <Navigate to="/unauthorized" replace />;
    }

    if (allowedRoles && !allowedRoles.some((role) => hasRole(role))) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
