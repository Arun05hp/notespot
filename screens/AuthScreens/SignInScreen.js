import React, { useContext } from "react";
import { View } from "react-native";

import { Context as AuthContext } from "../../context/AuthContext";
import AuthForm from "../../components/AuthForm";

const SignInScreen = ({ navigation }) => {
  const { state, signin, clearMessage } = useContext(AuthContext);
  const { errorMessage, successMessage, isLoading } = state;

  return (
    <View style={{ flex: 1 }}>
      <AuthForm
        isSignUpForm={false}
        errorMessage={errorMessage}
        successMessage={successMessage}
        isLoading={isLoading}
        submitButtonText="Sign In"
        navigation={navigation}
        onSubmit={signin}
      />
    </View>
  );
};

SignInScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

export default SignInScreen;
