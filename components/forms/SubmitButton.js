import React from "react";
import { useFormikContext } from "formik";

import CustomButton from "../CustomButton";
import Colors from "../../constants/colors";
const SubmitButton = ({ ...otherProps }) => {
  const { handleSubmit } = useFormikContext();
  return (
    <CustomButton
      onPress={handleSubmit}
      bgColor={Colors.primary}
      color={Colors.white}
      {...otherProps}
    />
  );
};

export default SubmitButton;
