import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import ResolveAuthScreen from "../screens/AuthScreens/ResolveAuthScreen";
import IndexScreen from "../screens/AuthScreens/IndexScreen";
import SignUpScreen from "../screens/AuthScreens/SignUpScreen";
import SignInScreen from "../screens/AuthScreens/SignInScreen";
import userDashboard from "../screens/MainScreens/userDashboard";
import UserProfile from "../screens/ProfileScreens/UserProfile";
import pdfDashboard from "../screens/pdfScreen/pdfDashboard";
import uploadpdf from "../screens/pdfScreen/uploadpdf";
import bookList from "../screens/bookScreen/bookList";

import { AntDesign } from "@expo/vector-icons";

import Colors from "../constants/colors";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTintColor: "white",
  headerTitleStyle: {
    fontSize: 22,
    fontFamily: "Roboto-bold",
    letterSpacing: 1,
  },
};

const Dashboard = createStackNavigator(
  {
    Dashboard: userDashboard,
    UploadPdf: uploadpdf,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

Dashboard.navigationOptions = {
  title: "Home",
  tabBarIcon: ({ tintColor }) => (
    <AntDesign name="home" size={26} color={tintColor} />
  ),
};

const pdfFlow = createStackNavigator(
  {
    upload: pdfDashboard,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

pdfFlow.navigationOptions = {
  title: "PDF",
  tabBarIcon: ({ tintColor }) => (
    <AntDesign name="pdffile1" size={26} color={tintColor} />
  ),
};

const bookFlow = createStackNavigator(
  {
    upload: bookList,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);
bookFlow.navigationOptions = {
  title: "Book",
  tabBarIcon: ({ tintColor }) => (
    <AntDesign name="book" size={26} color={tintColor} />
  ),
};

const Profile = createStackNavigator(
  {
    profie: UserProfile,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);
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
  ResolveAuth: ResolveAuthScreen,
  AuthFlow,
  MainFlow,
});

const AppNavigator = createAppContainer(switchNavigator);

export default AppNavigator;
