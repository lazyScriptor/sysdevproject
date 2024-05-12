import React, { useEffect, useState } from "react";
import { AuthContext } from "./Contexts";
import { Navigate, useNavigate } from "react-router-dom";

function AuthContextProvider({ children }) {
  const [name, setName] = useState("def");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("authenticated status ",isAuthenticated, "token status ",!!localStorage.getItem("token"));
    // // Check if token exists when component mounts
    if (isAuthenticated==false || !localStorage.getItem("token")) {
      navigate("/");
    }
  }, [isAuthenticated]);
  
  // if (isAuthenticated==false || !localStorage.getItem("token")) {
  //   navigate("/");
  // }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
