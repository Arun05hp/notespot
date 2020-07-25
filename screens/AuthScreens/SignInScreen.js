import React, { useContext } from "react";
import { View } from "react-native";

import { NavigationEvents } from "react-navigation";
import { Context as AuthContext } from "../../context/AuthContext";
import AuthForm from "../../components/AuthForm";

const SignInScreen = ({ navigation }) => {
  const { state, signin, clearMessage } = useContext(AuthContext);
  const { errorMessage, successMessage } = state;

  return (
    <View style={{ flex: 1 }}>
      <NavigationEvents onWillFocus={clearMessage} />
      <AuthForm
        isSignUpForm={false}
        errorMessage={errorMessage}
        successMessage={successMessage}
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
