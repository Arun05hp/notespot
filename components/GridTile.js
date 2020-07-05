import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableNativeFeedback,
} from "react-native";

const GridTitle = ({ itemData }) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <View style={styles.gridItem}>
      <TouchableCmp style={{ flex: 1 }}>
        <View style={styles.container}>
          {itemData.item.icon}
          <Text
            style={{ ...styles.title, ...{ color: itemData.item.color } }}
            numberOfLines={2}
          >
            {itemData.item.title}
          </Text>
        </View>
      </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
    overflow: "hidden",
  },
  container: {
    flex: 1,
    borderRadius: 15,
    margin: 2,
    borderRadius: 20,
    borderWidth: 5,
    borderColor: "white",
    backgroundColor: "#F5F3F3",
    shadowColor: "rgba(0, 0, 0, 0.7)",
    elevation: 5,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  title: {
    marginTop: 10,
    fontFamily: "Roboto-bold",
    letterSpacing: 0.6,
    fontSize: 18,
  },
});
export default GridTitle;
