import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Input } from "react-native-elements";
import { Button } from "react-native-elements";

import {
  MaterialIcons,
  Octicons,
  AntDesign,
  FontAwesome5,
} from "@expo/vector-icons";
import Colors from "../../constants/colors";

const SignUpScreen = ({ navigation }) => {
  const [secureText, setSecureText] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.imgWrapper}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.imgStyle}
          resizeMode="contain"
        />
      </View>
      <View style={styles.Form}>
        <Input
          textContentType="name"
          inputStyle={styles.Input}
          placeholder="Full Name"
          placeholderTextColor={Colors.placeholder}
          leftIcon={<AntDesign name="user" size={20} color={Colors.primary} />}
        />
        <Input
          textContentType="emailAddress"
          inputStyle={styles.Input}
          placeholder="Email Address"
          placeholderTextColor={Colors.placeholder}
          leftIcon={
            <MaterialIcons name="email" size={20} color={Colors.primary} />
          }
        />
        <Input
          textContentType="nickname"
          inputStyle={styles.Input}
          placeholder="User Name Eg: Abc@01"
          placeholderTextColor={Colors.placeholder}
          leftIcon={
            <FontAwesome5 name="user-tag" size={21} color={Colors.primary} />
          }
        />
        <Input
          secureTextEntry={secureText}
          textContentType="password"
          inputStyle={styles.Input}
          placeholder="Password"
          placeholderTextColor={Colors.placeholder}
          leftIcon={
            <MaterialIcons name="lock" size={20} color={Colors.primary} />
          }
          rightIcon={
            secureText ? (
              <Octicons
                name="eye-closed"
                size={22}
                color={Colors.primary}
                onPress={() => setSecureText(false)}
              />
            ) : (
              <Octicons
                name="eye"
                size={22}
                color={Colors.primary}
                onPress={() => setSecureText(true)}
              />
            )
          }
        />
        <View style={styles.btnWrapper}>
          <Button
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.btnTitle}
            title="Login"
          />
        </View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.navigate("Signin")}
        >
          <Text style={styles.newUser}>
            Already Registered ?
            <Text style={{ color: Colors.primary }}> Sign In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

SignUpScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imgWrapper: {
    width: 150,
    height: 150,
    padding: 20,
    overflow: "hidden",
  },
  imgStyle: {
    width: "100%",
    height: "100%",
  },
  Form: {
    width: "80%",
    marginVertical: 10,
    marginTop: 25,
  },
  Input: {
    fontSize: 16,
    paddingLeft: 5,
  },

  forget: {
    textAlign: "right",
    color: Colors.primary,
  },
  btnWrapper: {
    alignItems: "center",
    marginVertical: 15,
  },
  buttonStyle: {
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 30,
    backgroundColor: Colors.primary,
  },
  btnTitle: {
    color: Colors.white,
  },
  newUser: { textAlign: "center" },
});

export default SignUpScreen;
