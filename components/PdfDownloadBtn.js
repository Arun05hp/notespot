import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import * as FileSystem from "expo-file-system";

import baseUrl from "../api/baseUrl";
import ProgressCircle from "react-native-progress-circle";
import Colors from "../constants/colors";
import { MaterialIcons } from "@expo/vector-icons";

const PdfDownloadBtn = ({ item }) => {
  const [state, setstate] = useState(false);
  const [percentage, setPercentage] = useState(1);

  const onSubmit = async ({ pdfName, pdfLink }) => {
    const pdfFolder = FileSystem.documentDirectory + "pdfs/";
    const folder = await FileSystem.getInfoAsync(pdfFolder);
    if (!folder.exists) {
      const res = await FileSystem.makeDirectoryAsync(pdfFolder);
    }
    const fileExists = await FileSystem.getInfoAsync(pdfFolder + pdfName);
    if (fileExists.exists) {
      console.log("presett", fileExists.exists);
      setstate(false);
      return;
    }

    const sourceUri = baseUrl + "/" + pdfLink;

    const downloadResumable = FileSystem.createDownloadResumable(
      sourceUri,
      pdfFolder + pdfName,
      {},
      callback
    );

    try {
      const { uri } = await downloadResumable.downloadAsync();
      console.log("Finished downloading to ", uri);
      setstate(false);
    } catch (e) {
      err = e;
      setstate(false);
    }
  };
  const callback = (downloadProgress) => {
    const progress = Number.parseInt(
      (
        downloadProgress.totalBytesWritten /
        downloadProgress.totalBytesExpectedToWrite
      ).toFixed(3) * 100
    );
    console.log(progress);
    setPercentage(progress);
  };
  return (
    <TouchableOpacity
      disabled={state}
      activeOpacity={0.5}
      onPress={() => {
        setstate(true);
        onSubmit(item);
      }}
    >
      {!state ? (
        <MaterialIcons name="file-download" size={24} color={Colors.yellow} />
      ) : (
        <ProgressCircle
          percent={percentage}
          radius={10}
          borderWidth={2}
          color="#3399FF"
          shadowColor="#999"
          bgColor="#fff"
        />
      )}
    </TouchableOpacity>
  );
};

export default PdfDownloadBtn;
