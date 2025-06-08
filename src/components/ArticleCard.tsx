import React from "react";
import { Link } from "react-router-dom";
import { Article } from "@/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CalendarDays, MessageCircle, Heart, Clock, User } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ArticleCardProps {
  article: Article;
  showStatus?: boolean;
  actions?: React.ReactNode;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  showStatus = false,
  actions,
}) => {
  const getStatusColor = (status: Article["status"]) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-300";
      case "draft":
        return "bg-gray-100 text-gray-800 border-gray-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const formatDate = (date: Date) => {
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const displayDate = article.publishedAt || article.createdAt;

  return (
    <Card className="h-full flex flex-col transition-shadow hover:shadow-lg">
      {/* Image */}
      {article.imageUrl && (
        <div className="aspect-video w-full overflow-hidden rounded-t-lg">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        </div>
      )}

      <CardHeader className="flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            {/* Category and Status */}
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{article.category}</Badge>
              {showStatus && (
                <Badge
                  className={getStatusColor(article.status)}
                  variant="outline"
                >
                  {article.status.charAt(0).toUpperCase() +
                    article.status.slice(1)}
                </Badge>
              )}
            </div>

            {/* Title */}
            <Link to={`/article/${article.id}`}>
              <h3 className="font-semibold text-lg leading-tight line-clamp-2 hover:text-primary transition-colors">
                {article.title}
              </h3>
            </Link>

            {/* Summary */}
            <p className="text-muted-foreground text-sm mt-2 line-clamp-3">
              {article.summary}
            </p>
          </div>

          {actions && <div className="flex flex-col gap-1">{actions}</div>}
        </div>

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {article.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {article.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{article.tags.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardHeader>

      <CardContent className="pt-0">
        {/* Author */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Avatar className="h-6 w-6">
            <AvatarImage
              src={article.author.avatar}
              alt={article.author.name}
            />
            <AvatarFallback className="text-xs">
              {article.author.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span>{article.author.name}</span>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
          {/* Date */}
          <div className="flex items-center gap-1">
            {article.publishedAt ? (
              <CalendarDays className="h-4 w-4" />
            ) : (
              <Clock className="h-4 w-4" />
            )}
            <span>{formatDate(displayDate)}</span>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              <span>{article.likesCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span>{article.commentsCount}</span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
