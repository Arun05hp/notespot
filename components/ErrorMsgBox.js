import React from "react";
import { Text, View, StyleSheet } from "react-native";

const ErrorMsgBox = ({ errorMessage, successMessage }) => {
  return (
    <View>
      {errorMessage ? (
        <Text style={{ ...styles.message, ...styles.errorMessage }}>
          {errorMessage}
        </Text>
      ) : null}
      {successMessage ? (
        <Text style={{ ...styles.message, ...styles.successMessage }}>
          {successMessage}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  message: {
    fontSize: 14,
    textAlign: "center",
    padding: 5,
    marginBottom: 5,
    fontFamily: "Roboto-bold",
  },
  errorMessage: {
    color: "#721c24",
    backgroundColor: "#f8d7da",
    borderColor: "#f5c6cb",
  },
  successMessage: {
    color: "#155724",
    backgroundColor: "#d4edda",
    borderColor: "#c3e6cb",
  },
});

export default ErrorMsgBox;
