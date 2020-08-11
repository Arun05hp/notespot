import React, { useEffect, useContext } from "react";
import { StyleSheet } from "react-native";

import { Context as AuthContext } from "../../context/AuthContext";
import AppLogo from "../../components/AppLogo";
import CustomButton from "../../components/CustomButton";
import Colors from "../../constants/colors";
import Screen from "../../components/Screen";

const WelcomeScreen = ({ navigation }) => {
  const { tryLocalSignin } = useContext(AuthContext);

  const getToken = async () => {
    const isToken = await tryLocalSignin();
    if (isToken) {
      navigation.replace("Main");
    }
  };

  useEffect(() => {
    getToken();
  }, []);
  return (
    <Screen style={styles.container}>
      <AppLogo style={styles.imgBg} />
      <CustomButton
        title="Get Started"
        bgColor={Colors.white}
        color={Colors.primary}
        onPress={() => navigation.navigate("Signin")}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: Colors.primary,
    justifyContent: "space-evenly",
    padding: 20,
    width: "100%",
  },
  imgBg: {
    backgroundColor: Colors.white,
    borderRadius: 75,
  },
});

export default WelcomeScreen;
