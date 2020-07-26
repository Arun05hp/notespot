import React, { useContext } from "react";
import { View } from "react-native";

import { NavigationEvents } from "react-navigation";
import { Context as AuthContext } from "../../context/AuthContext";
import AuthForm from "../../components/AuthForm";

const SignUpScreen = ({ navigation }) => {
  const { state, signup, clearMessage } = useContext(AuthContext);
  const { errorMessage, successMessage, isLoading } = state;

  return (
    <View style={{ flex: 1 }}>
      <NavigationEvents onWillFocus={clearMessage} />
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
