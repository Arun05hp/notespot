import React from "react";
import { View, Text } from "react-native";

import Title from "../../components/Title";
import Colors from "../../constants/colors";

const bookList = () => {
  return (
    <View>
      <Text>book</Text>
    </View>
  );
};
bookList.navigationOptions = () => {
  return {
    headerTitle: () => <Title title="BOOK" />,
    headerStyle: {
      backgroundColor: Colors.primary,
    },
  };
};

export default bookList;
