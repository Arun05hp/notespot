import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

import Colors from "../constants/colors";
import * as DocumentPicker from "expo-document-picker";
import { MaterialIcons } from "@expo/vector-icons";

const FileInput = ({ fileData, onChangePdf }) => {
  const handlePress = () => {
    if (!fileData.fileName) pickPdf();
    else
      Alert.alert("Change", "Are you sure you want to change this Pdfs?", [
        {
          text: "Yes",
          onPress: () => onChangePdf({}),
        },
        { text: "No" },
      ]);
  };

  const pickPdf = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: false,
      });
      if (res.type === "success") {
        onChangePdf({
          fileName: res.name,
          uri: res.uri,
        });
      }
    } catch (err) {
      err = err;
    }
  };
  return (
    <TouchableOpacity
      style={{ width: "95%" }}
      activeOpacity={0.6}
      onPress={handlePress}
    >
      <View style={styles.container}>
        {!fileData.fileName ? (
          <MaterialIcons
            name="picture-as-pdf"
            size={30}
            color={Colors.danger}
          />
        ) : (
          <Text style={styles.text}>{fileData.fileName}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: Colors.light,
    borderRadius: 5,
    height: 60,
    justifyContent: "center",
    overflow: "hidden",
    width: "100%",
  },
  text: {
    color: Colors.dark,
    paddingHorizontal: 10,
  },
});

export default FileInput;
