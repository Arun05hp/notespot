import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Title from "../../components/Title";
import Colors from "../../constants/colors";

const UserProfile = () => {
  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
};
UserProfile.navigationOptions = () => {
  return {
    headerTitle: () => <Title title="PROFILE" />,
    headerStyle: {
      backgroundColor: Colors.primary,
    },
  };
};
export default UserProfile;
