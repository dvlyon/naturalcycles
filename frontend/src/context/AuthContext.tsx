import { onAuthStateChanged, User } from "firebase/auth";
import {
  createContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { authForFirebaseUI } from "../firebaseConfig";

interface IAuthContext {
  user: User | null;
  signOut: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
  signOut: () => null,
});

interface IAuthProvider {
  children: ReactNode;
}

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authForFirebaseUI, async (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const signOut = () => {
    authForFirebaseUI.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
