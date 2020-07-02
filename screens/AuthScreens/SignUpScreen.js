import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
const SignUpScreen = () => {
  return (
    <View>
      <Text>Hello SignUp</Text>
      <View style={styles.imgWrapper}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.imgStyle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SignUpScreen;
