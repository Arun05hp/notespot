import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

import AppTextInput from "../../components/AppTextInput";
import { Context as AuthContext } from "../../context/AuthContext";
import AppLogo from "../../components/AppLogo";
import CustomButton from "../../components/CustomButton";
import Colors from "../../constants/colors";
import ErrorMsgBox from "../../components/ErrorMsgBox";

import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

const SignInScreen = ({ navigation }) => {
  const { state, signin, clearMessage } = useContext(AuthContext);
  const { errorMessage, successMessage, isLoading } = state;

  const [secureText, setSecureText] = useState(true);

  return (
    <View style={styles.container}>
      <AppLogo style={{ alignSelf: "center" }} />
      <ErrorMsgBox
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={signin}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
          <>
            <AppTextInput
              errorMessage={touched.email ? errors.email : ""}
              keyboardType="email-address"
              leftIcon={<MaterialIcons style={styles.iconStyle} name="email" />}
              onBlur={() => setFieldTouched("email")}
              onChangeText={handleChange("email")}
              placeholder="Email"
              placeholderTextColor={Colors.placeholder}
            />
            <AppTextInput
              errorMessage={touched.password ? errors.password : ""}
              leftIcon={<MaterialIcons style={styles.iconStyle} name="lock" />}
              onBlur={() => setFieldTouched("password")}
              onChangeText={handleChange("password")}
              placeholder="Password"
              placeholderTextColor={Colors.placeholder}
              rightIcon={
                <FontAwesome5
                  name={secureText ? "eye-slash" : "eye"}
                  style={styles.iconStyle}
                  onPress={() => setSecureText((prevState) => !prevState)}
                  secureTextEntry={secureText}
                />
              }
            />
            <TouchableOpacity onPress={() => console.log("forget")}>
              <Text style={styles.forget}>Forget Password ?</Text>
            </TouchableOpacity>
            <CustomButton
              style={styles.btnWrapper}
              onPress={handleSubmit}
              bgColor={Colors.primary}
              color={Colors.white}
              title="Sign In"
              isLoading={isLoading}
            />
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => navigation.replace("Signup")}
            >
              <Text style={styles.newUser}>
                New User ?{" "}
                <Text style={{ color: Colors.primary }}>Sign Up</Text>
              </Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
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

SignInScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

export default SignInScreen;
