import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { Context as AuthContext } from "../../context/AuthContext";
import Card from "../../components/Card";
import { AntDesign } from "@expo/vector-icons";

const UserProfile = () => {
  const { signout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <Card style={styles.card}>
        <TouchableOpacity onPress={signout}>
          <View style={styles.row}>
            <Text style={styles.text}>Sign Out</Text>
            <AntDesign name="logout" size={18} color="black" />
          </View>
        </TouchableOpacity>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontFamily: "Roboto-regular",
  },
});

UserProfile.navigationOptions = () => {
  return {
    headerTitle: "PROFILE",
  };
};
export default UserProfile;
