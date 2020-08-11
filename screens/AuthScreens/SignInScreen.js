import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import * as Yup from "yup";

import AppForm from "../../components/AppForm";
import AppFormField from "../../components/AppFormField";
import { Context as AuthContext } from "../../context/AuthContext";
import AppLogo from "../../components/AppLogo";
import SubmitButton from "../../components/SubmitButton";
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
      <AppForm
        initialValues={{ email: "", password: "" }}
        onSubmit={signin}
        validationSchema={validationSchema}
      >
        <AppFormField
          keyboardType="email-address"
          leftIcon={<MaterialIcons style={styles.iconStyle} name="email" />}
          name="email"
          placeholder="Email"
          placeholderTextColor={Colors.placeholder}
        />
        <AppFormField
          leftIcon={<MaterialIcons style={styles.iconStyle} name="lock" />}
          name="password"
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
        <SubmitButton
          style={styles.btnWrapper}
          title="Sign In"
          isLoading={isLoading}
        />
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.replace("Signup")}
        >
          <Text style={styles.newUser}>
            New User ? <Text style={{ color: Colors.primary }}>Sign Up</Text>
          </Text>
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

SignInScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

export default SignInScreen;
