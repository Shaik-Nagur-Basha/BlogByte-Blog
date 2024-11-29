import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";

export default function NewUserRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <ErrorPage /> : <Outlet />;
}
