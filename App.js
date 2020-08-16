import React, { useState } from "react";

import AppNavigator from "./navigation/Navigation";

import { Provider as AuthProvider } from "./context/AuthContext";
import { Provider as UserProvider } from "./context/UserContext";
import { Provider as PdfProvider } from "./context/PdfContext";
import { Provider as BookProvider } from "./context/BuySellBookContext";

import * as Font from "expo-font";
import { AppLoading } from "expo";
import OfflineNotice from "./components/OfflineNotice";

const fetchFonts = async () => {
  await Font.loadAsync({
    "Roboto-regular": require("./assets/fonts/roboto.regular.ttf"),
    "Roboto-bold": require("./assets/fonts/roboto.bold.ttf"),
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
  return (
    <BookProvider>
      <PdfProvider>
        <UserProvider>
          <AuthProvider>
            <AppNavigator />
          </AuthProvider>
        </UserProvider>
      </PdfProvider>
    </BookProvider>
  );
};
