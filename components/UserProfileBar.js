import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

import baseUrl from "../api/baseUrl";
import Card from "./Card";
import Colors from "../constants/colors";

const UserProfileBar = ({ profileImg, name }) => {
  return (
    <Card style={styles.container}>
      <View style={styles.profile}>
        <Image
          style={styles.image}
          source={{
            uri: !profileImg
              ? "https://img.icons8.com/ultraviolet/80/000000/user.png"
              : baseUrl + "/" + profileImg,
          }}
        />
      </View>
      <Text style={styles.mTitle}>{name}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    backgroundColor: Colors.white,
    marginVertical: 15,
    elevation: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.light,
    overflow: "hidden",
    margin: 10,
    marginRight: 15,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  mTitle: {
    fontSize: 18,
    fontFamily: "Roboto-bold",
    color: Colors.primary,
  },
});

export default UserProfileBar;
