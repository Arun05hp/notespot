import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Input, Button } from "react-native-elements";
import { NavigationEvents } from "react-navigation";

import { Context as AuthContext } from "../../context/AuthContext";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import Colors from "../../constants/colors";

const SignUpScreen = ({ navigation }) => {
  const [secureText, setSecureText] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { state, signup, clearErrorMessage } = useContext(AuthContext);
  const errorMessage = state.errorMessage;

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={clearErrorMessage} />
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
          value={name}
          onChangeText={setName}
          placeholder="Full Name"
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor={Colors.placeholder}
          leftIcon={
            <FontAwesome5 name="user-alt" size={20} color={Colors.primary} />
          }
        />
        <Input
          textContentType="emailAddress"
          inputStyle={styles.Input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email Address"
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor={Colors.placeholder}
          leftIcon={
            <MaterialIcons name="email" size={20} color={Colors.primary} />
          }
        />
        <Input
          secureTextEntry={secureText}
          textContentType="password"
          inputStyle={styles.Input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
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
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}
        <View style={styles.btnWrapper}>
          <Button
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.btnTitle}
            title="Sign up"
            onPress={() => {
              signup({ name, email, password });
            }}
          />
        </View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.replace("Signin")}
        >
          <Text style={styles.newUser}>
            Already Registered ?
            <Text style={{ color: Colors.primary }}> Sign in</Text>
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
  errorMessage: {
    fontSize: 14,
    color: "red",
    textAlign: "center",
  },
});

export default SignUpScreen;
