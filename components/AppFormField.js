import React from "react";
import { useFormikContext } from "formik";
import AppTextInput from "./AppTextInput";

const AppFormField = ({ name, ...otherProps }) => {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();
  return (
    <AppTextInput
      errorMessage={touched[name] ? errors[name] : ""}
      onBlur={() => setFieldTouched(name)}
      onChangeText={handleChange(name)}
      {...otherProps}
    />
  );
};

export default AppFormField;
