import React, { useContext, useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";

import { Context as PdfContext } from "../../context/PdfContext";

import defaultStyles from "../../constants/styles";
import PdfListing from "../../components/PdfListing";
import Screen from "../../components/Screen";
import AppTextInput from "../../components/AppTextInput";

const SearchPdf = ({ navigation }) => {
  const { state, getPdfs } = useContext(PdfContext);
  useEffect(() => {
    getPdfs();
  }, []);

  const pdfListData = state.pdfLists;

  const [pdfs, setpdfs] = useState(!pdfListData ? [] : pdfListData);

  const searchData = (text) => {
    const newData = pdfListData.filter((item) => {
      const itemData = item.pdfName.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setpdfs(newData);
  };

  if (pdfListData.length <= 0) {
    return (
      <View style={defaultStyles.flex_1_center}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    <Screen>
      <AppTextInput
        placeholder="Search"
        onChangeText={(text) => searchData(text)}
      />
      <PdfListing
        pdfListData={pdfs}
        onPress={(item) =>
          navigation.navigate("ViewUserPdf", {
            pdfName: item.pdfName,
            uri: item.pdfLink,
          })
        }
      />
    </Screen>
  );
};

export default SearchPdf;
