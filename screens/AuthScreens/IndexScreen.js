import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Button } from "react-native-elements";

const IndexScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imgWrapper}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.imgStyle}
          resizeMode="contain"
        />
      </View>
      <View style={styles.btnWrapper}>
        <Button
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.btnTitle}
          title="Get Started"
          onPress={() => navigation.replace("Signin")}
        />
      </View>
    </View>
  );
};

IndexScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0298c8",
    paddingTop: 40,
  },
  imgWrapper: {
    overflow: "hidden",
  },
  imgWrapper: {
    width: 150,
    height: 150,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 75,
  },
  imgStyle: {
    width: "100%",
    height: "100%",
  },
  btnWrapper: {
    marginTop: 120,
  },
  buttonStyle: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 30,
    backgroundColor: "white",
  },
  btnTitle: {
    color: "#0298c8",
  },
});

export default IndexScreen;
