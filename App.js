import React, { useState } from "react";

import AppNavigator from "./navigation/Navigation";

import * as Font from "expo-font";
import { AppLoading } from "expo";

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
  return <AppNavigator />;
};
