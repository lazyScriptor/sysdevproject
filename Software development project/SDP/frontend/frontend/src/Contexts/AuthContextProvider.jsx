import React, { useEffect, useState } from "react";
import { AuthContext } from "./Contexts";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

function AuthContextProvider({ children }) {
  const [name, setName] = useState("def");
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [userRole, setUserRole] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      console.log("object")
      axios
        .get("http://localhost:8085/isUserAuth", {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        })
        .then((response) => {
          if (!response.data.auth) navigate("/");
        });
    } catch (error) {
      console.log("Error", error);
    }
  });

  // if (isAuthenticated==false || !localStorage.getItem("token")) {
  //   navigate("/");
  // }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, userRole, setUserRole }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
