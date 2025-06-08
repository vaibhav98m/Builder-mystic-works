import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNews } from "@/contexts/NewsContext";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { ArticleCard } from "@/components/ArticleCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Newspaper, Filter, Loader2 } from "lucide-react";
import { categories } from "@/services/mockData";
import { ArticleFilters } from "@/types";

const Index = () => {
  const { isAuthenticated } = useAuth();
  const {
    articles,
    totalArticles,
    currentPage,
    isLoadingArticles,
    loadArticles,
    setFilters,
    currentFilters,
  } = useNews();

  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    // Get initial filters from URL
    const initialFilters: ArticleFilters = {};
    const searchQuery = searchParams.get("search");
    const categoryParam = searchParams.get("category");

    if (searchQuery) {
      initialFilters.search = searchQuery;
    }
    if (categoryParam && categoryParam !== "all") {
      initialFilters.category = categoryParam;
      setSelectedCategory(categoryParam);
    }

    // Load articles with filters
    loadArticles(1, initialFilters);
  }, [searchParams, loadArticles]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    const newParams = new URLSearchParams(searchParams);

    if (category === "all") {
      newParams.delete("category");
    } else {
      newParams.set("category", category);
    }

    setSearchParams(newParams);

    const filters: ArticleFilters = { ...currentFilters };
    if (category === "all") {
      delete filters.category;
    } else {
      filters.category = category;
    }

    setFilters(filters);
  };

  const clearFilters = () => {
    setSelectedCategory("all");
    setSearchParams({});
    setFilters({});
  };

  const loadMoreArticles = () => {
    loadArticles(currentPage + 1, currentFilters);
  };

  const hasActiveFilters = currentFilters.search || currentFilters.category;
  const hasMoreArticles = articles.length < totalArticles;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Newspaper className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">NewsHub</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay informed with the latest news and insights from our community
            of writers.
          </p>
          {!isAuthenticated && (
            <p className="text-sm text-muted-foreground mt-2">
              Sign up to join the conversation and share your own stories.
            </p>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span className="text-sm font-medium">Filter by category:</span>
            </div>

            <Select
              value={selectedCategory}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {hasActiveFilters && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Active filters:
              </span>
              {currentFilters.search && (
                <Badge variant="secondary">
                  Search: "{currentFilters.search}"
                </Badge>
              )}
              {currentFilters.category && (
                <Badge variant="secondary">
                  Category: {currentFilters.category}
                </Badge>
              )}
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear all
              </Button>
            </div>
          )}
        </div>

        {/* Articles Grid */}
        {isLoadingArticles && articles.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="aspect-video bg-gray-200"></div>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : articles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            {/* Load More Button */}
            {hasMoreArticles && (
              <div className="text-center">
                <Button
                  onClick={loadMoreArticles}
                  disabled={isLoadingArticles}
                  className="min-w-32"
                >
                  {isLoadingArticles ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Load More Articles"
                  )}
                </Button>
              </div>
            )}

            {/* Articles Count */}
            <div className="text-center mt-8 text-sm text-muted-foreground">
              Showing {articles.length} of {totalArticles} articles
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <Newspaper className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="text-lg font-semibold mb-2">No articles found</h3>
            <p className="text-muted-foreground mb-4">
              {hasActiveFilters
                ? "Try adjusting your search criteria."
                : "Be the first to publish an article!"}
            </p>
            {hasActiveFilters && (
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
