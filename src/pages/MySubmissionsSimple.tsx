import React from "react";
import { useAuth } from "@/contexts/AuthContext";

const MySubmissionsSimple = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Articles</h1>
          <p className="text-gray-600 mt-2">
            Welcome {user?.name || "User"}! Manage your articles here.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Drafts</h3>
            <p className="text-3xl font-bold text-yellow-600">3</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Pending
            </h3>
            <p className="text-3xl font-bold text-orange-600">2</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Published
            </h3>
            <p className="text-3xl font-bold text-green-600">8</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Rejected
            </h3>
            <p className="text-3xl font-bold text-red-600">1</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Articles</h2>
          <div className="space-y-4">
            <div className="border rounded p-4">
              <h3 className="font-semibold">Sample Article 1</h3>
              <p className="text-sm text-gray-600">
                This is a sample article for testing.
              </p>
              <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                Published
              </span>
            </div>
            <div className="border rounded p-4">
              <h3 className="font-semibold">Sample Article 2</h3>
              <p className="text-sm text-gray-600">
                Another sample article for testing.
              </p>
              <span className="inline-block mt-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                Pending
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MySubmissionsSimple;
