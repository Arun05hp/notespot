import React, { useContext, useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";

import { Context as UserContext } from "../../context/UserContext";
import { Context as BuyBookContext } from "../../context/BuySellBookContext";
import BookListing from "../../components/BookListing";
import defaultStyles from "../../constants/styles";

const UploadedBook = ({ navigation }) => {
  const { state, getBooks } = useContext(BuyBookContext);
  const { state: user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = user.userData;
  const bookListData = state.bookLists;

  let filterBooks = [];

  if (bookListData.length > 0) {
    filterBooks = bookListData.filter((book) => book.sellerId == id);
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
      <View style={defaultStyles.flex_1_center}>
        <Text style={defaultStyles.subTitle}>No Books For Selling </Text>
        <Text style={defaultStyles.subTitle}>First Sell Some Books </Text>
      </View>
    );
  }

  return (
    <BookListing
      bookListData={filterBooks}
      onPress={(bookData) =>
        navigation.navigate("SellerViewBook", { bookData })
      }
    />
  );
};
export default UploadedBook;
