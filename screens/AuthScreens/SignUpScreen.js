import React, { useContext, useEffect } from "react";
import { View } from "react-native";

import { Context as AuthContext } from "../../context/AuthContext";
import AuthForm from "../../components/AuthForm";

const SignUpScreen = ({ navigation }) => {
  const { state, signup, clearMessage } = useContext(AuthContext);
  const { errorMessage, successMessage, isLoading } = state;

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      clearMessage();
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <AuthForm
        isSignUpForm={true}
        errorMessage={errorMessage}
        successMessage={successMessage}
        isLoading={isLoading}
        submitButtonText="Sign Up"
        navigation={navigation}
        onSubmit={signup}
      />
    </View>
  );
};

SignUpScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

export default SignUpScreen;
