import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import AppSimple from "./AppSimple.tsx";
import "./index.css";

// Temporarily use AppSimple to test React Router
createRoot(document.getElementById("root")!).render(<AppSimple />);
