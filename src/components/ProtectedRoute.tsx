import { Navigate } from "react-router-dom";
import { useUser } from "@/hooks/useUserContext";

export default function ProtectedRoute({ children }: any) {
  const { user, loading } = useUser();
  const token = localStorage.getItem("token");

  if (!token) {
    const path = window.location.pathname;
    // Only save the redirect if it's a useful landing page
    const saveableRoutes = ["/profile", "/badges", "/settings", "/streaks", "/lessons/in-progress"];
    if (saveableRoutes.includes(path)) {
      localStorage.setItem("redirectAfterLogin", path);
    } else {
      localStorage.removeItem("redirectAfterLogin");
    }
    return <Navigate to="/auth" />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return children;
}