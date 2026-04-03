
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function PublicRoute({ children }) {
  const auth = useAuth();

  if (auth && auth.user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}