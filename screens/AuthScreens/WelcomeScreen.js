import React, { useEffect, useContext } from "react";
import { View, StyleSheet, Image } from "react-native";

import { Context as AuthContext } from "../../context/AuthContext";
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
      <View style={styles.imgWrapper}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.imgStyle}
          resizeMode="contain"
        />
      </View>
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
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: Colors.primary,
    paddingTop: 40,
  },
  imgWrapper: {
    width: 150,
    height: 150,
    padding: 20,
    backgroundColor: Colors.white,
    borderRadius: 75,
    overflow: "hidden",
  },
  imgStyle: {
    width: "100%",
    height: "100%",
  },
});

export default WelcomeScreen;
