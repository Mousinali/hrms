import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import Layout from "./Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "../context/AuthContext";
import PublicRoute from "./Routes/PublicRoute";
import ProtectedRoute from "./Routes/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

export default function AppRouter() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
