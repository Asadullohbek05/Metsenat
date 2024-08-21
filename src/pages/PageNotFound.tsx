import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PageNotFound = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <div>Loading...</div>;
  }

  const { isAuthenticated } = authContext;
  return (
    <section className="h-screen border flex items-center justify-center">
      <div className="py-8 px-4 mx-auto max-w-screen lg:py-16 lg:px-6">
        <div className="text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-bluePrimary">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold  md:text-4xl">
            Something's missing.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 ">
            Sorry, we can't find that page. You'll find lots to explore on the
            home page.
          </p>
          <Link
            to={isAuthenticated ? "/dashboard" : "/login"}
            className="inline-flex text-white bg-bluePrimary hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
          >
            Back to {isAuthenticated ? "Dashboard" : "Login"}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PageNotFound;
