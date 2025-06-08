import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const TestRouter = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>React Router Debug Test</CardTitle>
          <CardDescription>
            Testing if React Router Links work properly
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p>
              <strong>Current Location:</strong> {location.pathname}
            </p>
            <p>
              <strong>React Router Working:</strong>{" "}
              {typeof useNavigate === "function" ? "✅ Yes" : "❌ No"}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Test Links:</h3>

            <div className="flex flex-col gap-2">
              <Link to="/" className="text-blue-600 hover:underline">
                🏠 Home (React Router Link)
              </Link>

              <Link to="/login" className="text-blue-600 hover:underline">
                🔐 Login (React Router Link)
              </Link>

              <Link
                to="/my-submissions"
                className="text-blue-600 hover:underline"
              >
                📝 My Submissions (React Router Link)
              </Link>

              <a href="/" className="text-green-600 hover:underline">
                🌐 Home (Regular Anchor Tag)
              </a>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Test Navigation:</h3>
            <div className="flex gap-2">
              <Button onClick={() => navigate("/")}>Navigate to Home</Button>
              <Button onClick={() => navigate("/my-submissions")}>
                Navigate to My Submissions
              </Button>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded">
            <h4 className="font-semibold mb-2">Debug Info:</h4>
            <pre className="text-sm">
              {JSON.stringify(
                {
                  pathname: location.pathname,
                  search: location.search,
                  hash: location.hash,
                  state: location.state,
                },
                null,
                2,
              )}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestRouter;
