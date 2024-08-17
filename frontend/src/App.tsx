import PhoneSignIn from "./components/PhoneSignIn";
import UserPanel from "./components/UserPanel"; // Corrected the typo in the import
import { AuthProvider } from "./context/AuthContext";
import useAuth from "./hooks/useAuth";

const App = () => {
  return (
    <AuthProvider>
      <AuthWrapper />
    </AuthProvider>
  );
};

const AuthWrapper = () => {
  const { user } = useAuth();

  return user ? <UserPanel /> : <PhoneSignIn />;
};

export default App;
