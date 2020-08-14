import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import AppLogo from "./AppLogo";
import { AppForm, AppFormField, SubmitButton } from "./forms/index";
import ErrorMsgBox from "./ErrorMsgBox";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import Colors from "../constants/colors";
import defaultStyles from "../constants/styles";

const AuthForm = ({
  errorMessage,
  goTo,
  initialValues,
  isSignUpForm,
  isLoading,
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
            leftIcon={
              <FontAwesome5 style={defaultStyles.iconStyle} name="user-alt" />
            }
            name="name"
            placeholder="Full Name"
          />
        ) : null}
        <AppFormField
          keyboardType="email-address"
          leftIcon={
            <MaterialIcons style={defaultStyles.iconStyle} name="email" />
          }
          name="email"
          placeholder="Email"
        />
        <AppFormField
          secureTextEntry={secureText}
          leftIcon={
            <MaterialIcons style={defaultStyles.iconStyle} name="lock" />
          }
          name="password"
          placeholder="Password"
          rightIcon={
            <FontAwesome5
              name={secureText ? "eye-slash" : "eye"}
              style={defaultStyles.iconStyle}
              onPress={() => setSecureText((prevState) => !prevState)}
            />
          }
        />
        {isSignUpForm ? null : (
          <TouchableOpacity onPress={() => console.log("forget")}>
            <Text style={styles.forget}>Forget Password</Text>
          </TouchableOpacity>
        )}
        <SubmitButton
          style={styles.btnWrapper}
          title={submitButtonText}
          isLoading={isLoading}
        />
        <View style={defaultStyles.flexRowCenter}>
          {isSignUpForm ? (
            <>
              <Text style={styles.linkText}>Already Registered ? </Text>
              <TouchableOpacity activeOpacity={1} onPress={goTo}>
                <Text style={{ ...styles.linkText, color: Colors.primary }}>
                  Sign In
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.linkText}>New User ? </Text>
              <TouchableOpacity activeOpacity={1} onPress={goTo}>
                <Text style={{ ...styles.linkText, color: Colors.primary }}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
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
  forget: {
    textAlign: "right",
    color: Colors.primary,
    fontFamily: "Roboto-bold",
  },
  btnWrapper: {
    marginVertical: 15,
    alignSelf: "center",
  },
  linkText: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Roboto-bold",
  },
});

export default AuthForm;
