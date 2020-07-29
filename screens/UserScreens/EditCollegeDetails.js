import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
  CheckBox,
} from "react-native";

import { Context as UserContext } from "../../context/UserContext";
import { Input } from "react-native-elements";
import Colors from "../../constants/colors";

import { NavigationEvents } from "react-navigation";

const EditCollegeDetails = ({ navigation }) => {
  const {
    state,
    clearMessage,
    updateCollegeDetails,
    getCollegeDetails,
  } = useContext(UserContext);
  const { errorMessage, successMessage, isUpdating } = state;
  const userid = state.userData.id;
  const {
    branch,
    collegeName,
    hostelAddress,
    isHosteller,
    regNo,
  } = state.collegeData;
  const [uCollegeName, setuCollegeName] = useState(
    collegeName ? collegeName : ""
  );
  const [uRegNo, setuRegNo] = useState(regNo ? regNo : "");
  const [uBranch, setuBranch] = useState(branch ? branch : "");
  const [uHostelAddress, setuHostelAddress] = useState(
    hostelAddress ? hostelAddress : ""
  );
  let value = false;
  if (isHosteller) {
    isHosteller == "true" ? (value = true) : value;
  }

  const [uIsHosteller, setuIsHosteller] = useState(value);
  console.log("hosteler", uIsHosteller);
  console.log("address", uHostelAddress);

  const update = async () => {
    const hosteller = uIsHosteller ? "true" : "false";
    await updateCollegeDetails({
      userId: userid,
      collegeName: uCollegeName,
      regNo: uRegNo,
      branch: uBranch,
      isHosteller: hosteller,
      hostelAddress: uHostelAddress,
    });
    getCollegeDetails();
  };

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={clearMessage} />
      <Text style={styles.heading}>Your College Details</Text>
      <View style={styles.Form}>
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
        <Input
          keyboardType="default"
          inputStyle={styles.Input}
          value={uCollegeName}
          onChangeText={setuCollegeName}
          label="College Name"
          labelStyle={styles.label}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          keyboardType="default"
          inputStyle={styles.Input}
          value={uRegNo}
          onChangeText={setuRegNo}
          label="Roll No. / Reg. No."
          labelStyle={styles.label}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          keyboardType="default"
          inputStyle={styles.Input}
          value={uBranch}
          onChangeText={setuBranch}
          label="Branch"
          labelStyle={styles.label}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 5,
          }}
        >
          <Text style={styles.text}>Are You Hosteller ? Yes</Text>
          <CheckBox
            value={uIsHosteller}
            onValueChange={() => {
              setuIsHosteller((prevState) => !prevState);
              if (uIsHosteller) {
                console.log("log", uIsHosteller);
                setuHostelAddress("");
              }
            }}
            style={styles.checkbox}
          />
        </View>

        {uIsHosteller && (
          <Input
            keyboardType="default"
            inputStyle={styles.Input}
            value={uHostelAddress}
            onChangeText={setuHostelAddress}
            label="Hostel Address"
            labelStyle={styles.label}
            autoCapitalize="none"
            autoCorrect={false}
            multiline={true}
            numberOfLines={2}
          />
        )}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.6}
            disabled={isUpdating}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <View style={styles.btnWrapper}>
              <View style={styles.btnStyle}>
                <Text style={styles.btnTitle}>Back</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            disabled={isUpdating}
            onPress={() => {
              Keyboard.dismiss();
              update();
            }}
          >
            <View style={styles.btnWrapper}>
              <View style={styles.btnStyle}>
                {isUpdating ? (
                  <View style={{ marginRight: 5 }}>
                    <ActivityIndicator size="small" color="#ffffff" />
                  </View>
                ) : null}
                <Text style={styles.btnTitle}>Update</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 20,
    fontFamily: "Roboto-bold",
    color: Colors.primary,
    marginBottom: 15,
  },
  Form: {
    width: "80%",
    marginVertical: 10,
  },
  Input: {
    fontSize: 16,
    paddingLeft: 5,
  },
  text: {
    fontSize: 16,
    color: Colors.primary,
    fontFamily: "Roboto-bold",
  },
  label: {
    fontFamily: "Roboto-bold",
    color: Colors.primary,
    padding: 0,
  },
  btnWrapper: {
    alignItems: "center",
    marginVertical: 15,
    width: "80%",
    alignSelf: "center",
  },
  btnStyle: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 30,
    backgroundColor: Colors.primary,
  },
  btnTitle: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: "Roboto-bold",
  },
  newUser: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Roboto-bold",
  },
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

export default EditCollegeDetails;
