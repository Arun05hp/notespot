import React from "react";
import { View, Text } from "react-native";

const bookList = () => {
  return (
    <View>
      <Text>book</Text>
    </View>
  );
};
bookList.navigationOptions = () => {
  return {
    headerTitle: "BOOK",
  };
};

export default bookList;
