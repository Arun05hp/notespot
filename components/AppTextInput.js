import React from "react";
import { StyleSheet } from "react-native";
import { Input } from "react-native-elements";

import Colors from "../constants/colors";

const AppTextInput = ({ ...otherProps }) => {
  return (
    <Input
      inputStyle={styles.Input}
      autoCapitalize="none"
      autoCorrect={false}
      placeholderTextColor={Colors.placeholder}
      {...otherProps}
    />
  );
};
const styles = StyleSheet.create({
  textInput: {
    fontSize: 18,
    paddingLeft: 5,
    fontFamily: "Roboto-bold",
  },
});
export default AppTextInput;
