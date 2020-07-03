import React from "react";
import { Text, StyleSheet } from "react-native";

import Colors from "../constants/colors";

const Title = ({ title }) => {
  return <Text style={styles.title}>{title}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.white,
  },
});

export default Title;
