import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../../context/authContext.jsx";

export const ProtectedRoute = () => {
  const {isAuthenticated, loading, user} = useAuth();

  console.log(user);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace/>;
  }
  if (user.userType !== "empleado" && user.plan_id == null || user.plan_id === 0) {
    console.log("User has a plan or is not logged in, redirecting to dashboard.");
    return <Navigate to="/dashboard" replace/>;
  }
  return <Outlet/>;
};