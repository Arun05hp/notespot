import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import IndexScreen from "./screens/AuthScreens/IndexScreen";
import SignUpScreen from "./screens/AuthScreens/SignUpScreen";
import SignInScreen from "./screens/AuthScreens/SignInScreen";

const stackNavigator = createStackNavigator({
  Startscreen: IndexScreen,
  Signup: SignUpScreen,
  Signin: SignInScreen,
});

const App = createAppContainer(stackNavigator);

export default () => <App />;
