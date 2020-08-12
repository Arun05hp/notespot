import React from "react";
import { Text } from "react-native";
import { useFormikContext } from "formik";

import ImageInput from "../ImageInput";

const FormImagePicker = ({ name }) => {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const imageUri = values[name];
  return (
    <>
      <ImageInput
        imageUri={imageUri}
        onChangeImage={(uri) => setFieldValue(name, uri)}
      />
      {touched[name] ? (
        <Text style={{ marginTop: 5, color: "red" }}>{errors[name]}</Text>
      ) : null}
    </>
  );
};

export default FormImagePicker;
