import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import Colors from "../constants/colors";

const TwoButtonRow = ({
  firstBtnText,
  secBtnText,
  onSubmit1st,
  onSubmit2nd,
  isloading,
}) => {
  return (
    <View style={{ ...styles.row, justifyContent: "space-evenly" }}>
      <TouchableOpacity
        style={styles.width50}
        activeOpacity={0.6}
        onPress={onSubmit1st}
      >
        <View style={styles.btnStyle}>
          <Text style={styles.Title}>{firstBtnText}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.width50}
        activeOpacity={0.6}
        disabled={isloading}
        onPress={() => {
          Keyboard.dismiss();
          onSubmit2nd();
        }}
      >
        <View
          style={{
            ...styles.btnStyle,
            ...styles.row,
            justifyContent: "center",
          }}
        >
          {isloading && (
            <View style={{ marginRight: 5 }}>
              <ActivityIndicator size="small" color="#ffffff" />
            </View>
          )}
          <Text style={styles.Title}>{secBtnText}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  width50: {
    width: "50%",
  },
  btnStyle: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    margin: 10,
  },
  Title: {
    color: Colors.white,
    fontFamily: "Roboto-bold",
    fontSize: 16,
    textAlign: "center",
  },
});

export default TwoButtonRow;
