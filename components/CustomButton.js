import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import defaultStyles from "../constants/styles";
const CustomButton = ({
  title,
  style,
  bgColor,
  color,
  onPress,
  isLoading,
  isDisabled,
}) => {
  const disabled = isLoading ? isLoading : isDisabled;
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.6}
      style={{ ...styles.button, ...style, backgroundColor: bgColor }}
    >
      {isLoading ? (
        <View style={{ marginRight: 5 }}>
          <ActivityIndicator size="small" color={color} />
        </View>
      ) : null}
      <Text style={{ ...defaultStyles.title, color: color }}>{title}</Text>
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
});

export default CustomButton;
