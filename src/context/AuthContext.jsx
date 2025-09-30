import { createContext, useContext, useState } from "react";

import { loginByApi, logoutByApi, verifyTokenRequestByApi } from "../api/auth";

const AuthContext = createContext();
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (user) => {
    setLoading(true);
    try {
      const res = await loginByApi(user);
      setUser(res.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    try {
      await logoutByApi();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const verifyToken = async () => {
    setLoading(true);
    try {
      const res = await verifyTokenRequestByApi();
      setUser(res.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, verifyToken, loading, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
