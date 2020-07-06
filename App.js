import React, { useState } from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import IndexScreen from "./screens/AuthScreens/IndexScreen";
import SignUpScreen from "./screens/AuthScreens/SignUpScreen";
import SignInScreen from "./screens/AuthScreens/SignInScreen";
import userDashboard from "./screens/MainScreens/userDashboard";
import UserProfile from "./screens/ProfileScreens/UserProfile";
import pdfDashboard from "./screens/pdfScreen/pdfDashboard";
import uploadpdf from "./screens/pdfScreen/uploadpdf";
import bookList from "./screens/bookScreen/bookList";

import { AntDesign } from "@expo/vector-icons";

import Colors from "./constants/colors";

const Dashboard = createStackNavigator({
  Dashboard: userDashboard,
  UploadPdf: uploadpdf,
});
Dashboard.navigationOptions = {
  title: "Home",
  tabBarIcon: ({ tintColor }) => (
    <AntDesign name="home" size={26} color={tintColor} />
  ),
};

const pdfFlow = createStackNavigator({
  upload: pdfDashboard,
});
pdfFlow.navigationOptions = {
  title: "PDF",
  tabBarIcon: ({ tintColor }) => (
    <AntDesign name="pdffile1" size={26} color={tintColor} />
  ),
};

const bookFlow = createStackNavigator({
  upload: bookList,
});
bookFlow.navigationOptions = {
  title: "Book",
  tabBarIcon: ({ tintColor }) => (
    <AntDesign name="book" size={26} color={tintColor} />
  ),
};

const Profile = createStackNavigator({
  profie: UserProfile,
});
Profile.navigationOptions = {
  title: "Profile",
  tabBarIcon: ({ tintColor }) => (
    <AntDesign name="user" size={26} color={tintColor} />
  ),
};

const AuthFlow = createStackNavigator({
  Startscreen: IndexScreen,
  Signup: SignUpScreen,
  Signin: SignInScreen,
});

const MainFlow = createBottomTabNavigator(
  {
    Dashboard,
    pdfFlow,
    bookFlow,
    Profile,
  },
  {
    tabBarOptions: {
      showLabel: false,
      activeTintColor: Colors.primary,
    },
  }
);

const switchNavigator = createSwitchNavigator({
  AuthFlow,
  MainFlow,
});

const App = createAppContainer(switchNavigator);

const fetchFonts = async () => {
  await Font.loadAsync({
    "Roboto-regular": require("./assets/fonts/roboto.regular.ttf"),
    "Roboto-bold": require("./assets/fonts/roboto.medium.ttf"),
  });
};

export default () => {
  const [FontLoaded, setFontLoaded] = useState(false);
  if (!FontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }
  return <App />;
};
