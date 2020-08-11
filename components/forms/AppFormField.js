import React from "react";
import { useFormikContext } from "formik";
import AppTextInput from "../AppTextInput";

const AppFormField = ({ name, ...otherProps }) => {
  const {
    setFieldTouched,
    setFieldValue,
    errors,
    touched,
    values,
  } = useFormikContext();
  return (
    <AppTextInput
      errorMessage={touched[name] ? errors[name] : ""}
      onBlur={() => setFieldTouched(name)}
      onChangeText={(text) => setFieldValue(name, text)}
      value={values[name]}
      {...otherProps}
    />
  );
};

export default AppFormField;
