import React, { useContext } from "react";
import { Text } from "react-native";

import * as Yup from "yup";
import {
  AppForm,
  AppFormField,
  FormFilePicker,
  SubmitButton,
} from "../../components/forms/index";

import Screen from "../../components/Screen";

import ErrorMsgBox from "../../components/ErrorMsgBox";

import { Context as PdfContext } from "../../context/PdfContext";
import { Context as UserContext } from "../../context/UserContext";
import Colors from "../../constants/colors";
import defaultStyles from "../../constants/styles";

const validationSchema = Yup.object().shape({
  topicName: Yup.string().required().label("Topic Name"),
  category: Yup.string().required().label("Category"),
  description: Yup.string().nullable().label("Category"),
  fileData: Yup.object().shape({
    fileName: Yup.string().required().label("pdf"),
    uri: Yup.string().required().label("pdf"),
  }),
});

const UploadPdf = ({ navigation }) => {
  const { uploadPdf, state: pdfState, clearMessage } = useContext(PdfContext);
  const { state } = useContext(UserContext);
  const { errorMessage, successMessage, isLoading } = pdfState;
  const userId = state.userData.id;

  const onSubmit = async (values, { resetForm }) => {
    const res = await uploadPdf({ userId, ...values });
    if (res) {
      resetForm();
      setTimeout(function () {
        navigation.goBack();
        clearMessage();
      }, 1000);
    }
  };

  return (
    <Screen
      style={{ ...defaultStyles.container, backgroundColor: Colors.white }}
    >
      <Text style={{ ...defaultStyles.heading, marginBottom: 15 }}>
        Enter Pdf Details
      </Text>
      <ErrorMsgBox
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
      <AppForm
        initialValues={{
          topicName: "",
          category: "",
          description: "",
          fileData: {
            fileName: "",
            uri: "",
          },
        }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <FormFilePicker name="fileData" />
        <AppFormField placeholder="Topic Name" name="topicName" />
        <AppFormField placeholder="Category" name="category" />
        <AppFormField
          placeholder="Description"
          name="description"
          multiline={true}
        />
        <SubmitButton
          style={{ alignSelf: "center" }}
          title="Upload"
          isLoading={isLoading}
        />
      </AppForm>
    </Screen>
  );
};

export default UploadPdf;
