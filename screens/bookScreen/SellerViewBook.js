import React, { useEffect, useState } from "react";
import { View, Text, Alert, ActivityIndicator, StyleSheet } from "react-native";

import appApi from "../../api/appApi";
import ViewBook from "../../components/ViewBook";
import CustomButton from "../../components/CustomButton";
import Colors from "../../constants/colors";
import UserProfileBar from "../../components/UserProfileBar";

const SellerViewBook = ({ route, navigation }) => {
  const [buyerData, setBuyerData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { bookData } = route.params;
  const { buyerId } = bookData;

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

  useEffect(() => {
    const res = getBuyerInfo(buyerId);
    if (res) setIsLoading(false);
    else
      Alert.alert("Error", "Faild to get Buyer Information", [
        { text: "ok", onPress: () => navigation.goBack() },
      ]);
  }, [buyerId]);

  const getBuyerInfo = async (userId) => {
    try {
      const response = await appApi.post("/user/profile", { userId });
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
          <UserProfileBar
            name={buyerData.name}
            profileImg={buyerData.profileImg}
          />
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
