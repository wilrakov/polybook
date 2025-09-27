import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  // minuscule ici
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || { email: "" };
  });

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children} {/* minuscule ici aussi */}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
