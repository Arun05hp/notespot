import React, { useContext, useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";

import { Context as PdfContext } from "../../context/PdfContext";
import { Context as UserContext } from "../../context/UserContext";
import defaultStyles from "../../constants/styles";
import PdfListing from "../../components/PdfListing";

const RecentUploads = ({ navigation }) => {
  const { state, getPdfs } = useContext(PdfContext);
  const { state: userState } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const pdfListData = state.pdfLists;
  const { id } = userState.userData;
  let userUploadedPdfs = [];

  const getPdfData = async () => {
    const res = await getPdfs();

    if (res) {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getPdfData();
  }, []);
  if (pdfListData.length > 0) {
    userUploadedPdfs = pdfListData.filter((pdf) => pdf.userId == id);
  }

  if (isLoading) {
    return (
      <View style={defaultStyles.flex_1_center}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }
  if (userUploadedPdfs.length <= 0 || pdfListData.length <= 0) {
    return (
      <View style={defaultStyles.flex_1_center}>
        <Text style={defaultStyles.subTitle}>No Pdf Uploaded By You </Text>
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
