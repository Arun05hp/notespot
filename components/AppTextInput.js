import React from "react";
import { Input } from "react-native-elements";

import Colors from "../constants/colors";

const AppTextInput = ({ ...otherProps }) => {
  return (
    <Input
      autoCapitalize="none"
      autoCorrect={false}
      placeholderTextColor={Colors.placeholder}
      {...otherProps}
    />
  );
};

export default AppTextInput;
