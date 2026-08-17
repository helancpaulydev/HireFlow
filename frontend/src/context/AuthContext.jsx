import { createContext, useContext, useEffect, useState } from "react";


// Create authentication context
const AuthContext = createContext(null);


export function AuthProvider({ children }) {

  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("hireflow_access")
  );

  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("hireflow_refresh")
  );

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("hireflowUser")) || null
  );


  // --------------------------------
  // LOGIN
  // --------------------------------

  const login = async (username, password) => {

    const response = await fetch(
      "http://127.0.0.1:8000/api/token/",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          username,
          password,
        }),
      }
    );


    const data = await response.json();


    if (!response.ok) {

      throw new Error(
        data.detail || "Invalid username or password."
      );

    }


    // Save tokens
    localStorage.setItem(
      "hireflow_access",
      data.access
    );

    localStorage.setItem(
      "hireflow_refresh",
      data.refresh
    );


    setAccessToken(data.access);
    setRefreshToken(data.refresh);


    /*
      We don't receive the user object
      directly from Simple JWT.

      We'll get the user information
      separately after authentication.
    */


    return data;
  };


  // --------------------------------
  // LOGOUT
  // --------------------------------

  const logout = () => {

    localStorage.removeItem(
      "hireflow_access"
    );

    localStorage.removeItem(
      "hireflow_refresh"
    );

    localStorage.removeItem(
      "hireflowUser"
    );

    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
  };


  // --------------------------------
  // CHECK LOGIN
  // --------------------------------

  const isAuthenticated = !!accessToken;


  // --------------------------------
  // CONTEXT VALUE
  // --------------------------------

  const value = {
    accessToken,
    refreshToken,
    user,
    setUser,
    login,
    logout,
    isAuthenticated,
  };


  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}


// --------------------------------
// CUSTOM HOOK
// --------------------------------

export function useAuth() {

  return useContext(AuthContext);

}