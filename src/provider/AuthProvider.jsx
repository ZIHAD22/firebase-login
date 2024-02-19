import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../firebase/firebase.init";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  const createUser = async (email, pass, name) => {
    console.log(name);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, pass);
      if (result.user) {
        updateProfile(result.user, {
          displayName: name,
        });
        return result.user;
      } else {
        return console.error("Sign Up Fail");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signIn = async (email, pass) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, pass);
      if (result) {
        return result.user;
      } else {
        return console.error("Login Fail");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    try {
      return signOut(auth);
    } catch (error) {
      console.log(error);
    }
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
