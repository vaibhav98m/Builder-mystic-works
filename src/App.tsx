import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { NewsProvider } from "./contexts/NewsContext";
import { Toaster } from "sonner";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import AdminDashboardSimple from "./pages/AdminDashboardSimple";
import MySubmissions from "./pages/MySubmissions";
import MySubmissionsSimple from "./pages/MySubmissionsSimple";
import MySubmissionsFixed from "./pages/MySubmissionsFixed";
import CreateArticle from "./pages/CreateArticle";
import ArticlePage from "./pages/ArticlePage";
import Profile from "./pages/Profile";
import ManageUsers from "./pages/ManageUsers";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import TestMySubmissions from "./pages/TestMySubmissions";

// Components
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <NewsProvider>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/article/:id" element={<ArticlePage />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route
                path="/test-my-submissions"
                element={<TestMySubmissions />}
              />

              {/* Protected routes for authenticated users */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              {/* Employee (Writer) routes */}
              <Route
                path="/my-submissions"
                element={
                  <ProtectedRoute requiredRole="employee">
                    <MySubmissionsFixed />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create-article"
                element={
                  <ProtectedRoute requiredRole="employee">
                    <CreateArticle />
                  </ProtectedRoute>
                }
              />

              {/* Admin routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboardSimple />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/manage-users"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <ManageUsers />
                  </ProtectedRoute>
                }
              />

              {/* 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>

          {/* Global toast notifications */}
          <Toaster position="top-right" richColors />
        </NewsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
