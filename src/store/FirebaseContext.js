import { createContext, useState } from "react";

export default createContext(null);

export const AuthContext = createContext(null);

export const Context = ({ children }) => {
  const [user, setUser] = useState(null);
  return <AuthContext.Provider value={{user,setUser}}>{children}</AuthContext.Provider>;
};
