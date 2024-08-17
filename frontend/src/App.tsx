import { useEffect, useState } from "react";
import { onAuthStateChanged, User, PhoneAuthProvider } from "firebase/auth";
import * as firebaseui from "firebaseui";
import { authForFirebaseUI } from "./firebaseConfig";
import "firebaseui/dist/firebaseui.css";

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const uiConfig = {
      signInOptions: [
        {
          provider: PhoneAuthProvider.PROVIDER_ID,
          recaptchaParameters: {
            type: "image",
            size: "normal",
            badge: "bottomleft",
          },
          defaultCountry: "SE",
        },
      ],
      signInSuccessUrl: "/profile",
      callbacks: {
        signInSuccessWithAuthResult: () => {
          return true;
        },
      },
    };

    const ui =
      firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(authForFirebaseUI);
    ui.start("#firebaseui-auth-container", uiConfig);

    onAuthStateChanged(authForFirebaseUI, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <div>
      <h1>Phone Sign-In</h1>
      <div id="firebaseui-auth-container"></div>
      {user && (
        <div>
          <button type="button">signout</button>
          <div>Phone number: {user.phoneNumber}</div>
        </div>
      )}
    </div>
  );
};

export default App;
