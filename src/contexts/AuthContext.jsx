import { createContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { auth } from "../config/firebaseConfig";
import {
  createUser,
  getUserByEmail,
  updateUser as updateUserService,
} from "../services/userService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const firestoreUser = await getUserByEmail(firebaseUser.email);

          const finalUser = firestoreUser || {
            uid: firebaseUser.uid,
            name: firebaseUser.displayName || "",
            username: firebaseUser.displayName || "",
            email: firebaseUser.email,
            profilePic: firebaseUser.photoURL || "",
            role: "user",
          };

          setUser(finalUser);
          setAdmin(finalUser.role === "admin");
          localStorage.setItem("userData", JSON.stringify(finalUser));
        } else {
          setUser(null);
          setAdmin(false);
          localStorage.removeItem("userData");
        }
      } finally {
        setLoadingAuth(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async ({ email, password }) => {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const firestoreUser = await getUserByEmail(credential.user.email);

    if (!firestoreUser) {
      throw new Error("User profile not found in Firestore");
    }

    setUser(firestoreUser);
    setAdmin(firestoreUser.role === "admin");
    localStorage.setItem("userData", JSON.stringify(firestoreUser));

    return firestoreUser;
  };

  const register = async ({ email, password, name, username, profilePic }) => {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      throw new Error("This email is already registered");
    }

    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(credential.user, {
      displayName: name,
      photoURL: profilePic || "",
    });

    const newUser = await createUser({
      uid: credential.user.uid,
      name,
      username,
      email,
      profilePic: profilePic || "",
      role: "user",
    });

    setUser(newUser);
    setAdmin(false);
    localStorage.setItem("userData", JSON.stringify(newUser));

    return newUser;
  };

  const updateUser = async (updatedData) => {
    if (!user?.id) return null;

    const dataToUpdate = {
      ...user,
      ...updatedData,
    };

    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: dataToUpdate.name || "",
        photoURL: dataToUpdate.profilePic || "",
      });
    }

    const updatedUser = await updateUserService(user.id, dataToUpdate);

    setUser(updatedUser);
    setAdmin(updatedUser.role === "admin");
    localStorage.setItem("userData", JSON.stringify(updatedUser));

    return updatedUser;
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setAdmin(false);
    localStorage.removeItem("userData");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        admin,
        loadingAuth,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;