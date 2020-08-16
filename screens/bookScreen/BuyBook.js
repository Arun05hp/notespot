import React, { useContext, useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";

import { Context as BuyBookContext } from "../../context/BuySellBookContext";
import { Context as UserContext } from "../../context/UserContext";
import BookListing from "../../components/BookListing";
import defaultStyles from "../../constants/styles";
import ProfileError from "../../components/ProfileError";

const BuyBook = ({ navigation }) => {
  const { state, getBooks } = useContext(BuyBookContext);
  const { state: user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const { id, mobileno } = user.userData;
  const bookListData = state.bookLists;
  const { collegeName } = user.collegeData;
  let filterBooks = [];
  if (bookListData.length > 0) {
    filterBooks = bookListData.filter(
      (book) =>
        book.buyerId === null &&
        book.sellerId != id &&
        book.collegeName == collegeName
    );
  }

  const getBooksData = async () => {
    const res = await getBooks();
    if (res) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (collegeName && mobileno) getBooksData();
    else setIsLoading(false);
  }, []);

  if (collegeName == undefined || mobileno == null) {
    return <ProfileError onPress={() => navigation.navigate("Profile")} />;
  }

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
