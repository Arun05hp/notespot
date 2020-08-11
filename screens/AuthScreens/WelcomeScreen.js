import React, { useEffect, useContext } from "react";
import { View, StyleSheet } from "react-native";

import { Context as AuthContext } from "../../context/AuthContext";
import AppLogo from "../../components/AppLogo";
import CustomButton from "../../components/CustomButton";
import Colors from "../../constants/colors";

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
    <View style={styles.container}>
      <AppLogo style={styles.imgBg} />
      <CustomButton
        title="Get Started"
        bgColor={Colors.white}
        color={Colors.primary}
        onPress={() => navigation.navigate("Signin")}
      />
    </View>
  );
};

WelcomeScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: Colors.primary,
    flex: 1,
    justifyContent: "space-evenly",
    paddingTop: 40,
  },
  imgBg: {
    backgroundColor: Colors.white,
    borderRadius: 75,
  },
});

export default WelcomeScreen;
