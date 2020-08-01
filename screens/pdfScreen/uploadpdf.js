import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Input } from "react-native-elements";
import * as DocumentPicker from "expo-document-picker";

import ErrorMsgBox from "../../components/ErrorMsgBox";
import TwoButtonRow from "../../components/TwoButtonRow";
import { NavigationEvents } from "react-navigation";
import { Context as PdfContext } from "../../context/PdfContext";
import { Context as UserContext } from "../../context/UserContext";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import Colors from "../../constants/colors";

const UploadPdf = () => {
  const { uploadPdf, state: pdfState, clearMessage } = useContext(PdfContext);
  const { state } = useContext(UserContext);
  const { errorMessage, successMessage, isUploading } = pdfState;
  const userId = state.userData.id;
  const [pdfFileData, setPdfFileData] = useState({
    fileName: "",
    uri: "",
  });
  const [fileExists, setFileExists] = useState(false);
  const [topicName, setTopicName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  let selectBtnText = fileExists ? "Change Pdf" : "Select pdf";

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
      console.log(err);
    }
  };

  const validatePdf = () => {
    if (fileExists) {
      uploadPdf({
        userId,
        topicName,
        category,
        description,
        ...pdfFileData,
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <NavigationEvents onWillFocus={clearMessage} />
      <Text style={styles.heading}>Enter PDF Details</Text>
      <View style={styles.container}>
        <ErrorMsgBox
          errorMessage={errorMessage}
          successMessage={successMessage}
        />
        <Input
          containerStyle={styles.inputContainer}
          inputStyle={styles.Input}
          labelStyle={styles.label}
          label="Topic Name"
          value={topicName}
          onChangeText={setTopicName}
        />
        <Input
          containerStyle={styles.inputContainer}
          inputStyle={styles.Input}
          labelStyle={styles.label}
          label="Category"
          value={category}
          onChangeText={setCategory}
        />
        <Input
          containerStyle={styles.inputContainer}
          inputStyle={styles.Input}
          labelStyle={styles.label}
          label="Description"
          placeholder="Optional"
          multiline={true}
          value={description}
          onChangeText={setDescription}
        />
        <View>
          {fileExists && (
            <>
              <View style={{ ...styles.showFileContainer, ...styles.row }}>
                <View
                  style={{
                    ...styles.row,
                    width: "80%",
                  }}
                >
                  <MaterialIcons
                    name="picture-as-pdf"
                    size={24}
                    color="#d21e27"
                  />
                  <Text numberOfLines={3} style={styles.fileNameText}>
                    {pdfFileData.fileName}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    setPdfFileData({});
                    setFileExists(false);
                  }}
                >
                  <Entypo
                    style={{
                      textAlign: "center",
                      padding: 5,
                      borderRadius: 20,
                      marginHorizontal: 10,
                      backgroundColor: Colors.white,
                      borderWidth: 1,
                      borderColor: "rgba(0,0,0,0.2)",
                    }}
                    name="cross"
                    size={20}
                    color="#dc3545"
                  />
                </TouchableOpacity>
              </View>
            </>
          )}
          {!fileExists && (
            <Text style={{ color: "#ff0011", textAlign: "center" }}>
              Please Select File !
            </Text>
          )}
          <TwoButtonRow
            firstBtnText={selectBtnText}
            secBtnText="Upload Pdf"
            onSubmit1st={documentSelect}
            onSubmit2nd={() => validatePdf()}
            isloading={isUploading}
          />
        </View>
      </View>
    </ScrollView>
  );
};
UploadPdf.navigationOptions = () => {
  return {
    headerTitle: "UPLOAD PDF",
  };
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  heading: {
    fontSize: 20,
    fontFamily: "Roboto-bold",
    color: Colors.primary,
    marginBottom: 15,
  },
  container: {
    width: "85%",
    padding: 10,
  },
  inputContainer: {
    paddingHorizontal: 0,
  },
  Input: {
    fontSize: 16,
    minHeight: 30,
  },
  label: {
    fontFamily: "Roboto-bold",
    color: Colors.primary,
    padding: 0,
  },
  showFileContainer: {
    marginVertical: 15,
    borderWidth: 1,
    borderColor: Colors.primary,
    padding: 10,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  fileNameText: {
    paddingLeft: 5,
  },
});

export default UploadPdf;
