import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Input, Button } from "react-native-elements";
import { NavigationEvents } from "react-navigation";

import { Context as AuthContext } from "../../context/AuthContext";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import Colors from "../../constants/colors";

const SignInScreen = ({ navigation }) => {
  const [secureText, setSecureText] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { state, signin, clearMessage } = useContext(AuthContext);
  const { errorMessage, successMessage } = state;

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={clearMessage} />
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
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
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
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoCorrect={false}
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
        {errorMessage ? (
          <Text style={{ ...styles.message, ...styles.errorMessage }}>
            {errorMessage}
          </Text>
        ) : null}
        {successMessage ? (
          <Text style={{ ...styles.message, ...styles.successMessage }}>
            {successMessage}
          </Text>
        ) : null}
        <TouchableOpacity onPress={() => console.log("forget")}>
          <Text style={styles.forget}>Forget Password ?</Text>
        </TouchableOpacity>
        <View style={styles.btnWrapper}>
          <Button
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.btnTitle}
            title="Sign in"
            onPress={() => signin({ email, password })}
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
  message: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Roboto-bold",
    marginBottom: 5,
  },
  errorMessage: {
    color: "red",
  },
  successMessage: {
    color: "green",
  },
});

export default SignInScreen;
