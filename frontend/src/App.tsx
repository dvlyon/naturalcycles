import PhoneSignIn from "./components/PhoneSignIn";
import Spinner from "./components/Spinner";
import UserPanel from "./components/UserPanel"; // Corrected the typo in the import
import { AuthProvider } from "./context/AuthContext";
import useAuth from "./hooks/useAuth";

const App = () => {
  console.log("App rendered");

  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Spinner />
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#F7F7F7",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      {user ? <UserPanel /> : <PhoneSignIn />}
    </div>
  );
};

export default App;
