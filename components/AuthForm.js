import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
} from "react-native";

import { Input } from "react-native-elements";

import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import Colors from "../constants/colors";

const AuthForm = ({
  isSignUpForm,
  errorMessage,
  successMessage,
  isLoading,
  submitButtonText,
  navigation,
  onSubmit,
}) => {
  const [secureText, setSecureText] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.imgWrapper}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.imgStyle}
          resizeMode="contain"
        />
      </View>
      <View style={styles.Form}>
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
        {isSignUpForm ? (
          <Input
            keyboardType="default"
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
        ) : null}
        <Input
          keyboardType="email-address"
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
          keyboardType="default"
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
        {isSignUpForm ? null : (
          <TouchableOpacity onPress={() => console.log("forget")}>
            <Text style={styles.forget}>Forget Password ?</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          activeOpacity={0.6}
          disabled={isLoading}
          onPress={() => {
            Keyboard.dismiss();
            isSignUpForm
              ? onSubmit({ name, email, password })
              : onSubmit({ email, password });
          }}
        >
          <View style={styles.btnWrapper}>
            <View style={styles.btnStyle}>
              {isLoading ? (
                <View style={{ marginRight: 5 }}>
                  <ActivityIndicator size="small" color="#ffffff" />
                </View>
              ) : null}
              <Text style={styles.btnTitle}>{submitButtonText}</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.replace(isSignUpForm ? "Signin" : "Signup")}
        >
          {isSignUpForm ? (
            <Text style={styles.newUser}>
              Already Registered ?
              <Text style={{ color: Colors.primary }}> Sign In</Text>
            </Text>
          ) : (
            <Text style={styles.newUser}>
              New User ? <Text style={{ color: Colors.primary }}>Sign Up</Text>
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
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
    width: "50%",
    alignSelf: "center",
  },
  btnStyle: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 30,
    backgroundColor: Colors.primary,
  },
  btnTitle: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: "Roboto-bold",
  },
  newUser: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Roboto-bold",
  },
  message: {
    fontSize: 14,
    textAlign: "center",
    padding: 5,
    marginBottom: 5,
    fontFamily: "Roboto-bold",
  },
  errorMessage: {
    color: "#721c24",
    backgroundColor: "#f8d7da",
    borderColor: "#f5c6cb",
  },
  successMessage: {
    color: "#155724",
    backgroundColor: "#d4edda",
    borderColor: "#c3e6cb",
  },
});

export default AuthForm;
