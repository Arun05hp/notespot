import React from "react";
import { Text } from "react-native";
import { useFormikContext } from "formik";

import FileInput from "../FileInput";

const FormFilePicker = ({ name }) => {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const fileData = values[name];

  return (
    <>
      <FileInput
        fileData={fileData}
        onChangePdf={(fileData) => setFieldValue(name, fileData)}
      />
      {touched[name] ? (
        !errors[name] ? null : (
          <Text style={{ marginTop: 5, color: "red" }}>
            Pdf is a required filed
          </Text>
        )
      ) : null}
    </>
  );
};

export default FormFilePicker;
