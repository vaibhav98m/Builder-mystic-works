import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

const SimpleHeader = () => {
  const location = useLocation();

  return (
    <div
      style={{ padding: "20px", background: "#f0f0f0", marginBottom: "20px" }}
    >
      <h2>Simple Router Test - Current: {location.pathname}</h2>
      <nav style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
        <Link to="/" style={{ color: "blue", textDecoration: "underline" }}>
          Home
        </Link>
        <Link
          to="/my-submissions"
          style={{ color: "blue", textDecoration: "underline" }}
        >
          My Submissions
        </Link>
        <Link
          to="/admin"
          style={{ color: "blue", textDecoration: "underline" }}
        >
          Admin
        </Link>
        <Link to="/test" style={{ color: "blue", textDecoration: "underline" }}>
          Test Page
        </Link>
      </nav>
    </div>
  );
};

const HomePage = () => (
  <div>
    <SimpleHeader />
    <h1>Home Page</h1>
    <p>
      This is the home page. React Router is working if the header shows the
      current path correctly.
    </p>
  </div>
);

const MySubmissionsPage = () => (
  <div>
    <SimpleHeader />
    <h1>My Submissions Page</h1>
    <p>Success! The My Submissions page is working.</p>
  </div>
);

const AdminPage = () => (
  <div>
    <SimpleHeader />
    <h1>Admin Page</h1>
    <p>Success! The Admin page is working.</p>
  </div>
);

const TestPage = () => (
  <div>
    <SimpleHeader />
    <h1>Test Page</h1>
    <p>This is a test page to verify routing works.</p>
  </div>
);

const AppSimple = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/my-submissions" element={<MySubmissionsPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/test" element={<TestPage />} />
      <Route
        path="*"
        element={
          <div>
            <SimpleHeader />
            <h1>404 - Page Not Found</h1>
          </div>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default AppSimple;
