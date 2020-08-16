import React, { useEffect, useState, useContext } from "react";
import { View, Text, Alert, ActivityIndicator, StyleSheet } from "react-native";

import appApi from "../../api/appApi";
import { Context as BuyBookContext } from "../../context/BuySellBookContext";
import ViewBook from "../../components/ViewBook";
import CustomButton from "../../components/CustomButton";
import Colors from "../../constants/colors";
import UserProfileBar from "../../components/UserProfileBar";

const accept_RejectReq = async (bookId, isRejected) => {
  try {
    const response = await appApi.post("/user/app/accept_RejectReq", {
      bookId,
      isRejected,
    });
    if (response.data.error) return false;
    else return true;
  } catch (error) {
    return false;
  }
};

const SellerViewBook = ({ route, navigation }) => {
  const { getBooks } = useContext(BuyBookContext);
  const [buyerData, setBuyerData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { bookData } = route.params;
  const { id: bookId, buyerId } = bookData;
  let showInfo = false;
  if (bookData.buyerStatus == 1 && bookData.sellerStatus == 1) {
    showInfo = true;
  }

  const onAccept = async () => {
    const res = await accept_RejectReq(bookId, false);
    if (res)
      Alert.alert("Accepted", "Request Accepted Successfully", [
        {
          text: "ok",
          onPress: () => {
            navigation.goBack();
            getBooks();
          },
        },
      ]);
    else
      Alert.alert("Failed", "Try Again", [
        { text: "ok", onPress: () => navigation.goBack() },
      ]);
  };

  const onReject = async () => {
    const res = await accept_RejectReq(bookId, true);
    if (res)
      Alert.alert("Rejected", "Request Rejected Successfully", [
        {
          text: "ok",
          onPress: () => {
            navigation.goBack();
            getBooks();
          },
        },
      ]);
    else
      Alert.alert("Failed", "Try Again", [
        { text: "ok", onPress: () => navigation.goBack() },
      ]);
  };

  useEffect(() => {
    const res = getBuyerInfo(buyerId);
    if (res) setIsLoading(false);
    else
      Alert.alert("Error", "Faild to get Buyer Information", [
        { text: "ok", onPress: () => navigation.goBack() },
      ]);
    return () => {
      setBuyerData({});
    };
  }, [buyerId]);

  const getBuyerInfo = async (userId) => {
    try {
      const response = await appApi.post("/user/app/profile", { userId });
      if (response.data.error) {
        return false;
      } else {
        setBuyerData(response.data);
        return true;
      }
    } catch (error) {
      return false;
    }
  };

  return (
    <ViewBook bookData={bookData}>
      {!buyerId ? (
        <Text style={styles.text}>No Buyer Yet</Text>
      ) : !buyerData.name && !isLoading ? (
        <ActivityIndicator size="large" color={Colors.green} />
      ) : (
        <>
          <UserProfileBar userData={buyerData} showInfo={showInfo} />
          {!showInfo && (
            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              <CustomButton
                style={{ width: "40%" }}
                title="Accept"
                bgColor={Colors.secondary}
                color={Colors.white}
                onPress={onAccept}
              />
              <CustomButton
                style={{ width: "40%" }}
                title="Reject"
                bgColor={Colors.danger}
                color={Colors.white}
                onPress={onReject}
              />
            </View>
          )}
        </>
      )}
    </ViewBook>
  );
};
const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    marginVertical: 10,
    fontSize: 18,
  },
});

export default SellerViewBook;
