import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import AppLogo from "./AppLogo";
import { AppForm, AppFormField, SubmitButton } from "./forms/index";
import ErrorMsgBox from "./ErrorMsgBox";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import Colors from "../constants/colors";

const AuthForm = ({
  errorMessage,
  initialValues,
  isSignUpForm,
  isLoading,
  navigation,
  onSubmit,
  successMessage,
  submitButtonText,
  validationSchema,
}) => {
  const [secureText, setSecureText] = useState(true);

  return (
    <View style={styles.container}>
      <AppLogo style={{ alignSelf: "center" }} />
      <ErrorMsgBox
        errorMessage={errorMessage}
        successMessage={successMessage}
      />

      <AppForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {isSignUpForm ? (
          <AppFormField
            leftIcon={<FontAwesome5 style={styles.iconStyle} name="user-alt" />}
            name="name"
            placeholder="Full Name"
            placeholderTextColor={Colors.placeholder}
          />
        ) : null}
        <AppFormField
          keyboardType="email-address"
          leftIcon={<MaterialIcons style={styles.iconStyle} name="email" />}
          name="email"
          placeholder="Email"
          placeholderTextColor={Colors.placeholder}
        />
        <AppFormField
          secureTextEntry={secureText}
          leftIcon={<MaterialIcons style={styles.iconStyle} name="lock" />}
          name="password"
          placeholder="Password"
          placeholderTextColor={Colors.placeholder}
          rightIcon={
            <FontAwesome5
              name={secureText ? "eye-slash" : "eye"}
              style={styles.iconStyle}
              onPress={() => setSecureText((prevState) => !prevState)}
            />
          }
        />
        {isSignUpForm ? null : (
          <TouchableOpacity onPress={() => console.log("forget")}>
            <Text style={styles.forget}>Forget Password ?</Text>
          </TouchableOpacity>
        )}
        <SubmitButton
          style={styles.btnWrapper}
          title={submitButtonText}
          isLoading={isLoading}
        />
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
      </AppForm>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  iconStyle: {
    fontSize: 20,
    color: Colors.primary,
  },
  forget: {
    textAlign: "right",
    color: Colors.primary,
    fontFamily: "Roboto-bold",
  },
  btnWrapper: {
    marginVertical: 15,
    alignSelf: "center",
  },
  newUser: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Roboto-bold",
  },
});

export default AuthForm;
