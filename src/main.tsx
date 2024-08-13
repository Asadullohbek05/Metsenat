import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./i18n.ts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContextProvider from "./context/AuthContext.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./queryClient.ts";

createRoot(document.getElementById("root")!).render(
  <AuthContextProvider>
    <ToastContainer position="top-left" autoClose="1800" />
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </AuthContextProvider>
);
