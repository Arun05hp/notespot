import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, CheckBox } from "react-native";
import * as Yup from "yup";
import { Context as UserContext } from "../../context/UserContext";

import {
  AppForm,
  AppFormField,
  SubmitButton,
} from "../../components/forms/index";
import Screen from "../../components/Screen";
import ErrorMsgBox from "../../components/ErrorMsgBox";
import Colors from "../../constants/colors";

const validationSchema = Yup.object().shape({
  collegeName: Yup.string().required().label("College Name"),
  regNo: Yup.string().required().label("Reg. No."),
  branch: Yup.string().required().label("Branch Name"),
  hostelAddress: Yup.string().nullable().label("Address"),
});

const EditCollegeDetails = () => {
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

  const [uHostelAddress, setuHostelAddress] = useState(hostelAddress);

  let value = false;
  if (isHosteller) {
    isHosteller == "true" ? (value = true) : value;
  }

  const [uIsHosteller, setuIsHosteller] = useState(value);

  const onUpdate = async (values) => {
    const hosteller = uIsHosteller ? "true" : "false";
    const { collegeName, regNo, branch, hostelAddress } = values;
    let address = uIsHosteller ? hostelAddress : uHostelAddress;
    const res = await updateCollegeDetails({
      userId: userid,
      isHosteller: hosteller,
      collegeName,
      regNo,
      branch,
      hostelAddress: address,
    });
    if (res) getCollegeDetails();
  };

  return (
    <Screen style={styles.container}>
      <Text style={styles.heading}>
        {!collegeName ? "Add" : "Edit"} College Details
      </Text>
      <ErrorMsgBox
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
      <AppForm
        initialValues={{
          collegeName: collegeName,
          regNo: regNo,
          branch: branch,
          hostelAddress: uHostelAddress,
        }}
        onSubmit={onUpdate}
        validationSchema={validationSchema}
      >
        <AppFormField
          label="College Name"
          labelStyle={styles.label}
          name="collegeName"
        />
        <AppFormField
          label="Roll No. / Reg. No."
          labelStyle={styles.label}
          name="regNo"
        />
        <AppFormField label="Branch" labelStyle={styles.label} name="branch" />
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
          <AppFormField
            label="Hostel Address"
            labelStyle={styles.label}
            multiline={true}
            numberOfLines={2}
            name="hostelAddress"
          />
        )}
        <SubmitButton title={btnText} isLoading={isUpdating} />
      </AppForm>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 20,
    fontFamily: "Roboto-bold",
    color: Colors.primary,
    marginBottom: 15,
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
