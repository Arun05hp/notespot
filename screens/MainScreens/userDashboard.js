import React from "react";
import { View, Text, StyleSheet } from "react-native";

import HeaderComponent from "../../components/Header";

const userDashboard = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <HeaderComponent navigation={navigation} />
      <Text>H</Text>
    </View>
  );
};

export default userDashboard;
