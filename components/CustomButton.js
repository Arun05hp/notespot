import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

const CustomButton = ({ title, style, bgColor, color, onPress, isLoading }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isLoading}
      activeOpacity={0.6}
      style={{ ...styles.button, ...style, backgroundColor: bgColor }}
    >
      {isLoading ? (
        <View style={{ marginRight: 5 }}>
          <ActivityIndicator size="small" color={color} />
        </View>
      ) : null}
      <Text style={{ ...styles.text, color: color }}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    width: "50%",
  },
  text: {
    fontSize: 18,
    fontFamily: "Roboto-bold",
  },
});

export default CustomButton;
