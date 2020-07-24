import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Input, Button } from "react-native-elements";

import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import Colors from "../../constants/colors";

const SignInScreen = ({ navigation }) => {
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
          inputStyle={styles.Input}
          placeholder="Email Address or UserName"
          autoCapitalize="none"
          autoFocus={true}
          placeholderTextColor={Colors.placeholder}
          leftIcon={
            <MaterialIcons name="email" size={20} color={Colors.primary} />
          }
        />
        <Input
          secureTextEntry={secureText}
          inputStyle={styles.Input}
          placeholder="Password"
          placeholderTextColor={Colors.placeholder}
          leftIcon={
            <MaterialIcons name="lock" size={20} color={Colors.primary} />
          }
          rightIcon={
            <FontAwesome5
              name={secureText ? "eye-slash" : "eye"}
              size={22}
              color={Colors.primary}
              onPress={() => setSecureText((prevState) => !prevState)}
            />
          }
        />
        <TouchableOpacity onPress={() => console.log("forget")}>
          <Text style={styles.forget}>Forget Password ?</Text>
        </TouchableOpacity>
        <View style={styles.btnWrapper}>
          <Button
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.btnTitle}
            title="Sign in"
            onPress={() => navigation.navigate("Dashboard")}
          />
        </View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.replace("Signup")}
        >
          <Text style={styles.newUser}>
            New User ? <Text style={{ color: Colors.primary }}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

SignInScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Roboto-regular",
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
    fontFamily: "Roboto-bold",
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
    fontFamily: "Roboto-bold",
  },
  newUser: { textAlign: "center", fontFamily: "Roboto-bold" },
});

export default SignInScreen;
