import React, { useContext, useEffect } from "react";
import { Text, StyleSheet } from "react-native";
import * as Yup from "yup";

import { Context as UserContext } from "../../context/UserContext";
import Screen from "../../components/Screen";
import {
  AppForm,
  AppFormField,
  SubmitButton,
} from "../../components/forms/index";

import ErrorMsgBox from "../../components/ErrorMsgBox";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import Colors from "../../constants/colors";

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label("Name"),
  useremail: Yup.string().required().email().label("Email"),
  mobileNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile Number is not valid")
    .required()
    .label("Mobile Number"),
  userAddress: Yup.string().nullable().label("Address"),
});

const EditProfileDetails = () => {
  const { state, updateProfile, getUserData, clearMessage } = useContext(
    UserContext
  );
  const { errorMessage, successMessage, isUpdating } = state;
  const { id, name, email, mobileno, address } = state.userData;

  const onSubmit = async (values) => {
    const res = await updateProfile({
      id,
      ...values,
    });
    if (res) getUserData();
  };

  useEffect(() => {
    return () => {
      clearMessage();
    };
  }, []);

  return (
    <Screen style={styles.container}>
      <Text style={styles.heading}>Edit Profile</Text>

      <ErrorMsgBox
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
      <AppForm
        initialValues={{
          username: name,
          useremail: email,
          mobileNumber: mobileno,
          userAddress: address,
        }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <AppFormField
          leftIcon={<FontAwesome5 name="user-alt" style={styles.iconStyle} />}
          name="username"
          placeholder="Full Name"
          placeholderTextColor={Colors.placeholder}
        />
        <AppFormField
          keyboardType="email-address"
          leftIcon={<MaterialIcons name="email" style={styles.iconStyle} />}
          name="useremail"
          placeholder="Email Address"
          placeholderTextColor={Colors.placeholder}
        />
        <AppFormField
          keyboardType="numeric"
          leftIcon={<FontAwesome5 name="mobile-alt" style={styles.iconStyle} />}
          name="mobileNumber"
          placeholder="Mobile Number"
          placeholderTextColor={Colors.placeholder}
        />
        <AppFormField
          leftIcon={
            <MaterialIcons name="location-on" style={styles.iconStyle} />
          }
          multiline={true}
          name="userAddress"
          numberOfLines={2}
          placeholder="Address"
          placeholderTextColor={Colors.placeholder}
        />
        <SubmitButton title="Update" isLoading={isUpdating} />
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
  iconStyle: {
    fontSize: 20,
    color: Colors.primary,
  },
  btnTitle: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: "Roboto-bold",
  },
});

export default EditProfileDetails;
