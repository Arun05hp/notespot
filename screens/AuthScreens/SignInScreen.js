import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { Formik } from "formik";

import AppTextInput from "../../components/AppTextInput";
import { Context as AuthContext } from "../../context/AuthContext";
import AppLogo from "../../components/AppLogo";
import CustomButton from "../../components/CustomButton";
import Colors from "../../constants/colors";
import ErrorMsgBox from "../../components/ErrorMsgBox";

import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
const SignInScreen = ({ navigation }) => {
  const { state, signin, clearMessage } = useContext(AuthContext);
  const { errorMessage, successMessage, isLoading } = state;

  const [secureText, setSecureText] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.Form}>
        <AppLogo style={{ alignSelf: "center" }} />
        <ErrorMsgBox
          errorMessage={errorMessage}
          successMessage={successMessage}
        />

        <AppTextInput
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor={Colors.placeholder}
          leftIcon={<MaterialIcons style={styles.iconStyle} name="email" />}
        />
        <AppTextInput
          secureTextEntry={secureText}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor={Colors.placeholder}
          leftIcon={<MaterialIcons style={styles.iconStyle} name="lock" />}
          rightIcon={
            <FontAwesome5
              name={secureText ? "eye-slash" : "eye"}
              style={styles.iconStyle}
              onPress={() => setSecureText((prevState) => !prevState)}
            />
          }
        />

        <TouchableOpacity onPress={() => console.log("forget")}>
          <Text style={styles.forget}>Forget Password ?</Text>
        </TouchableOpacity>

        <CustomButton
          style={styles.btnWrapper}
          onPress={() => {
            Keyboard.dismiss();
            signin({ email, password });
          }}
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
            New User ? <Text style={{ color: Colors.primary }}>Sign Up</Text>
          </Text>
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
  Form: {
    width: "80%",
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
