import { useContext, createContext, useEffect, useState, ReactNode } from "react";
import { AuthErrorCodes, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
const { auth, db } = require("../firebase.js");
import { collection, doc, setDoc } from "firebase/firestore";

interface User {
  uid: string;
}


interface UserContextType {
  SignUp: (email: string, password: string, FullName: string) => Promise<void>;
  error: string;
  currentuser: User | null | undefined;
  Login: (email: string, password: string) => Promise<void>;
}

const userContext = createContext<UserContextType | null>(null);

export const useAuth = (): UserContextType => useContext(userContext)!;

const UserAuthContext = ({ children }: { children: ReactNode }) => {
  const [currentuser, setuser] = useState<User | null | undefined>();
  const [error, setError] = useState<string>("");


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setuser(user);
        console.log("You are logged in");
        if (window.location.pathname === "/login" || window.location.pathname === "/register") {
          window.location.href = "/";
        }
      } else {
        if (
          window.location.pathname !== "/login" &&
          window.location.pathname !== "/register" &&
          !window.location.pathname.startsWith("/support") &&
          !window.location.pathname.startsWith("/policies") &&
          window.location.pathname !== "/landing"
        ) {
          window.location.href = "/landing";
        }
      }
    });

    return () => unsubscribe();
  }, []);


  const Login = async (email: string, password: string) => {
    const logEmail = email;
    const logPass = password;
    try {
      await signInWithEmailAndPassword(auth, logEmail, logPass);
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      alert("Wrong Email or Password");
    }
  };

  const SignUp = async (email: string, password: string, FullName: string) => {
    const userName = FullName;
    const regEmail = email;
    const userPassword = password;
    try {
      const result = await createUserWithEmailAndPassword(auth, regEmail, userPassword);
      const signeduser = result.user;
      const userId = signeduser.uid;
      const colRef = collection(db, "users");
      const tagRef = collection(db, "users", userId, "Tags");

      try {
        await setDoc(doc(colRef, userId), {
          id: userId,
          fullname: userName,
          email: regEmail,
          subscription: false,
          storage_take: 0,
          profilePictureURL: "",
          recent: "",
          user_since: new Date().toLocaleDateString(),
        });

        await setDoc(doc(tagRef, userId), {
          tags: ["None"],
        });

        console.log("Document successfully added!");
      } catch (error) {
        console.error("Error adding document: ", error);
      }

      alert("Welcome! New user created successfully");
      await sendEmailVerification(signeduser);
      window.location.href = "/";
    } catch (err:any) {
      if (err.code === "auth/email-already-in-use") {
        alert("Email already in use, please try another email");
      } else if (err.code === AuthErrorCodes.WEAK_PASSWORD) {
        alert("Password must be at least 6 characters");
      } else {
        setError(err.message);
      }
    }
  };

  const value: UserContextType = {
    SignUp,
    error,
    currentuser,
    Login,
  };

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};

export default UserAuthContext;
