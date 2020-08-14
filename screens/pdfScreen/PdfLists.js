import React, { useContext, useEffect } from "react";
import { View, ActivityIndicator, Button } from "react-native";
import * as FileSystem from "expo-file-system";
import { Context as PdfContext } from "../../context/PdfContext";

import defaultStyles from "../../constants/styles";
import PdfListing from "../../components/PdfListing";

const PdfLists = ({ navigation }) => {
  const { state, getPdfs } = useContext(PdfContext);
  const pdfListData = state.pdfLists;
  useEffect(() => {
    getPdfs();
  }, []);

  const onSubmit = async () => {
    const pdfFolder = FileSystem.documentDirectory + "pdfs/";
    const folder = await FileSystem.getInfoAsync(pdfFolder);

    if (!folder.exists) {
      const res = await FileSystem.makeDirectoryAsync(pdfFolder);
      console.log(res);
    }
    const data = await FileSystem.readAsStringAsync(
      pdfFolder + "Assignment.pdf",
      { encoding: FileSystem.EncodingType.Base64 }
    );
  };

  if (true) {
    return (
      <View style={defaultStyles.flex_1_center}>
        <ActivityIndicator size="large" color="red" />
        <Button title="ok" onPress={onSubmit} />
      </View>
    );
  }

  return (
    <PdfListing
      pdfListData={pdfListData}
      onPress={(item) =>
        navigation.navigate("ViewPdf", {
          pdfName: item.pdfName,
          uri: item.pdfLink,
        })
      }
    />
  );
};

export default PdfLists;
