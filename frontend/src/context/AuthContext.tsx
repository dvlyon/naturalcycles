import { onAuthStateChanged, User } from "firebase/auth";
import {
  createContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { authForFirebaseUI } from "../firebaseConfig";

interface IAuthContext {
  loading: boolean
  user: User | null;
  signOut: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  loading: true,
  user: null,
  signOut: () => null,
});

interface IAuthProvider {
  children: ReactNode;
}

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authForFirebaseUI, async (user) => {
      setUser(user)
      setLoading(false)
    });

    return () => unsubscribe();
  }, []);

  const signOut = () => {
    authForFirebaseUI.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
