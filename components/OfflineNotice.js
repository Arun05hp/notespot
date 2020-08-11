import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Constants from "expo-constants";

import Colors from "../constants/colors";
const OfflineNotice = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No Internet Connection</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: Colors.red,
    height: 50,
    justifyContent: "center",
    position: "absolute",
    top: 26,
    width: "100%",
    zIndex: 1,
  },
  text: {
    color: Colors.white,
  },
});
export default OfflineNotice;
