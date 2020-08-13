import React, { useContext, useEffect, useState } from "react";
import { Alert, ActivityIndicator } from "react-native";

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
  const [sellerData, setSellerData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { state } = useContext(UserContext);
  const { id } = state.userData;
  const { bookData } = route.params;
  const { id: bookId, sellerId } = bookData;

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

  useEffect(() => {
    const res = getSellerInfo(sellerId);
    if (res) setIsLoading(false);
    else
      Alert.alert("Error", "Faild to get Buyer Information", [
        { text: "ok", onPress: () => navigation.goBack() },
      ]);
  }, [sellerId]);

  const getSellerInfo = async (userId) => {
    try {
      const response = await appApi.post("/user/profile", { userId });
      if (response.data.error) {
        return false;
      } else {
        setSellerData(response.data);
        return true;
      }
    } catch (error) {
      return false;
    }
  };

  return (
    <ViewBook bookData={bookData}>
      {!sellerData.name && !isLoading ? (
        <ActivityIndicator size="large" color={Colors.green} />
      ) : (
        <>
          <UserProfileBar
            profileImg={sellerData.profileImg}
            name={sellerData.name}
          />
          <CustomButton
            style={{ alignSelf: "center" }}
            title="Contact Seller"
            bgColor={Colors.primary}
            color={Colors.white}
            onPress={sendReq}
          />
        </>
      )}
    </ViewBook>
  );
};

export default BuyerViewBook;
