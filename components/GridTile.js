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
        <View
          style={{
            ...styles.container,
            ...{ backgroundColor: itemData.item.backgroundColor },
          }}
        >
          {itemData.item.icon}
          <Text style={styles.title} numberOfLines={2}>
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
    borderRadius: 10,
    overflow: "hidden",
  },
  container: {
    flex: 1,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginTop: 10,
    fontFamily: "Roboto-bold",
    letterSpacing: 0.6,
    fontSize: 18,
  },
});
export default GridTitle;
