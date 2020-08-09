import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, CheckBox } from "react-native";

import { Context as UserContext } from "../../context/UserContext";

import { Input } from "react-native-elements";
import ErrorMsgBox from "../../components/ErrorMsgBox";
import TwoButtonRow from "../../components/TwoButtonRow";
import Colors from "../../constants/colors";

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
  const btnText = !collegeName ? "Save" : "Update";
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
      <Text style={styles.heading}>
        {!collegeName ? "Add" : "Edit"} College Details
      </Text>
      <View style={styles.Form}>
        <ErrorMsgBox
          errorMessage={errorMessage}
          successMessage={successMessage}
        />
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
          <Text style={{ ...styles.Title, color: Colors.primary }}>
            Are You Hosteller ? Yes
          </Text>
          <CheckBox
            value={uIsHosteller}
            onValueChange={() => {
              setuIsHosteller((prevState) => !prevState);
              if (uIsHosteller) {
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
        <TwoButtonRow
          firstBtnText="Back"
          onSubmit1st={() => {
            navigation.goBack();
          }}
          secBtnText={btnText}
          onSubmit2nd={() => update()}
          isloading={isUpdating}
        />
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
  label: {
    fontFamily: "Roboto-bold",
    color: Colors.primary,
    padding: 0,
  },
  Title: {
    color: Colors.white,
    fontFamily: "Roboto-bold",
    fontSize: 16,
  },
});

export default EditCollegeDetails;
