import React, { useContext, useEffect } from "react";
import { Text } from "react-native";
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
import defaultStyles from "../../constants/styles";

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
    <Screen style={defaultStyles.container}>
      <Text style={{ ...defaultStyles.heading, marginBottom: 15 }}>
        Edit Profile
      </Text>

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
          leftIcon={
            <FontAwesome5 name="user-alt" style={defaultStyles.iconStyle} />
          }
          name="username"
          placeholder="Full Name"
        />
        <AppFormField
          keyboardType="email-address"
          leftIcon={
            <MaterialIcons name="email" style={defaultStyles.iconStyle} />
          }
          name="useremail"
          placeholder="Email Address"
        />
        <AppFormField
          keyboardType="numeric"
          leftIcon={
            <FontAwesome5 name="mobile-alt" style={defaultStyles.iconStyle} />
          }
          name="mobileNumber"
          placeholder="Mobile Number"
        />
        <AppFormField
          leftIcon={
            <MaterialIcons name="location-on" style={defaultStyles.iconStyle} />
          }
          multiline={true}
          name="userAddress"
          numberOfLines={2}
          placeholder="Address"
        />
        <SubmitButton title="Update" isLoading={isUpdating} />
      </AppForm>
    </Screen>
  );
};

export default EditProfileDetails;
