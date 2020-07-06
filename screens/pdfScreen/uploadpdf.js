import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Input, Button } from "react-native-elements";
import * as DocumentPicker from "expo-document-picker";

import Title from "../../components/Title";
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
      <View style={styles.card}>
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
          <Button title="Select File" onPress={documentSelect} />
        </View>
      </View>

      {fileExists ? (
        <View style={styles.card}>
          <Text>{topicName}</Text>
          <Text>{category}</Text>
          <View style={styles.showFileContainer}>
            <MaterialIcons name="picture-as-pdf" size={24} color="#d21e27" />
            <Text numberOfLines={3} style={styles.fileNameText}>
              {fileDetails.fileName}
            </Text>
          </View>

          <View style={styles.btnContainer}>
            <Button title="Upload" onPress={() => console.log("upload")} />
          </View>
        </View>
      ) : null}
    </View>
  );
};
uploadpdf.navigationOptions = () => {
  return {
    headerTitle: () => <Title title="Upload Pdf" />,
    headerStyle: {
      backgroundColor: Colors.primary,
    },
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  card: {
    width: "90%",
    marginVertical: 10,
    marginTop: 25,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    padding: 10,
    backgroundColor: "#f4f4f4",
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
});

export default uploadpdf;
