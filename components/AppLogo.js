import React from "react";
import { View, Image, StyleSheet } from "react-native";

const AppLogo = ({ style }) => {
  return (
    <View style={{ ...styles.imgWrapper, ...style }}>
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.imgStyle}
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
  imgStyle: {
    height: "100%",
    width: "100%",
  },
});
export default AppLogo;
