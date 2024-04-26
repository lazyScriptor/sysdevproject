import { Navigate } from "react-router-dom";




function PrivateRoutes({ isAuthorized, children }) {


  let isAuthenticated = isAuthorized;

  if (!isAuthenticated) {
    // setAuthBool(dat)
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PrivateRoutes;
