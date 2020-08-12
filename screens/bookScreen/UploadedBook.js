import React, { useContext, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";

import { Context as BuyBookContext } from "../../context/BuySellBookContext";
import BookListing from "../../components/BookListing";

const UploadedBook = ({ navigation }) => {
  const { state, getBooks } = useContext(BuyBookContext);
  const bookListData = state.bookLists;

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

  return <BookListing bookListData={bookListData} navigation={navigation} />;
};
export default UploadedBook;
