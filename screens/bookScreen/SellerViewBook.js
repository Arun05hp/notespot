import React from "react";
import { Alert } from "react-native";

import baseUrl from "../../api/baseUrl";
import ViewBook from "../../components/ViewBook";

const SellerViewBook = ({ route, navigation }) => {
  const { bookData } = route.params;
  const uri = baseUrl + "/" + bookData.bookImgLink;
  const profileImg = "";

  const onAccept = () => {
    Alert.alert("Accepted", "Request Accepted Successfully", [
      { text: "ok", onPress: () => navigation.goBack() },
    ]);
  };
  const onReject = () => {
    Alert.alert("Rejected", "Request Rejected Successfully", [
      { text: "ok", onPress: () => navigation.goBack() },
    ]);
  };
  return (
    <ViewBook
      isSellerBook
      bookData={bookData}
      onAccept={onAccept}
      onReject={onReject}
    />
  );
};

export default SellerViewBook;
