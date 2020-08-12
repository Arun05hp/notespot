import React, { useContext, useEffect } from "react";
import * as Yup from "yup";

import AuthForm from "../../components/AuthForm";
import { Context as AuthContext } from "../../context/AuthContext";
import Screen from "../../components/Screen";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

const SignInScreen = ({ navigation }) => {
  const { state, signin, clearMessage } = useContext(AuthContext);
  const { errorMessage, successMessage, isLoading } = state;

  useEffect(() => {
    return () => {
      clearMessage();
    };
  }, []);
  const onSubmit = async (values) => {
    const res = await signin(values);
    if (res) navigation.replace("Main");
  };
  return (
    <Screen>
      <AuthForm
        errorMessage={errorMessage}
        goTo={() => navigation.replace("Signup")}
        initialValues={{ email: "", password: "" }}
        isLoading={isLoading}
        onSubmit={onSubmit}
        successMessage={successMessage}
        submitButtonText="Sign In"
        validationSchema={validationSchema}
      />
    </Screen>
  );
};

export default SignInScreen;
