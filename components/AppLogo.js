import React from "react";
import { View, Image, StyleSheet } from "react-native";

import defaultStyles from "../constants/styles";
const AppLogo = ({ style }) => {
  return (
    <View style={{ ...styles.imgWrapper, ...style }}>
      <Image
        source={require("../assets/images/logo.png")}
        style={defaultStyles.image}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imgWrapper: {
    height: 150,
    overflow: "hidden",
    padding: 20,
    width: 150,
  },
});
export default AppLogo;
