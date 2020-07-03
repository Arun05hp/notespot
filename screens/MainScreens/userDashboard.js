import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Title from "../../components/Title";
import Colors from "../../constants/colors";

const userDashboard = () => {
  return (
    <View style={{ flex: 1 }}>
      <Text>H</Text>
    </View>
  );
};
userDashboard.navigationOptions = () => {
  return {
    headerTitle: () => <Title title="Dashboard" />,
    headerStyle: {
      backgroundColor: Colors.primary,
    },
  };
};

const styles = StyleSheet.create({});
export default userDashboard;
