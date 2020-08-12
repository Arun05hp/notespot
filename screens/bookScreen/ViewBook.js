import React from "react";
import { View, Text, Image, StyleSheet, Alert } from "react-native";

import baseUrl from "../../api/baseUrl";
import CustomButton from "../../components/CustomButton";
import Card from "../../components/Card";
import Screen from "../../components/Screen";
import Colors from "../../constants/colors";

const ViewBook = ({ route, navigation }) => {
  const { bookData } = route.params;
  const uri = baseUrl + "/" + bookData.bookImgLink;
  const profileImg = "";

  const sendReq = () => {
    Alert.alert(
      "Request Send Successfully",
      "Check Your Book Status in Book Status Area",
      [{ text: "ok", onPress: () => navigation.navigate("Dashboard") }]
    );
  };

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
      <CustomButton
        style={{ alignSelf: "center" }}
        title="Contact Seller"
        bgColor={Colors.primary}
        color={Colors.white}
        onPress={sendReq}
      />
      {bookData.description ? (
        <>
          <Text style={{ ...styles.sTitle, color: Colors.primary }}>
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
