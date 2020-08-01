import React from "react";
import { View, StyleSheet } from "react-native";

const CardComponent = ({ children, style }) => {
  return <View style={{ ...styles.cardContainer, ...style }}>{children}</View>;
};

const styles = StyleSheet.create({
  cardContainer: {
    shadowColor: "black",
    shadowOffset: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 0,
    elevation: 8,
    overflow: "hidden",
  },
});
export default CardComponent;
