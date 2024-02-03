import axios from "axios";
import { URL } from "../Url.js";
import { createContext } from "react";
import { useState, useEffect } from "react";
export const UserContext = createContext({});
export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    console.log(user);
    getUser();
  }, []);

  const getUser = async () => {
    try {
      console.log(user, "getuser");
      const res = await axios.get(
        URL + "/api/auth/refetch",

        {
          withCredentials: true,
        },
      );
      console.log(user, "getuser");
      setUser(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
