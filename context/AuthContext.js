import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const logout = () => {
    return auth.signOut();
  };

  const login = (credential) => {
    return auth.signInWithCredential(credential);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const state = {
    currentUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={state}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
