import React from "react";
import { Link, useLocation } from "react-router-dom";

export const HeaderDebug: React.FC = () => {
  const location = useLocation();

  console.log("HeaderDebug rendered, location:", location.pathname);
  console.log("Link component:", Link);
  console.log("React Router working:", typeof useLocation === "function");

  return (
    <div style={{ background: "yellow", padding: "10px", margin: "10px" }}>
      <h3>Header Debug - Current path: {location.pathname}</h3>
      <div style={{ display: "flex", gap: "10px" }}>
        <Link to="/" style={{ color: "blue", textDecoration: "underline" }}>
          Home (React Router Link)
        </Link>
        <Link
          to="/my-submissions"
          style={{ color: "blue", textDecoration: "underline" }}
        >
          My Submissions (React Router Link)
        </Link>
        <Link
          to="/admin"
          style={{ color: "blue", textDecoration: "underline" }}
        >
          Admin (React Router Link)
        </Link>
        <a
          href="/my-submissions"
          style={{ color: "red", textDecoration: "underline" }}
        >
          My Submissions (Regular Anchor)
        </a>
      </div>
    </div>
  );
};
