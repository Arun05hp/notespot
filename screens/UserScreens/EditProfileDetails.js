import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
} from "react-native";

import { Context as UserContext } from "../../context/UserContext";
import { Input } from "react-native-elements";

import { NavigationEvents } from "react-navigation";
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
      <NavigationEvents onWillFocus={clearMessage} />
      <Text style={styles.heading}>Edit Profile</Text>
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
              validate();
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
  iconStyle: {
    fontSize: 20,
    color: Colors.primary,
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

export default EditProfileDetails;
