import React from "react";
import { View, Text, StyleSheet } from "react-native";

const UserProfile = () => {
  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
};
UserProfile.navigationOptions = () => {
  return {
    headerTitle: "PROFILE",
  };
};
export default UserProfile;
