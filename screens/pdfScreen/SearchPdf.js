import React, { useContext, useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";

import { Context as PdfContext } from "../../context/PdfContext";

import defaultStyles from "../../constants/styles";
import PdfListing from "../../components/PdfListing";
import Screen from "../../components/Screen";
import AppTextInput from "../../components/AppTextInput";

const SearchPdf = ({ navigation }) => {
  const { state, getPdfs } = useContext(PdfContext);
  let pdfListData = state.pdfLists;
  const [isLoading, setIsLoading] = useState(true);
  const [pdfs, setpdfs] = useState(pdfListData);

  const getPdfData = async () => {
    const res = await getPdfs();
    if (res) {
      setpdfs(pdfListData);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getPdfData();
  }, []);

  const searchData = (text) => {
    const newData = pdfListData.filter((item) => {
      const itemData = item.pdfName.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setpdfs(newData);
  };
  if (isLoading) {
    return (
      <View style={defaultStyles.flex_1_center}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    <Screen>
      <AppTextInput
        errorStyle={{ display: "none" }}
        placeholder="Search Pdf"
        onChangeText={(text) => searchData(text)}
      />
      {pdfs.length <= 0 ? null : (
        <PdfListing
          pdfListData={pdfs}
          onPress={(item) =>
            navigation.navigate("ViewUserPdf", {
              pdfName: item.pdfName,
              uri: item.pdfLink,
            })
          }
        />
      )}
    </Screen>
  );
};

export default SearchPdf;
