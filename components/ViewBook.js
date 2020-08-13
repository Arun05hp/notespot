import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

import baseUrl from "../api/baseUrl";
import Screen from "./Screen";
import Colors from "../constants/colors";

const ViewBook = ({ bookData, children }) => {
  const uri = baseUrl + "/" + bookData.bookImgLink;

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
      {children}

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
