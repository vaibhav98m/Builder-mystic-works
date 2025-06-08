import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

// Simple Header Component
const SimpleHeader = () => {
  const location = useLocation();

  return (
    <header
      style={{
        padding: "20px",
        background: "#f8f9fa",
        borderBottom: "1px solid #dee2e6",
        marginBottom: "20px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
          <Link
            to="/"
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              textDecoration: "none",
              color: "#333",
            }}
          >
            📰 NewsHub
          </Link>

          <nav style={{ display: "flex", gap: "20px" }}>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: location.pathname === "/" ? "#007bff" : "#666",
                fontWeight: location.pathname === "/" ? "bold" : "normal",
              }}
            >
              🏠 Home
            </Link>
            <Link
              to="/my-submissions"
              style={{
                textDecoration: "none",
                color:
                  location.pathname === "/my-submissions" ? "#007bff" : "#666",
                fontWeight:
                  location.pathname === "/my-submissions" ? "bold" : "normal",
              }}
            >
              📝 My Articles
            </Link>
            <Link
              to="/admin"
              style={{
                textDecoration: "none",
                color: location.pathname === "/admin" ? "#007bff" : "#666",
                fontWeight: location.pathname === "/admin" ? "bold" : "normal",
              }}
            >
              ⚙️ Admin
            </Link>
            <Link
              to="/create-article"
              style={{
                textDecoration: "none",
                color:
                  location.pathname === "/create-article" ? "#007bff" : "#666",
                fontWeight:
                  location.pathname === "/create-article" ? "bold" : "normal",
              }}
            >
              ✍️ Create Article
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

// Simple Pages
const HomePage = () => (
  <div>
    <SimpleHeader />
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
      <h1>📰 Welcome to NewsHub</h1>
      <p>A simple news platform with role-based access.</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <div
          style={{
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <h3>🎯 Recent Articles</h3>
          <p>Browse the latest published articles from our writers.</p>
        </div>
        <div
          style={{
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <h3>✍️ Start Writing</h3>
          <p>Share your thoughts and expertise with our community.</p>
        </div>
        <div
          style={{
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <h3>👥 Join Community</h3>
          <p>Connect with other writers and readers in our platform.</p>
        </div>
      </div>
    </div>
  </div>
);

const MySubmissionsPage = () => (
  <div>
    <SimpleHeader />
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
      <h1>📝 My Articles</h1>
      <p>Manage your articles and track their publication status.</p>

      <div style={{ marginTop: "30px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              padding: "20px",
              border: "1px solid #ffc107",
              borderRadius: "8px",
              background: "#fff3cd",
            }}
          >
            <h3 style={{ margin: "0 0 10px 0", color: "#856404" }}>
              📄 Drafts
            </h3>
            <p
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                margin: 0,
                color: "#856404",
              }}
            >
              3
            </p>
          </div>
          <div
            style={{
              padding: "20px",
              border: "1px solid #fd7e14",
              borderRadius: "8px",
              background: "#fef0e7",
            }}
          >
            <h3 style={{ margin: "0 0 10px 0", color: "#8a4a00" }}>
              ⏳ Pending
            </h3>
            <p
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                margin: 0,
                color: "#8a4a00",
              }}
            >
              2
            </p>
          </div>
          <div
            style={{
              padding:
                "20px', border: '1px solid '#28a745', borderRadius: '8px', background: '#d4edda",
            }}
          >
            <h3 style={{ margin: "0 0 10px 0", color: "#155724" }}>
              ✅ Published
            </h3>
            <p
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                margin: 0,
                color: "#155724",
              }}
            >
              8
            </p>
          </div>
          <div
            style={{
              padding: "20px",
              border: "1px solid #dc3545",
              borderRadius: "8px",
              background: "#f8d7da",
            }}
          >
            <h3 style={{ margin: "0 0 10px 0", color: "#721c24" }}>
              ❌ Rejected
            </h3>
            <p
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                margin: 0,
                color: "#721c24",
              }}
            >
              1
            </p>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "20px",
          }}
        >
          <div
            style={{
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
                marginBottom: "15px",
              }}
            >
              <h3 style={{ margin: 0 }}>The Future of AI Technology</h3>
              <span
                style={{
                  background: "#d4edda",
                  color: "#155724",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontSize: "12px",
                }}
              >
                Published
              </span>
            </div>
            <p style={{ color: "#666", margin: "10px 0" }}>
              Exploring the latest developments in artificial intelligence...
            </p>
            <div style={{ fontSize: "14px", color: "#999" }}>
              📅 Published 2 days ago • 💬 5 comments • 👍 12 likes
            </div>
          </div>

          <div
            style={{
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
                marginBottom: "15px",
              }}
            >
              <h3 style={{ margin: 0 }}>Climate Change Solutions</h3>
              <span
                style={{
                  background: "#fef0e7",
                  color: "#8a4a00",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontSize: "12px",
                }}
              >
                Pending
              </span>
            </div>
            <p style={{ color: "#666", margin: "10px 0" }}>
              Innovative approaches to addressing environmental challenges...
            </p>
            <div style={{ fontSize: "14px", color: "#999" }}>
              📅 Submitted 1 day ago • ⏳ Awaiting review
            </div>
          </div>

          <div
            style={{
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
                marginBottom: "15px",
              }}
            >
              <h3 style={{ margin: 0 }}>Remote Work Best Practices</h3>
              <span
                style={{
                  background: "#fff3cd",
                  color: "#856404",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontSize: "12px",
                }}
              >
                Draft
              </span>
            </div>
            <p style={{ color: "#666", margin: "10px 0" }}>
              Tips and strategies for effective remote work...
            </p>
            <div style={{ fontSize: "14px", color: "#999" }}>
              📅 Last edited yesterday • ✏️ Continue editing
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AdminPage = () => (
  <div>
    <SimpleHeader />
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
      <h1>⚙️ Admin Dashboard</h1>
      <p>Manage the platform, users, and content.</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginTop: "30px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            padding: "20px",
            border: "1px solid #007bff",
            borderRadius: "8px",
            background: "#e3f2fd",
          }}
        >
          <h3 style={{ margin: "0 0 10px 0", color: "#1565c0" }}>
            📊 Total Articles
          </h3>
          <p
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              margin: 0,
              color: "#1565c0",
            }}
          >
            127
          </p>
        </div>
        <div
          style={{
            padding: "20px",
            border: "1px solid #fd7e14",
            borderRadius: "8px",
            background: "#fef0e7",
          }}
        >
          <h3 style={{ margin: "0 0 10px 0", color: "#8a4a00" }}>
            ⏳ Pending Review
          </h3>
          <p
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              margin: 0,
              color: "#8a4a00",
            }}
          >
            8
          </p>
        </div>
        <div
          style={{
            padding: "20px",
            border: "1px solid #28a745",
            borderRadius: "8px",
            background: "#d4edda",
          }}
        >
          <h3 style={{ margin: "0 0 10px 0", color: "#155724" }}>
            👥 Total Users
          </h3>
          <p
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              margin: 0,
              color: "#155724",
            }}
          >
            45
          </p>
        </div>
        <div
          style={{
            padding: "20px",
            border: "1px solid #6f42c1",
            borderRadius: "8px",
            background: "#f0e6ff",
          }}
        >
          <h3 style={{ margin: "0 0 10px 0", color: "#4c2a85" }}>
            📈 This Month
          </h3>
          <p
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              margin: 0,
              color: "#4c2a85",
            }}
          >
            23
          </p>
        </div>
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px" }}
      >
        <div
          style={{
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <h3>📋 Recent Articles Pending Review</h3>
          <div style={{ space: "10px" }}>
            <div
              style={{
                padding: "15px",
                border: "1px solid #ffc107",
                borderRadius: "4px",
                marginBottom: "10px",
                background: "#fff3cd",
              }}
            >
              <h4 style={{ margin: "0 0 5px 0" }}>
                Healthcare Innovation Trends
              </h4>
              <p style={{ margin: "0", fontSize: "14px", color: "#856404" }}>
                By Sarah Editor • Submitted 2 hours ago
              </p>
            </div>
            <div
              style={{
                padding: "15px",
                border: "1px solid #ffc107",
                borderRadius: "4px",
                marginBottom: "10px",
                background: "#fff3cd",
              }}
            >
              <h4 style={{ margin: "0 0 5px 0" }}>
                Education Technology Revolution
              </h4>
              <p style={{ margin: "0", fontSize: "14px", color: "#856404" }}>
                By Jane Writer • Submitted 1 day ago
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <h3>🚀 Quick Actions</h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <button
              style={{
                padding: "10px",
                border: "1px solid #007bff",
                background: "#007bff",
                color: "white",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              👥 Manage Users
            </button>
            <button
              style={{
                padding: "10px",
                border: "1px solid #28a745",
                background: "#28a745",
                color: "white",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              ✅ Review Articles
            </button>
            <button
              style={{
                padding: "10px",
                border: "1px solid #6c757d",
                background: "#6c757d",
                color: "white",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              📊 View Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CreateArticlePage = () => (
  <div>
    <SimpleHeader />
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 20px" }}>
      <h1>✍️ Create New Article</h1>
      <p>Share your knowledge and insights with the community.</p>

      <form style={{ marginTop: "30px" }}>
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Article Title
          </label>
          <input
            type="text"
            placeholder="Enter an engaging title..."
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Category
          </label>
          <select
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px",
            }}
          >
            <option>Technology</option>
            <option>Environment</option>
            <option>Business</option>
            <option>Healthcare</option>
            <option>Education</option>
          </select>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Summary
          </label>
          <textarea
            placeholder="Brief summary of your article..."
            rows={3}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px",
              resize: "vertical",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Content
          </label>
          <textarea
            placeholder="Write your article content here..."
            rows={15}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px",
              resize: "vertical",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="submit"
            style={{
              padding: "12px 24px",
              background: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            📤 Submit for Review
          </button>
          <button
            type="button"
            style={{
              padding: "12px 24px",
              background: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            💾 Save as Draft
          </button>
        </div>
      </form>
    </div>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/my-submissions" element={<MySubmissionsPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/create-article" element={<CreateArticlePage />} />
        <Route
          path="*"
          element={
            <div>
              <SimpleHeader />
              <div style={{ textAlign: "center", padding: "50px" }}>
                404 - Page Not Found
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
