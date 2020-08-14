import React, { useContext, useEffect } from "react";
import { View, Text, ActivityIndicator, Alert } from "react-native";

import { Context as BuyBookContext } from "../../context/BuySellBookContext";
import { Context as UserContext } from "../../context/UserContext";
import BookListing from "../../components/BookListing";

const BuyBook = ({ navigation }) => {
  const { state, getBooks } = useContext(BuyBookContext);
  const { state: user } = useContext(UserContext);
  const { id } = user.userData;
  const bookListData = state.bookLists;
  const { collegeName } = user.collegeData;
  console.log(!collegeName);
  const filterBooks = bookListData.filter(
    (book) =>
      book.buyerId === null &&
      book.sellerId != id &&
      book.collegeName == collegeName
  );
  useEffect(() => {
    if (!collegeName || collegeName == null)
      Alert.alert(
        "Incomplete Profile and College Details",
        "Please Complete Your Profile and College Details First",
        [{ text: "ok", onPress: () => navigation.navigate("Profile") }]
      );
    else getBooks();
  }, []);

  if (bookListData.length <= 0) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }
  if (filterBooks.length <= 0) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 16 }}>No Books Available</Text>
      </View>
    );
  }

  return (
    <BookListing
      bookListData={filterBooks}
      onPress={(bookData) => navigation.navigate("BuyerViewBook", { bookData })}
    />
  );
};
export default BuyBook;
