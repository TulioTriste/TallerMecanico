import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../../context/authContext.jsx";

export const ProtectedRoute = () => {
  const {isAuthenticated, loading, user} = useAuth();

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace/>;
  }
  if (user.userType !== "empleado" && (user.userType === "usuario" && (user.plan_id == null || user.plan_id === 0))) {
    console.log("User does not have a plan or is not an employee");
    return <Navigate to="/dashboard" replace/>;
  }
  return <Outlet/>;
};