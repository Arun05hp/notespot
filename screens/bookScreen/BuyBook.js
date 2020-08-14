import React, { useContext, useEffect } from "react";
import { View, Text, ActivityIndicator, Alert } from "react-native";

import { Context as BuyBookContext } from "../../context/BuySellBookContext";
import { Context as UserContext } from "../../context/UserContext";
import BookListing from "../../components/BookListing";
import defaultStyles from "../../constants/styles";
import ProfileError from "../../components/ProfileError";

const BuyBook = ({ navigation }) => {
  const { state, getBooks } = useContext(BuyBookContext);
  const { state: user } = useContext(UserContext);
  const { id, mobileno } = user.userData;
  const bookListData = state.bookLists;
  const { collegeName } = user.collegeData;

  const filterBooks = bookListData.filter(
    (book) =>
      book.buyerId === null &&
      book.sellerId != id &&
      book.collegeName == collegeName
  );
  useEffect(() => {
    if (collegeName && mobileno) getBooks();
  }, []);

  if (collegeName == undefined || mobileno == null) {
    return <ProfileError onPress={() => navigation.navigate("Profile")} />;
  }

  if (bookListData.length <= 0) {
    return (
      <View style={defaultStyles.flex_1_center}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }
  if (filterBooks.length <= 0) {
    return (
      <View style={defaultStyles.flex_1_center}>
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
