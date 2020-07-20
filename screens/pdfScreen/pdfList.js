import React from "react";
import { View, Text } from "react-native";

const pdfList = () => {
  return (
    <View>
      <Text> pdf</Text>
    </View>
  );
};
pdfList.navigationOptions = () => {
  return {
    headerTitle: "PDF LIST",
  };
};

export default pdfList;
