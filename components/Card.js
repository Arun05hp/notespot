import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "react-native-elements";
const CardComponent = ({ children, style }) => {
  return (
    <Card containerStyle={{ ...styles.CardContainer, ...style }}>
      {children}
    </Card>
  );
};

const styles = StyleSheet.create({
  CardContainer: {
    borderRadius: 10,
  },
});
export default CardComponent;
