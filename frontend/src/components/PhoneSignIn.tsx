import { useEffect } from "react";
import { PhoneAuthProvider } from "firebase/auth";
import * as firebaseui from "firebaseui";
import { authForFirebaseUI } from "../firebaseConfig";
import "firebaseui/dist/firebaseui.css";
import FormWrapper from "./FormWrapper";
import Title from "./Title";

const PhoneSignIn = () => {
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
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(authForFirebaseUI);

    ui.start("#firebaseui-auth-container", uiConfig);
  }, []);

  return (
    <FormWrapper>
      <Title>Phone Sign-In</Title>
      <div id="firebaseui-auth-container"></div>
    </FormWrapper>
  );
};

export default PhoneSignIn;
