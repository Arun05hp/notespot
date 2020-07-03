import React from "react";
import { View, Text } from "react-native";
import HeaderComponent from "../../components/Header";
const bookList = ({ navigation }) => {
  return (
    <View>
      <HeaderComponent navigation={navigation} />
      <Text>book</Text>
    </View>
  );
};
bookList.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

export default bookList;
