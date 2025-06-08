import React from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <FileQuestion className="h-16 w-16 text-muted-foreground" />
              </div>
              <CardTitle className="text-2xl">Page Not Found</CardTitle>
              <CardDescription>
                The page you're looking for doesn't exist
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center text-sm text-muted-foreground">
                <p>Sorry, we couldn't find the page you were looking for.</p>
                <p className="mt-2">
                  It might have been moved, deleted, or you entered the wrong
                  URL.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <Button asChild className="w-full">
                  <Link to="/">
                    <Home className="mr-2 h-4 w-4" />
                    Go to Homepage
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  onClick={handleGoBack}
                  className="w-full"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Go Back
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
