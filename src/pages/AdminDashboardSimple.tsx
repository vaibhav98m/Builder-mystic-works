import React from "react";
import { useAuth } from "@/contexts/AuthContext";

const AdminDashboardSimple = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome {user?.name || "Admin"}! Manage the platform from here.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Total Articles
            </h3>
            <p className="text-3xl font-bold text-blue-600">127</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Pending Review
            </h3>
            <p className="text-3xl font-bold text-orange-600">8</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Total Users
            </h3>
            <p className="text-3xl font-bold text-green-600">45</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              This Month
            </h3>
            <p className="text-3xl font-bold text-purple-600">23</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              Recent Articles Pending Review
            </h2>
            <div className="space-y-4">
              <div className="border rounded p-4">
                <h3 className="font-semibold">Healthcare Innovation Trends</h3>
                <p className="text-sm text-gray-600">
                  By Sarah Editor • Submitted 2 hours ago
                </p>
                <div className="mt-2 flex gap-2">
                  <button className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm">
                    Approve
                  </button>
                  <button className="px-3 py-1 bg-red-100 text-red-800 rounded text-sm">
                    Reject
                  </button>
                </div>
              </div>
              <div className="border rounded p-4">
                <h3 className="font-semibold">
                  Education Technology Revolution
                </h3>
                <p className="text-sm text-gray-600">
                  By Jane Writer • Submitted 1 day ago
                </p>
                <div className="mt-2 flex gap-2">
                  <button className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm">
                    Approve
                  </button>
                  <button className="px-3 py-1 bg-red-100 text-red-800 rounded text-sm">
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600">
                👥 Manage Users
              </button>
              <button className="w-full p-3 bg-green-500 text-white rounded hover:bg-green-600">
                ✅ Review Articles
              </button>
              <button className="w-full p-3 bg-gray-500 text-white rounded hover:bg-gray-600">
                📊 View Analytics
              </button>
              <button className="w-full p-3 bg-purple-500 text-white rounded hover:bg-purple-600">
                ⚙️ System Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardSimple;
