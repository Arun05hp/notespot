import React, { useContext } from "react";
import { Alert } from "react-native";

import baseUrl from "../../api/baseUrl";
import ViewBook from "../../components/ViewBook";
import { Context as UserContext } from "../../context/UserContext";
import { Context as BuySellBookContext } from "../../context/BuySellBookContext";

const BuyerViewBook = ({ route, navigation }) => {
  const { state } = useContext(UserContext);
  const { contactReqForSeller } = useContext(BuySellBookContext);
  const { id } = state.userData;
  const { bookData } = route.params;
  const bookId = bookData.id;
  const uri = baseUrl + "/" + bookData.bookImgLink;
  const profileImg = "";

  const sendReq = async () => {
    const res = await contactReqForSeller(id, bookId);
    if (res)
      Alert.alert(
        "Request Send Successfully",
        "Check Your Book Status in Book Status Area",
        [{ text: "ok", onPress: () => navigation.navigate("Dashboard") }]
      );
    else Alert.alert("Failed", "Try Again", [{ text: "ok" }]);
  };

  return <ViewBook bookData={bookData} sendReq={sendReq} />;
};

export default BuyerViewBook;
