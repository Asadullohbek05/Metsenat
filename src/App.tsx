import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import AdminLayout from "./components/Layout/AdminLayout";
import DashboardPage from "./pages/DashboardPage";
import SponsorsPage from "./pages/SponsorsPage";
import Students from "./pages/Students";
import PageNotFound from "./pages/PageNotFound";
import SingleSponsor from "./pages/SingleSponsor";
import SingleStudent from "./pages/SingleStudent";
import AddStudentPage from "./pages/AddStudentPage";

const App = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="/login" element={<LoginPage />} />

        {isAuthenticated && (
          <>
            <Route path="/" element={<AdminLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/sponsors" element={<SponsorsPage />} />
              <Route path="/students" element={<Students />} />
            </Route>
            <Route path="/sponsors-single/:id" element={<SingleSponsor />} />
            <Route path="/student-single/:id" element={<SingleStudent />} />
            <Route path="add-student" element={<AddStudentPage />} />
          </>
        )}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
