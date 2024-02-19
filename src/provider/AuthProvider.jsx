import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import auth from "../firebase/firebase.init";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  const createUser = async (email, pass) => {
    const result = await createUserWithEmailAndPassword(auth, email, pass);
    if (result) {
      return result.user;
    } else {
      return console.error("Sign Up Fail");
    }
  };

  const signIn = async (email, pass) => {
    const result = await signInWithEmailAndPassword(auth, email, pass);
    if (result) {
      return result.user;
    } else {
      return console.error("Login Fail");
    }
  };

  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unScribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);

      return () => {
        unScribe();
      };
    });
  }, []);

  const authInfo = { user, createUser, signIn, logOut };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
