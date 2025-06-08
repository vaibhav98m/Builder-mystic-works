import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const IndexSimple = () => {
  const { user, isAuthenticated } = useAuth();

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
          <h2 className="text-2xl font-bold mb-6">Recent Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sample Article Cards */}
            <div className="border rounded-lg p-4">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 h-40 rounded-lg mb-4"></div>
              <h3 className="font-semibold mb-2">The Future of Technology</h3>
              <p className="text-sm text-gray-600 mb-2">
                Exploring the latest trends in artificial intelligence and
                machine learning...
              </p>
              <div className="text-xs text-gray-500">
                By John Doe • 2 days ago
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 h-40 rounded-lg mb-4"></div>
              <h3 className="font-semibold mb-2">Environmental Solutions</h3>
              <p className="text-sm text-gray-600 mb-2">
                Innovative approaches to addressing climate change challenges...
              </p>
              <div className="text-xs text-gray-500">
                By Jane Smith • 3 days ago
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 h-40 rounded-lg mb-4"></div>
              <h3 className="font-semibold mb-2">Business Innovation</h3>
              <p className="text-sm text-gray-600 mb-2">
                How startups are disrupting traditional industries...
              </p>
              <div className="text-xs text-gray-500">
                By Mike Johnson • 4 days ago
              </div>
            </div>
          </div>
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

export default IndexSimple;
