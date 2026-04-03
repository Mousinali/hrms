
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const auth = useAuth(); // safer

  if (!auth || !auth.user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}