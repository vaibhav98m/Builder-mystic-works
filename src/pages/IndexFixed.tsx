import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Article } from "@/types";
import { newsService } from "@/services/newsService";
import { Badge } from "@/components/ui/badge";
import { Calendar, MessageCircle, User, Eye } from "lucide-react";

const IndexFixed = () => {
  const { user, isAuthenticated } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Load approved articles for the homepage
        const result = await newsService.getArticles(1, 6, {
          status: "approved",
        });
        const articlesData = result?.data || [];
        setArticles(articlesData);
      } catch (err) {
        console.error("Error loading articles:", err);
        setError("Failed to load articles");
        setArticles([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadArticles();
  }, []);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Technology: "bg-gradient-to-br from-blue-500 to-purple-600",
      Environment: "bg-gradient-to-br from-green-500 to-emerald-600",
      Business: "bg-gradient-to-br from-orange-500 to-red-600",
      Healthcare: "bg-gradient-to-br from-pink-500 to-rose-600",
      Education: "bg-gradient-to-br from-indigo-500 to-blue-600",
      Sports: "bg-gradient-to-br from-yellow-500 to-orange-600",
      Entertainment: "bg-gradient-to-br from-purple-500 to-pink-600",
      Science: "bg-gradient-to-br from-cyan-500 to-blue-600",
    };
    return colors[category] || "bg-gradient-to-br from-gray-500 to-slate-600";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-blue-600">
                📰 NewsHub
              </Link>
            </div>

            <nav className="hidden md:flex space-x-6">
              <Link to="/" className="text-gray-700 hover:text-blue-600">
                Home
              </Link>
              {isAuthenticated && user?.role === "admin" && (
                <Link to="/admin" className="text-gray-700 hover:text-blue-600">
                  Admin
                </Link>
              )}
              {isAuthenticated &&
                (user?.role === "employee" || user?.role === "admin") && (
                  <>
                    <Link
                      to="/create-article"
                      className="text-gray-700 hover:text-blue-600"
                    >
                      Create Article
                    </Link>
                    <Link
                      to="/my-submissions"
                      className="text-gray-700 hover:text-blue-600"
                    >
                      My Articles
                    </Link>
                  </>
                )}
            </nav>

            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">Welcome, {user?.name}!</span>
                  <Link to="/profile">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                      Profile
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="space-x-2">
                  <Link to="/login">
                    <button className="text-blue-600 px-4 py-2 rounded hover:bg-blue-50">
                      Login
                    </button>
                  </Link>
                  <Link to="/register">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                      Sign Up
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to NewsHub
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your trusted source for quality news and insights
          </p>
          {!isAuthenticated && (
            <div className="space-x-4">
              <Link to="/register">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                  Get Started
                </button>
              </Link>
              <Link to="/login">
                <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50">
                  Login
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                📰
              </div>
              <h3 className="text-lg font-semibold mb-2">Latest News</h3>
              <p className="text-gray-600">
                Stay updated with the latest news and articles from our
                community
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                ✍️
              </div>
              <h3 className="text-lg font-semibold mb-2">Write Articles</h3>
              <p className="text-gray-600">
                Share your knowledge and insights with our growing community
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                👥
              </div>
              <h3 className="text-lg font-semibold mb-2">Join Community</h3>
              <p className="text-gray-600">
                Connect with writers and readers in our vibrant platform
              </p>
            </div>
          </div>
        </div>

        {/* Recent Articles Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Latest Articles</h2>
            {articles.length > 6 && (
              <Link
                to="/articles"
                className="text-blue-600 hover:text-blue-800"
              >
                View All Articles →
              </Link>
            )}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="border rounded-lg p-4 animate-pulse">
                  <div className="bg-gray-300 h-40 rounded-lg mb-4"></div>
                  <div className="bg-gray-300 h-4 rounded mb-2"></div>
                  <div className="bg-gray-300 h-3 rounded mb-2"></div>
                  <div className="bg-gray-300 h-3 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Try Again
              </button>
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">No articles available yet.</p>
              {isAuthenticated &&
                (user?.role === "employee" || user?.role === "admin") && (
                  <Link to="/create-article">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                      Write the First Article
                    </button>
                  </Link>
                )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  to={`/article/${article.id}`}
                  className="border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div
                    className={`${getCategoryColor(article.category)} h-40 rounded-lg mb-4 flex items-center justify-center`}
                  >
                    <div className="text-white text-center">
                      <div className="text-2xl mb-2">📰</div>
                      <div className="text-sm font-semibold">
                        {article.category}
                      </div>
                    </div>
                  </div>

                  <h3 className="font-semibold mb-2 line-clamp-2 hover:text-blue-600">
                    {article.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {article.summary}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <User className="h-3 w-3" />
                      <span>{article.author.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {new Date(
                          article.publishedAt || article.createdAt,
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <Badge variant="secondary" className="text-xs">
                      {article.category}
                    </Badge>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>{article.views || 0}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-3 w-3" />
                        <span>{article.commentsCount || 0}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Call to Action */}
        {!isAuthenticated && (
          <div className="bg-blue-600 text-white rounded-lg p-8 mt-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Join NewsHub?</h2>
            <p className="mb-6">
              Start reading, writing, and connecting with our community today
            </p>
            <div className="space-x-4">
              <Link to="/register">
                <button className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100">
                  Sign Up Now
                </button>
              </Link>
              <Link to="/login">
                <button className="border border-white text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                  Login
                </button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default IndexFixed;
