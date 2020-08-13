import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

import baseUrl from "../api/baseUrl";
import Card from "./Card";
import Colors from "../constants/colors";
import colors from "../constants/colors";

const UserProfileBar = ({ userData, showInfo }) => {
  return (
    <Card style={styles.container}>
      <View style={styles.profile}>
        <Image
          style={styles.image}
          source={{
            uri: !userData.profileImg
              ? "https://img.icons8.com/ultraviolet/80/000000/user.png"
              : baseUrl + "/" + userData.profileImg,
          }}
        />
      </View>
      <View>
        <Text style={styles.mTitle}>{userData.name}</Text>
        {showInfo && (
          <>
            <Text style={styles.sTitle}>{userData.mobileno}</Text>
            <Text style={styles.sTitle}>{userData.email}</Text>
          </>
        )}
      </View>
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
    padding: 10,
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.light,
    overflow: "hidden",
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
  sTitle: {
    fontSize: 16,
    fontFamily: "Roboto-bold",
    color: colors.medium,
  },
});

export default UserProfileBar;
