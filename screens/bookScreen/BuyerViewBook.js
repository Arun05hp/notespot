import React, { useContext } from "react";
import { Alert } from "react-native";

import { Context as UserContext } from "../../context/UserContext";
import { Context as BuySellBookContext } from "../../context/BuySellBookContext";
import Colors from "../../constants/colors";
import CustomButton from "../../components/CustomButton";
import ViewBook from "../../components/ViewBook";
import UserProfileBar from "../../components/UserProfileBar";

const BuyerViewBook = ({ route, navigation }) => {
  const { state } = useContext(UserContext);
  const { contactReqForSeller } = useContext(BuySellBookContext);
  const { id } = state.userData;
  const { bookData } = route.params;
  const bookId = bookData.id;

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

  return (
    <ViewBook bookData={bookData}>
      <UserProfileBar profileImg={null} name={"Arun kumar"} />
      <CustomButton
        style={{ alignSelf: "center" }}
        title="Contact Seller"
        bgColor={Colors.primary}
        color={Colors.white}
        onPress={sendReq}
      />
    </ViewBook>
  );
};

export default BuyerViewBook;
