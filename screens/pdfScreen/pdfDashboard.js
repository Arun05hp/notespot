import React from "react";
import { View, Text, StyleSheet } from "react-native";

const pdfDashboard = ({ navigation }) => {
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
};
pdfDashboard.navigationOptions = () => {
  return {
    headerTitle: "PDF",
  };
};

const styles = StyleSheet.create({});
export default pdfDashboard;
