import React from "react";
import { View, Text } from "react-native";

const BookList = () => {
  return (
    <View>
      <Text>book</Text>
    </View>
  );
};
BookList.navigationOptions = () => {
  return {
    headerTitle: "BOOK",
  };
};

export default BookList;
