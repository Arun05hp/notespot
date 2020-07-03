import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import IndexScreen from "./screens/AuthScreens/IndexScreen";
import SignUpScreen from "./screens/AuthScreens/SignUpScreen";
import SignInScreen from "./screens/AuthScreens/SignInScreen";
import userDashboard from "./screens/MainScreens/userDashboard";
import pdfDashboard from "./screens/pdfScreen/pdfDashboard";
import bookList from "./screens/bookScreen/bookList";

import { AntDesign } from "@expo/vector-icons";

import Colors from "./constants/colors";
import { createDrawerNavigator } from "react-navigation-drawer";

const AuthFlow = createStackNavigator({
  Startscreen: IndexScreen,
  Signup: SignUpScreen,
  Signin: SignInScreen,
});

const pdfFlow = createStackNavigator({
  upload: pdfDashboard,
});
pdfFlow.navigationOptions = {
  title: "PDF",
  tabBarIcon: ({ tintColor }) => (
    <AntDesign name="pdffile1" size={24} color={tintColor} />
  ),
};

const bookFlow = createStackNavigator({
  upload: bookList,
});
bookFlow.navigationOptions = {
  title: "Book",
  tabBarIcon: ({ tintColor }) => (
    <AntDesign name="book" size={24} color={tintColor} />
  ),
};

userDashboard.navigationOptions = {
  title: "Home",
  tabBarIcon: ({ tintColor }) => (
    <AntDesign name="home" size={24} color={tintColor} />
  ),
};
const BottomTab = createBottomTabNavigator(
  {
    userDashboard: userDashboard,
    pdfFlow,
    bookFlow,
  },
  {
    tabBarOptions: {
      showLabel: false,
      activeTintColor: Colors.primary,
    },
  }
);
const MainFlow = createDrawerNavigator({ BottomTab });

const switchNavigator = createSwitchNavigator({
  AuthFlow,
  MainFlow,
});

const App = createAppContainer(switchNavigator);

export default () => <App />;
