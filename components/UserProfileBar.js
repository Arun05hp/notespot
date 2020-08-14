import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

import baseUrl from "../api/baseUrl";
import Card from "./Card";
import Colors from "../constants/colors";
import defaultStyles from "../constants/styles";

const UserProfileBar = ({ userData, showInfo }) => {
  return (
    <Card style={styles.container}>
      <View style={styles.profile}>
        <Image
          style={defaultStyles.image}
          source={{
            uri: !userData.profileImg
              ? "https://img.icons8.com/ultraviolet/80/000000/user.png"
              : baseUrl + "/" + userData.profileImg,
          }}
        />
      </View>
      <View>
        <Text style={{ ...defaultStyles.title, color: Colors.primary }}>
          {userData.name}
        </Text>
        {showInfo && (
          <>
            <Text style={defaultStyles.sText}>{userData.mobileno}</Text>
            <Text style={defaultStyles.sText}>{userData.email}</Text>
          </>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 25,
    elevation: 1,
    flexDirection: "row",
    marginVertical: 15,
    padding: 10,
  },
  profile: {
    borderRadius: 25,
    backgroundColor: Colors.light,
    height: 50,
    marginRight: 15,
    overflow: "hidden",
    width: 50,
  },
});

export default UserProfileBar;
