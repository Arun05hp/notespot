import React from "react";
import { Text, StyleSheet } from "react-native";

import Colors from "../constants/colors";

const Title = ({ title }) => {
  return <Text style={styles.title}>{title}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: Colors.white,
    textAlign: "center",
    letterSpacing: 1,
    fontFamily: "Roboto-regular",
  },
});

export default Title;
