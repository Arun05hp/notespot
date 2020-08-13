import React, { useContext } from "react";
import { Alert } from "react-native";

import appApi from "../../api/appApi";
import { Context as UserContext } from "../../context/UserContext";
import Colors from "../../constants/colors";
import CustomButton from "../../components/CustomButton";
import ViewBook from "../../components/ViewBook";
import UserProfileBar from "../../components/UserProfileBar";

const contactReqForSeller = async (id, bookId) => {
  try {
    const response = await appApi.post("/user/contactReqForSeller", {
      id,
      bookId,
    });
    if (response.data.error) return false;
    else return true;
  } catch (error) {
    return false;
  }
};

const BuyerViewBook = ({ route, navigation }) => {
  const { state } = useContext(UserContext);
  const { id } = state.userData;
  const { bookData } = route.params;
  const bookId = bookData.id;
  console.log(bookData);
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
