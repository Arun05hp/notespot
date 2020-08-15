import React, { useContext, useEffect } from "react";
import { View, ActivityIndicator, Button } from "react-native";

import { Context as PdfContext } from "../../context/PdfContext";

import defaultStyles from "../../constants/styles";
import PdfListing from "../../components/PdfListing";

const PdfLists = ({ navigation }) => {
  const { state, getPdfs } = useContext(PdfContext);
  const pdfListData = state.pdfLists;
  useEffect(() => {
    getPdfs();
  }, []);

  if (true) {
    return (
      <View style={defaultStyles.flex_1_center}>
        <ActivityIndicator size="large" color="red" />
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
