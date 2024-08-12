import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";

const AdminLayout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
