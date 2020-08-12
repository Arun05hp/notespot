import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

import baseUrl from "../api/baseUrl";
import CustomButton from "./CustomButton";
import Card from "./Card";
import Screen from "./Screen";
import Colors from "../constants/colors";

const ViewBook = ({ bookData, isSellerBook, onAccept, sendReq, onReject }) => {
  const uri = baseUrl + "/" + bookData.bookImgLink;
  const profileImg = "";
  let buyerButtonText = "Contact Seller";
  let buyerButtonBg = Colors.primary;
  let disabled = false;
  console.log(bookData);
  if (bookData.sellerId) {
    if (!bookData.sellerStatus && !bookData.buyerStatus) {
      buyerButtonText = "Requested";
      buyerButtonBg = Colors.yellow;
      disabled = true;
    } else if (bookData.sellerStatus != null && !bookData.buyerStatus) {
      buyerButtonText = "Accepted";
      disabled = true;
      buyerButtonBg = Colors.secondary;
    } else {
      buyerButtonText = "Purchased";
      disabled = true;
      buyerButtonBg = Colors.secondary;
    }
  }

  return (
    <Screen style={{ padding: 20 }}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          resizeMode="stretch"
          source={{ uri: uri }}
        />
      </View>
      <Text style={styles.title}>{bookData.bookName}</Text>
      <Text style={styles.sTitle}>
        By {bookData.authorName} (Author) | {bookData.publisherName} (Publisher)
      </Text>
      <Text style={styles.mTitle}>₹ {bookData.price}</Text>
      <Card style={styles.sellerInfo}>
        <View style={styles.profile}>
          <Image
            style={styles.image}
            source={{
              uri: !profileImg
                ? "https://img.icons8.com/ultraviolet/80/000000/user.png"
                : baseUrl + "/" + profileImg,
            }}
          />
        </View>
        <Text style={styles.mTitle}>Arun Kumar </Text>
      </Card>
      {isSellerBook ? (
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
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
      ) : (
        <CustomButton
          isDisabled={disabled}
          style={{ alignSelf: "center" }}
          title={buyerButtonText}
          bgColor={buyerButtonBg}
          color={Colors.white}
          onPress={sendReq}
        />
      )}
      {bookData.description ? (
        <>
          <Text
            style={{ ...styles.sTitle, color: Colors.primary, marginTop: 15 }}
          >
            About Book
          </Text>
          <Text style={styles.sTitle}>{bookData.description}</Text>
        </>
      ) : null}
    </Screen>
  );
};
const styles = StyleSheet.create({
  imageContainer: {
    alignSelf: "center",
    height: 150,
    borderRadius: 15,
    overflow: "hidden",
    width: 150,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  sellerInfo: {
    borderRadius: 25,
    backgroundColor: Colors.white,
    marginVertical: 20,
    elevation: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.light,
    overflow: "hidden",
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: "Roboto-bold",
    color: Colors.primary,
  },
  mTitle: {
    fontSize: 18,
    fontFamily: "Roboto-bold",
    color: Colors.primary,
  },
  sTitle: {
    fontSize: 14,
    fontFamily: "Roboto-bold",
    color: Colors.medium,
    marginVertical: 5,
  },
});
export default ViewBook;
