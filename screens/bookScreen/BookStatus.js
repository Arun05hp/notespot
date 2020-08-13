import React, { useContext, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";

import { Context as BuyBookContext } from "../../context/BuySellBookContext";
import { Context as UserContext } from "../../context/UserContext";
import BookListing from "../../components/BookListing";

const BookStatus = ({ navigation }) => {
  const { state, getBooks } = useContext(BuyBookContext);
  const { state: user } = useContext(UserContext);
  const { id } = user.userData;
  const bookListData = state.bookLists;
  const filterBooks = bookListData.filter((book) => book.buyerId == id);

  useEffect(() => {
    getBooks();
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
        <Text style={{ fontSize: 16 }}>No Books </Text>
      </View>
    );
  }

  return (
    <BookListing
      bookListData={filterBooks}
      onPress={(bookData) =>
        navigation.navigate("ViewBookStatus", { bookData })
      }
    />
  );
};
export default BookStatus;