import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
const CardButton = ({ children, style, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ ...styles.CardButton, ...style }}>{children}</View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  CardButton: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default CardButton;
