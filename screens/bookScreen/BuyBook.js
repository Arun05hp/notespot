import React, { useContext, useEffect } from "react";
import { View, Text, ActivityIndicator, Alert } from "react-native";

import Colors from "../../constants/colors";
import CustomButton from "../../components/CustomButton";
import { Context as BuyBookContext } from "../../context/BuySellBookContext";
import { Context as UserContext } from "../../context/UserContext";
import BookListing from "../../components/BookListing";

const BuyBook = ({ navigation }) => {
  const { state, getBooks } = useContext(BuyBookContext);
  const { state: user } = useContext(UserContext);
  const { id, mobileno } = user.userData;
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
    if (collegeName && mobileno) getBooks();
  }, []);

  if (!collegeName || (collegeName == null && !mobileno) || mobileno == null) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: "Roboto-bold",
            color: Colors.yellow,
          }}
        >
          Incomplete Profile and College Details
        </Text>
        <CustomButton
          title="Go To Profile"
          bgColor={Colors.yellow}
          onPress={() => navigation.navigate("Profile")}
        />
      </View>
    );
  }

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
