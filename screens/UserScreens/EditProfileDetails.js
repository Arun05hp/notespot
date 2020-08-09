import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import { Context as UserContext } from "../../context/UserContext";
import { Input } from "react-native-elements";
import TwoButtonRow from "../../components/TwoButtonRow";
import ErrorMsgBox from "../../components/ErrorMsgBox";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import Colors from "../../constants/colors";

const EditProfileDetails = ({ navigation }) => {
  const { state, updateProfile, getUserData, clearMessage } = useContext(
    UserContext
  );
  const { errorMessage, successMessage, isUpdating } = state;
  const { id, name, email, mobileno, address } = state.userData;
  const [username, setUsername] = useState(name);
  const [useremail, setUseremail] = useState(email);
  const [mobileNumber, setMobileNumber] = useState(mobileno);
  const [userAddress, setUserAddress] = useState(address);
  const [numError, setNumError] = useState("");

  const validate = async () => {
    const regx = /^[0-9]{10}$/;
    if (mobileNumber) {
      if (regx.test(mobileNumber)) {
        setNumError("");
        await updateProfile({
          id,
          username,
          useremail,
          mobileNumber,
          userAddress,
        });
        getUserData();
      } else {
        setNumError("Invalid Mobile Number");
      }
    } else {
      setNumError("Required");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Profile</Text>
      <View style={styles.Form}>
        <ErrorMsgBox
          errorMessage={errorMessage}
          successMessage={successMessage}
        />
        <Input
          keyboardType="default"
          inputStyle={styles.Input}
          value={username}
          onChangeText={setUsername}
          placeholder="Full Name"
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor={Colors.placeholder}
          leftIcon={<FontAwesome5 name="user-alt" style={styles.iconStyle} />}
        />
        <Input
          keyboardType="email-address"
          inputStyle={styles.Input}
          value={useremail}
          onChangeText={setUseremail}
          placeholder="Email Address"
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor={Colors.placeholder}
          leftIcon={<MaterialIcons name="email" style={styles.iconStyle} />}
        />
        <Input
          keyboardType="numeric"
          inputStyle={styles.Input}
          value={mobileNumber}
          errorMessage={numError}
          onFocus={() => setNumError("")}
          onChangeText={setMobileNumber}
          placeholder="Mobile Number"
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor={Colors.placeholder}
          leftIcon={<FontAwesome5 name="mobile-alt" style={styles.iconStyle} />}
        />
        <Input
          keyboardType="default"
          inputStyle={styles.Input}
          value={userAddress}
          onChangeText={setUserAddress}
          placeholder="Address"
          autoCapitalize="none"
          autoCorrect={false}
          multiline={true}
          numberOfLines={2}
          placeholderTextColor={Colors.placeholder}
          leftIcon={
            <MaterialIcons name="location-on" style={styles.iconStyle} />
          }
        />
        <TwoButtonRow
          firstBtnText="Back"
          onSubmit1st={() => {
            navigation.goBack();
          }}
          secBtnText="Update"
          onSubmit2nd={() => validate()}
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
