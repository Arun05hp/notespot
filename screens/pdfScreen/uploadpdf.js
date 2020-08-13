import React, { useContext, useState } from "react";
import { Text, StyleSheet } from "react-native";

import * as Yup from "yup";
import {
  AppForm,
  AppFormField,
  SubmitButton,
} from "../../components/forms/index";

import Screen from "../../components/Screen";
import * as DocumentPicker from "expo-document-picker";

import ErrorMsgBox from "../../components/ErrorMsgBox";

import { Context as PdfContext } from "../../context/PdfContext";
import { Context as UserContext } from "../../context/UserContext";
import Colors from "../../constants/colors";

const validationSchema = Yup.object().shape({
  topicName: Yup.string().required().label("Topic Name"),
  category: Yup.string().required().label("Category"),
  description: Yup.string().nullable().label("Category"),
});

const UploadPdf = ({ navigation }) => {
  const { uploadPdf, state: pdfState, clearMessage } = useContext(PdfContext);
  const { state } = useContext(UserContext);
  const { errorMessage, successMessage, isLoading } = pdfState;
  const userId = state.userData.id;
  const [pdfFileData, setPdfFileData] = useState({
    fileName: "",
    uri: "",
  });

  const [fileExists, setFileExists] = useState(false);

  const documentSelect = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: false,
      });
      if (res.type === "success") {
        setPdfFileData({
          fileName: res.name,
          uri: res.uri,
        });
        setFileExists(true);
      } else {
        return;
      }
    } catch (err) {
      err = err;
    }
  };

  //   <TwoButtonRow
  //   firstBtnText={selectBtnText}
  //   secBtnText="Upload Pdf"
  //   onSubmit1st={documentSelect}
  //   onSubmit2nd={() => validatePdf()}
  //   isloading={isLoading}
  // />
  const validatePdf = async () => {
    if (fileExists) {
      const res = await uploadPdf({
        userId,
        topicName,
        category,
        description,
        ...pdfFileData,
      });
      if (res) {
        setTimeout(function () {
          navigation.goBack();
        }, 1000);
      }
    }
  };

  return (
    <Screen style={styles.container}>
      <Text style={styles.heading}>Enter Pdf Details</Text>
      <ErrorMsgBox
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
      <AppForm
        initialValues={{
          topicName: "",
          category: "",
          description: "",
        }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 20,
    fontFamily: "Roboto-bold",
    color: Colors.primary,
    marginBottom: 15,
  },
});

export default UploadPdf;
