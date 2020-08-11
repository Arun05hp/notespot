import React, { useContext, useState } from "react";
import * as Yup from "yup";

import AuthForm from "../../components/AuthForm";
import { Context as AuthContext } from "../../context/AuthContext";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

const SignInScreen = ({ navigation }) => {
  const { state, signin, clearMessage } = useContext(AuthContext);
  const { errorMessage, successMessage, isLoading } = state;

  const [secureText, setSecureText] = useState(true);

  return (
    <AuthForm
      errorMessage={errorMessage}
      goTo={() => navigation.replace("Signup")}
      initialValues={{ email: "", password: "" }}
      isLoading={isLoading}
      onSubmit={signin}
      successMessage={successMessage}
      submitButtonText="Sign In"
      validationSchema={validationSchema}
    />
  );
};

export default SignInScreen;
