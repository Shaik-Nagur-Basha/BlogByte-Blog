import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Outlet /> : <Navigate to="sign-in/" />; //"Navigate" is redirect Component but "useNavigate" is "REACT HOOK"
}
