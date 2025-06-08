import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useNews } from "@/contexts/NewsContext";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Loader2, Plus, X } from "lucide-react";
import { categories, commonTags } from "@/services/mockData";
import { CreateArticleRequest } from "@/types";

const CreateArticle = () => {
  const { createArticle } = useNews();
  const { hasRole } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CreateArticleRequest>({
    title: "",
    content: "",
    summary: "",
    category: "",
    tags: [],
  });

  const [newTag, setNewTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.title.trim()) {
      setError("Title is required");
      return;
    }

    if (!formData.content.trim()) {
      setError("Content is required");
      return;
    }

    if (!formData.summary.trim()) {
      setError("Summary is required");
      return;
    }

    if (!formData.category) {
      setError("Category is required");
      return;
    }

    if (formData.content.length < 100) {
      setError("Content must be at least 100 characters long");
      return;
    }

    try {
      setIsSubmitting(true);
      const article = await createArticle(formData);

      if (hasRole("admin")) {
        navigate(`/article/${article.id}`);
      } else {
        navigate("/my-submissions");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create article");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    field: keyof CreateArticleRequest,
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    const tag = newTag.trim();
    if (tag && !formData.tags.includes(tag) && formData.tags.length < 10) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const addCommonTag = (tag: string) => {
    if (!formData.tags.includes(tag) && formData.tags.length < 10) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Create New Article</CardTitle>
              <CardDescription>
                {hasRole("admin")
                  ? "Your article will be published immediately."
                  : "Your article will be submitted for review before publication."}
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter an engaging title for your article"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    disabled={isSubmitting}
                  />
                  <p className="text-xs text-muted-foreground">
                    {formData.title.length}/100 characters
                  </p>
                </div>

                {/* Summary */}
                <div className="space-y-2">
                  <Label htmlFor="summary">Summary *</Label>
                  <Textarea
                    id="summary"
                    placeholder="Write a brief summary that captures the essence of your article"
                    value={formData.summary}
                    onChange={(e) =>
                      handleInputChange("summary", e.target.value)
                    }
                    disabled={isSubmitting}
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">
                    {formData.summary.length}/300 characters
                  </p>
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label>Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      handleInputChange("category", value)
                    }
                    disabled={isSubmitting}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Tags */}
                <div className="space-y-3">
                  <Label>Tags</Label>

                  {/* Current Tags */}
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="pr-1">
                          {tag}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                            onClick={() => removeTag(tag)}
                            disabled={isSubmitting}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Add Tag Input */}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a tag"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={handleKeyPress}
                      disabled={isSubmitting || formData.tags.length >= 10}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addTag}
                      disabled={
                        !newTag.trim() ||
                        isSubmitting ||
                        formData.tags.length >= 10
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Common Tags */}
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Popular tags:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {commonTags.slice(0, 8).map((tag) => (
                        <Button
                          key={tag}
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-6 text-xs"
                          onClick={() => addCommonTag(tag)}
                          disabled={
                            formData.tags.includes(tag) ||
                            formData.tags.length >= 10 ||
                            isSubmitting
                          }
                        >
                          {tag}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Add up to 10 tags to help readers find your article.{" "}
                    {formData.tags.length}/10
                  </p>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <Label htmlFor="content">Content *</Label>
                  <Textarea
                    id="content"
                    placeholder="Write your article content here. Share your insights, experiences, and knowledge with the community..."
                    value={formData.content}
                    onChange={(e) =>
                      handleInputChange("content", e.target.value)
                    }
                    disabled={isSubmitting}
                    rows={15}
                    className="resize-y"
                  />
                  <p className="text-xs text-muted-foreground">
                    {formData.content.length} characters (minimum 100 required)
                  </p>
                </div>

                {/* Submit Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {hasRole("admin") ? "Publishing..." : "Submitting..."}
                      </>
                    ) : hasRole("admin") ? (
                      "Publish Article"
                    ) : (
                      "Submit for Review"
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/")}
                    disabled={isSubmitting}
                    className="flex-1 sm:flex-none"
                  >
                    Cancel
                  </Button>
                </div>

                {/* Help Text */}
                <div className="bg-muted/50 p-4 rounded-lg text-sm text-muted-foreground">
                  <h4 className="font-medium mb-2">Writing Tips:</h4>
                  <ul className="space-y-1 text-xs">
                    <li>
                      • Write a compelling title that clearly describes your
                      article
                    </li>
                    <li>• Keep your summary concise and engaging</li>
                    <li>• Structure your content with clear paragraphs</li>
                    <li>
                      • Use relevant tags to help readers discover your content
                    </li>
                    <li>
                      • Choose an appropriate category to help with organization
                    </li>
                  </ul>
                </div>
              </CardContent>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CreateArticle;
