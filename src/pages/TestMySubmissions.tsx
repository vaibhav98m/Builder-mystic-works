import React from "react";

const TestMySubmissions = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test My Submissions Page</h1>
      <p>This is a simple test to verify the MySubmissions route works.</p>
      <div className="mt-4 p-4 border rounded">
        <p>
          If you can see this page at /test-my-submissions, then routing is
          working.
        </p>
        <p>The issue with /my-submissions might be component-specific.</p>
      </div>
    </div>
  );
};

export default TestMySubmissions;
