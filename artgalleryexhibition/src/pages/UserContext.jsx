import React, { createContext, useState, useContext } from "react";

//create context object
export const UserContext = createContext(null);

//provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loginUser = (userData) => {
    setUser(userData);
    console.log("User set in context:", userData);
  };

  //function clear user state
  const logoutUser = () => {
    setUser(null);
    console.log("User logged out");
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

//Hook for easy consumption
export const useUser = () => {
  return useContext(UserContext);
};
