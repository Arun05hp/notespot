import React, { useEffect, useState } from "react";
import { Alert, ActivityIndicator } from "react-native";

import appApi from "../../api/appApi";
import CustomButton from "../../components/CustomButton";
import Colors from "../../constants/colors";
import UserProfileBar from "../../components/UserProfileBar";
import ViewBook from "../../components/ViewBook";

const ViewBookStatus = ({ route }) => {
  const [sellerData, setSellerData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { bookData } = route.params;
  const { sellerId } = bookData;
  let buyerButtonText = "";
  let buyerButtonBg = Colors.primary;
  let showInfo = false;
  if (sellerId) {
    if (!bookData.sellerStatus && bookData.buyerStatus == 1) {
      buyerButtonText = "Requested";
      buyerButtonBg = Colors.yellow;
    } else if (bookData.sellerStatus == 1 && bookData.buyerStatus == 1) {
      buyerButtonText = "Accepted";
      showInfo = true;
      buyerButtonBg = Colors.secondary;
    } else {
      buyerButtonText = "Purchased";
      showInfo = true;
      buyerButtonBg = Colors.secondary;
    }
  }
  useEffect(() => {
    const res = getSellerInfo(sellerId);
    if (res) setIsLoading(false);
    else
      Alert.alert("Error", "Faild to get Buyer Information", [
        { text: "ok", onPress: () => navigation.goBack() },
      ]);
    return () => {
      setSellerData({});
    };
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
          <UserProfileBar userData={sellerData} showInfo={showInfo} />
          <CustomButton
            isDisabled={true}
            style={{ alignSelf: "center" }}
            title={buyerButtonText}
            bgColor={buyerButtonBg}
            color={Colors.white}
          />
        </>
      )}
    </ViewBook>
  );
};

export default ViewBookStatus;
