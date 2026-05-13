import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);

  const login = (userData) => {
    const token = `fake-token-${userData.username}`;
    localStorage.setItem("authToken", token);
    localStorage.setItem("userData", JSON.stringify(userData));

    if (userData.role === "admin") {
      setAdmin(true);
    }

    setUser(userData);
  };
  const updateUser = (updatedData) => {
    const newUser = {
      ...user,
      ...updatedData,
    };
  
    setUser(newUser);
    localStorage.setItem("userData", JSON.stringify(newUser));
  };
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    setUser(null);
    setAdmin(false);
  };

  const verifyLog = () => {
    const userToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("userData");
  
    if (userToken && storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      if (parsedUser.role === "admin") {
        setAdmin(true);
      }
    }
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout, admin, verifyLog, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;