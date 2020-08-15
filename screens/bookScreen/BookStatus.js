import React, { useContext, useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";

import { Context as BuyBookContext } from "../../context/BuySellBookContext";
import { Context as UserContext } from "../../context/UserContext";
import defaultStyles from "../../constants/styles";
import BookListing from "../../components/BookListing";

const BookStatus = ({ navigation }) => {
  const { state, getBooks } = useContext(BuyBookContext);
  const { state: user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = user.userData;
  const bookListData = state.bookLists;
  let filterBooks = [];

  if (bookListData > 0) {
    filterBooks = bookListData.filter((book) => book.buyerId == id);
  }

  const getBooksData = async () => {
    const res = await getBooks();
    if (res) {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getBooksData();
  }, []);

  if (isLoading) {
    return (
      <View style={defaultStyles.flex_1_center}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  if (filterBooks.length <= 0 || bookListData.length <= 0) {
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
