import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(
    function () {
      if (!isAuthenticated) return navigate("/");
    },
    [isAuthenticated, navigate]
  );
  return children;
}

export default ProtectedRoute;
