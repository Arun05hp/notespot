import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

import CardButton from "../../components/CardButton";

import Title from "../../components/Title";
import Colors from "../../constants/colors";

const pdfDashboard = ({ navigation }) => {
  return (
    <View>
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
    headerTitle: () => <Title title="PDF" />,
    headerStyle: {
      backgroundColor: Colors.primary,
    },
  };
};

const styles = StyleSheet.create({
  title: {},
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
