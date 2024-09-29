/* eslint-disable react/no-unescaped-entities */
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div className="mx-auto max-w-screen-sm text-center">
        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
          404
        </h1>
        <h2 className="font-bold text-lg">We can’t find that page</h2>
        <p>
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <button className="btn mt-2" onClick={() => navigate("/")}>
          Back to home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
