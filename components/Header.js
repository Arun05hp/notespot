import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Header, Text } from "react-native-elements";
import { Feather } from "@expo/vector-icons";
import Colors from "../constants/colors";

const Title = () => {
  return <Text style={styles.title}>NoteSpot</Text>;
};

const HeaderComponent = ({ navigation }) => {
  return (
    <Header
      backgroundColor={Colors.primary}
      placement="left"
      leftComponent={
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Feather name="menu" size={30} color={Colors.white} />
        </TouchableOpacity>
      }
      centerComponent={<Title />}
    />
  );
};
const styles = StyleSheet.create({
  title: {
    color: Colors.white,
    fontSize: 28,
  },
});

export default HeaderComponent;
