import React from "react";
import { Text, StyleSheet } from "react-native";
import Screen from "./Screen";
import CustomButton from "./CustomButton";
import Colors from "../constants/colors";
import defaultStyles from "../constants/styles";
const ProfileError = ({ onPress }) => {
  return (
    <Screen style={styles.container}>
      <Text style={{ ...defaultStyles.title, color: Colors.yellow }}>
        Incomplete Profile and College Details
      </Text>
      <CustomButton
        style={{ marginTop: 10 }}
        title="Go To Profile"
        bgColor={Colors.yellow}
        onPress={onPress}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
  },
});

export default ProfileError;
