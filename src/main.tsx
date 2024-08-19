import "./assets/css/index.css";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./i18n.ts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContextProvider from "./context/AuthContext.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./queryClient.ts";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

createRoot(document.getElementById("root")!).render(
  <AuthContextProvider>
    <Provider store={store}>
      <ToastContainer position="top-left" autoClose={1800} />
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </AuthContextProvider>
);
