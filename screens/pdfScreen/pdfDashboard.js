import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

import HeaderComponent from "../../components/Header";
import CardButton from "../../components/CardButton";
const pdfDashboard = ({ navigation }) => {
  return (
    <View>
      <HeaderComponent navigation={navigation} />

      <View style={styles.ButtonContainer}>
        <CardButton style={styles.CardButton}>
          <Text style={{ ...styles.CardTitle, color: "red" }}>Upload Pdf</Text>
        </CardButton>
        <CardButton style={styles.CardButton}>
          <Text style={{ ...styles.CardTitle }}>View Pdf</Text>
        </CardButton>
        <CardButton style={styles.CardButton}>
          <Text style={{ ...styles.CardTitle }}>Your Upload</Text>
        </CardButton>
      </View>

      <View style={styles.ButtonContainer}>
        <View style={styles.ButtonWrapper}>
          <Button buttonStyle={styles.Button} title="Upload Pdf" />
        </View>
        <View style={styles.ButtonWrapper}>
          <Button buttonStyle={styles.Button} title="View Pdf" />
        </View>
      </View>
    </View>
  );
};
pdfDashboard.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  ButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
  CardButton: {
    width: 150,
    height: 150,
    margin: 10,
  },
  CardTitle: {
    fontSize: 18,
  },
  ButtonWrapper: {
    width: "50%",
    paddingHorizontal: 15,
  },
  Button: {
    fontSize: 18,
  },
});
export default pdfDashboard;
