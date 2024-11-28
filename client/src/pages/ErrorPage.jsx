import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

export default function ErrorPage({
  errorMessage = "Sorry, The page you are looking for does not exist.",
}) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center m-10 dark:bg-transparent">
      <div className="flex items-center justify-center flex-col p-6 bg-white rounded-lg shadow-sm shadow-black text-center dark:bg-transparent dark:shadow-white">
        <h1 className="text-7xl font-extrabold text-red-500">404</h1>
        <h2 className="mt-4 text-2xl font-bold text-gray-800 dark:text-gray-100">
          Page Not Found
        </h2>
        <div className="mt-2 text-gray-600 dark:text-gray-400">
          {errorMessage}
        </div>
        <Button
          className="mt-6 text-2xl font-bold text-cyan-500 border border-cyan-400 hover:bg-cyan-100 dark:bg-opacity-20"
          onClick={() => navigate("/")}
          color=""
          pill
          size="lg"
        >
          Go to Home
        </Button>
      </div>
    </div>
  );
}