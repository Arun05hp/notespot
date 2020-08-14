import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

import baseUrl from "../api/baseUrl";
import Screen from "./Screen";
import Colors from "../constants/colors";
import defaultStyles from "../constants/styles";

const ViewBook = ({ bookData, children }) => {
  const uri = baseUrl + "/" + bookData.bookImgLink;

  return (
    <Screen style={{ padding: 20 }}>
      <View style={styles.imageContainer}>
        <Image
          style={defaultStyles.image}
          resizeMode="stretch"
          source={{ uri: uri }}
        />
      </View>
      <Text style={defaultStyles.heading}>{bookData.bookName}</Text>
      <Text style={styles.sTitle}>
        By {bookData.authorName} (Author) | {bookData.publisherName} (Publisher)
      </Text>
      <Text style={{ ...defaultStyles.title, color: Colors.primary }}>
        ₹ {bookData.price}
      </Text>
      {children}

      {bookData.description ? (
        <>
          <Text
            style={{
              ...defaultStyles.font_RB,
              color: Colors.primary,
              marginVertical: 10,
            }}
          >
            About Book
          </Text>
          <Text style={{ ...defaultStyles.sText, color: Colors.medium }}>
            {bookData.description}
          </Text>
        </>
      ) : null}
    </Screen>
  );
};
const styles = StyleSheet.create({
  imageContainer: {
    alignSelf: "center",
    borderRadius: 15,
    height: 150,
    marginBottom: 20,
    overflow: "hidden",
    width: 150,
  },
});
export default ViewBook;
