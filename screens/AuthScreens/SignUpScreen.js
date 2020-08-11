import React, { useContext } from "react";
import * as Yup from "yup";

import { Context as AuthContext } from "../../context/AuthContext";
import AuthForm from "../../components/AuthForm";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

const SignUpScreen = ({ navigation }) => {
  const { state, signup, clearMessage } = useContext(AuthContext);
  const { errorMessage, successMessage, isLoading } = state;

  return (
    <AuthForm
      errorMessage={errorMessage}
      goTo={() => navigation.replace("Signin")}
      isSignUpForm={true}
      initialValues={{ name: "", email: "", password: "" }}
      isLoading={isLoading}
      onSubmit={signup}
      successMessage={successMessage}
      submitButtonText="Sign Up"
      validationSchema={validationSchema}
    />
  );
};

export default SignUpScreen;
