import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableNativeFeedback,
} from "react-native";

import Card from "../components/Card";

const GridTile = ({ itemData, onClick }) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <Card style={styles.container}>
      <TouchableCmp onPress={onClick}>
        <View style={styles.innerContainer}>
          {itemData.item.icon}
          <Text
            style={{ ...styles.title, ...{ color: itemData.item.color } }}
            numberOfLines={2}
          >
            {itemData.item.title}
          </Text>
        </View>
      </TouchableCmp>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
    height: 150,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginTop: 10,
    fontFamily: "Roboto-bold",
    letterSpacing: 0.6,
    fontSize: 18,
  },
});
export default GridTile;
