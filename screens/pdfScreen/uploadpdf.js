import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Input, Button } from "react-native-elements";
import * as DocumentPicker from "expo-document-picker";

import Card from "../../components/Card";

import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../constants/colors";

const documentSelect = async () => {
  try {
    const res = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: false,
    });
    if (res.type === "success") {
      setFileDetails({
        fileName: res.name,
        fileSize: res.size,
      });
      setFileExists(true);
    } else {
      console.log(res.type);
    }
  } catch (err) {
    //Handling any exception (If any)
    console.log(err);
  }
};

const uploadpdf = () => {
  const [fileExists, setFileExists] = useState(false);
  const [topicName, setTopicName] = useState("");
  const [category, setCategory] = useState("");
  const [fileDetails, setFileDetails] = useState({});

  const documentSelect = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: false,
      });
      if (res.type === "success") {
        setFileDetails({
          fileName: res.name,
          fileSize: res.size,
          customName: topicName,
          category: category,
        });
        setFileExists(true);
      } else {
        console.log(res.type);
      }
    } catch (err) {
      //Handling any exception (If any)
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
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
        <View>
          <Button
            title={fileExists ? "Change File" : "Select File"}
            onPress={documentSelect}
          />
        </View>
      </Card>

      {fileExists ? (
        <Card style={styles.card}>
          <Text style={styles.text}>
            Topic Name:{" "}
            <Text style={{ color: Colors.primary }}>
              {fileDetails.customName}
            </Text>
          </Text>
          <Text style={styles.text}>
            Category:{" "}
            <Text style={{ color: Colors.primary }}>
              {fileDetails.category}
            </Text>
          </Text>
          <View style={styles.showFileContainer}>
            <MaterialIcons name="picture-as-pdf" size={24} color="#d21e27" />
            <Text numberOfLines={3} style={styles.fileNameText}>
              {fileDetails.fileName}
            </Text>
          </View>

          <View style={styles.btnContainer}>
            <Button title="Upload" onPress={() => console.log("upload")} />
          </View>
        </Card>
      ) : null}
    </View>
  );
};
uploadpdf.navigationOptions = () => {
  return {
    headerTitle: "UPLOAD PDF",
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  card: {
    width: "90%",
    backgroundColor: "white",
    padding: 10,
  },
  inputContainer: {
    paddingHorizontal: 0,
  },
  Input: {
    fontSize: 16,
  },
  label: {
    fontFamily: "Roboto-bold",
    color: Colors.primary,
  },
  btnContainer: {
    marginVertical: 10,
  },
  showFileContainer: {
    marginVertical: 5,
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  fileNameText: {
    paddingLeft: 5,
  },
  text: {
    fontSize: 16,
    fontFamily: "Roboto-bold",
    marginVertical: 5,
  },
});

export default uploadpdf;
