import React from "react";
import { View, Text } from "react-native";
import HeaderComponent from "../../components/Header";
const pdfList = ({ navigation }) => {
  return (
    <View>
      <HeaderComponent navigation={navigation} />
      <Text> pdf</Text>
    </View>
  );
};
pdfList.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

export default pdfList;
