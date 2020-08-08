import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UserDashboard from "../screens/MainScreens/UserDashboard";

import ResolveAuthScreen from "../screens/AuthScreens/ResolveAuthScreen";
import WelcomeScreen from "../screens/AuthScreens/WelcomeScreen";
import SignUpScreen from "../screens/AuthScreens/SignUpScreen";
import SignInScreen from "../screens/AuthScreens/SignInScreen";

import UserProfile from "../screens/UserScreens/UserProfile";
import EditProfileDetails from "../screens/UserScreens/EditProfileDetails";
import EditCollegeDetails from "../screens/UserScreens/EditCollegeDetails";

import BookList from "../screens/BookScreen/BookList";
import SellBooks from "../screens/BookScreen/SellBooks";
import BuyBook from "../screens/BookScreen/BuyBook";

import UploadPdf from "../screens/PdfScreen/UploadPdf";
import PdfLists from "../screens/PdfScreen/PdfLists";
import ViewPdf from "../screens/PdfScreen/ViewPdf";

import { AntDesign } from "@expo/vector-icons";
import Colors from "../constants/colors";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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

const DashboardNavigator = () => (
  <Stack.Navigator screenOptions={defaultNavOptions}>
    <Stack.Screen name="Dashboard" component={UserDashboard} />
    <Stack.Screen name="UploadPdf" component={UploadPdf} />
    <Stack.Screen name="SellBooks" component={SellBooks} />
    <Stack.Screen name="BuyBook" component={BuyBook} />
  </Stack.Navigator>
);

const PdfNavigator = () => (
  <Stack.Navigator screenOptions={defaultNavOptions}>
    <Stack.Screen name="PdfLists" component={PdfLists} />
    <Stack.Screen name="ViewPdf" component={ViewPdf} />
  </Stack.Navigator>
);

const BookNavigator = () => (
  <Stack.Navigator screenOptions={defaultNavOptions}>
    <Stack.Screen name="BookList" component={BookList} />
  </Stack.Navigator>
);

const ProfileNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Profile" component={UserProfile} />
    <Stack.Screen name="EditProfile" component={EditProfileDetails} />
    <Stack.Screen name="EditCollegeDetails" component={EditCollegeDetails} />
  </Stack.Navigator>
);

const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="Signup" component={SignUpScreen} />
    <Stack.Screen name="Signin" component={SignInScreen} />
  </Stack.Navigator>
);

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
