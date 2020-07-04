import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Colors from "../../constants/colors";

const pdfDashboard = ({ navigation }) => {
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
};
pdfDashboard.navigationOptions = () => {
  return {
    headerTitle: () => <Title title="PDF" />,
    headerStyle: {
      backgroundColor: Colors.primary,
    },
  };
};

const styles = StyleSheet.create({});
export default pdfDashboard;
