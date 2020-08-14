import React, { useContext, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";

import { Context as PdfContext } from "../../context/PdfContext";
import { Context as UserContext } from "../../context/UserContext";
import defaultStyles from "../../constants/styles";
import PdfListing from "../../components/PdfListing";

const RecentUploads = ({ navigation }) => {
  const { state, getPdfs } = useContext(PdfContext);
  const { state: userState } = useContext(UserContext);
  const pdfListData = state.pdfLists;
  const { id } = userState.userData;

  useEffect(() => {
    getPdfs();
  }, []);

  const userUploadedPdfs = pdfListData.filter((pdf) => pdf.userId == id);

  if (pdfListData.length <= 0) {
    return (
      <View style={defaultStyles.flex_1_center}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    <PdfListing
      pdfListData={userUploadedPdfs}
      onPress={(item) =>
        navigation.navigate("ViewUserPdf", {
          pdfName: item.pdfName,
          uri: item.pdfLink,
        })
      }
    />
  );
};

export default RecentUploads;
