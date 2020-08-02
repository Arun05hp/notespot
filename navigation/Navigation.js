import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import ResolveAuthScreen from "../screens/AuthScreens/ResolveAuthScreen";
import IndexScreen from "../screens/AuthScreens/IndexScreen";
import SignUpScreen from "../screens/AuthScreens/SignUpScreen";
import SignInScreen from "../screens/AuthScreens/SignInScreen";
import UserDashboard from "../screens/MainScreens/UserDashboard";
import UserProfile from "../screens/UserScreens/UserProfile";
import EditProfileDetails from "../screens/UserScreens/EditProfileDetails";
import EditCollegeDetails from "../screens/UserScreens/EditCollegeDetails";
import UploadPdf from "../screens/PdfScreen/UploadPdf";
import BookList from "../screens/BookScreen/BookList";
import SellBooks from "../screens/BookScreen/SellBooks";
import PdfLists from "../screens/PdfScreen/PdfLists";
import ViewPdf from "../screens/PdfScreen/ViewPdf";

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
    Dashboard: UserDashboard,
    UploadPdf: UploadPdf,
    SellBooks: SellBooks,
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
    pdfLists: PdfLists,
    viewPdf: ViewPdf,
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
    upload: BookList,
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
    profile: UserProfile,
    editProfile: EditProfileDetails,
    editCollegeDetails: EditCollegeDetails,
  },
  { headerMode: "none", defaultNavigationOptions: defaultNavOptions }
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
