import React from "react";
import { navigationRef } from "./navigationRef";

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

const DashboardStack = createStackNavigator();
const PdfStack = createStackNavigator();
const BookStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const AuthStack = createStackNavigator();
const SwitchStack = createStackNavigator();
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
  <DashboardStack.Navigator screenOptions={defaultNavOptions}>
    <DashboardStack.Screen name="Dashboard" component={UserDashboard} />
    <DashboardStack.Screen name="Upload" component={UploadPdf} />
    <DashboardStack.Screen name="Sell" component={SellBooks} />
    <DashboardStack.Screen name="Buy" component={BuyBook} />
  </DashboardStack.Navigator>
);

const PdfNavigator = () => (
  <PdfStack.Navigator screenOptions={defaultNavOptions}>
    <PdfStack.Screen name="PdfLists" component={PdfLists} />
    <PdfStack.Screen name="ViewPdf" component={ViewPdf} />
  </PdfStack.Navigator>
);

const BookNavigator = () => (
  <BookStack.Navigator screenOptions={defaultNavOptions}>
    <BookStack.Screen name="BookList" ch component={BookList} />
  </BookStack.Navigator>
);

const ProfileNavigator = () => (
  <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
    <ProfileStack.Screen name="Profile" component={UserProfile} />
    <ProfileStack.Screen name="EditProfile" component={EditProfileDetails} />
    <ProfileStack.Screen
      name="EditCollegeDetails"
      component={EditCollegeDetails}
    />
  </ProfileStack.Navigator>
);

const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
    <AuthStack.Screen name="Signup" component={SignUpScreen} />
    <AuthStack.Screen name="Signin" component={SignInScreen} />
  </AuthStack.Navigator>
);

const MainNavigator = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: Colors.primary,
      showLabel: false,
      keyboardHidesTabBar: true,
    }}
  >
    <Tab.Screen
      name="Dashboard"
      component={DashboardNavigator}
      options={{
        tabBarIcon: ({ size, color }) => (
          <AntDesign name="home" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Pdf"
      component={PdfNavigator}
      options={{
        tabBarIcon: ({ size, color }) => (
          <AntDesign name="pdffile1" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Book"
      component={BookNavigator}
      options={{
        tabBarIcon: ({ size, color }) => (
          <AntDesign name="book" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileNavigator}
      options={{
        tabBarIcon: ({ size, color }) => (
          <AntDesign name="user" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

const SwitchNavigator = () => (
  <SwitchStack.Navigator screenOptions={{ headerShown: false }}>
    <SwitchStack.Screen name="Auth" component={AuthNavigator} />
    <SwitchStack.Screen name="Main" component={MainNavigator} />
  </SwitchStack.Navigator>
);

const AppNavigator = () => (
  <NavigationContainer ref={navigationRef}>
    <SwitchNavigator />
  </NavigationContainer>
);

export default AppNavigator;
