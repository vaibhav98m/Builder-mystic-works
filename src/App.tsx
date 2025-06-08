import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthContext";
import { NewsProvider } from "@/contexts/NewsContext";

// Import pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MySubmissions from "./pages/MySubmissions";
import AdminDashboard from "./pages/AdminDashboard";
import CreateArticle from "./pages/CreateArticle";
import Profile from "./pages/Profile";
import ManageUsers from "./pages/ManageUsers";
import ArticlePage from "./pages/ArticlePage";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Simple test header to verify React Router is working
const TestHeader: React.FC = () => {
  const location = useLocation();

  return (
    <div
      style={{ padding: "10px", background: "#f0f0f0", marginBottom: "20px" }}
    >
      <div style={{ marginBottom: "10px" }}>
        <strong>Current Path: {location.pathname}</strong>
      </div>
      <nav style={{ display: "flex", gap: "20px" }}>
        <Link to="/" style={{ color: "blue", textDecoration: "underline" }}>
          Home
        </Link>
        <Link
          to="/my-submissions"
          style={{ color: "blue", textDecoration: "underline" }}
        >
          My Submissions
        </Link>
        <Link
          to="/admin"
          style={{ color: "blue", textDecoration: "underline" }}
        >
          Admin
        </Link>
        <Link
          to="/create-article"
          style={{ color: "blue", textDecoration: "underline" }}
        >
          Create Article
        </Link>
        <Link
          to="/login"
          style={{ color: "blue", textDecoration: "underline" }}
        >
          Login
        </Link>
      </nav>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <NewsProvider>
            <Toaster />
            <TestHeader />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/my-submissions" element={<MySubmissions />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<ManageUsers />} />
              <Route path="/create-article" element={<CreateArticle />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/article/:id" element={<ArticlePage />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </NewsProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
