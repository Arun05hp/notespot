import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";

import Screen from "../../components/Screen";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as UserContext } from "../../context/UserContext";
import baseUrl from "../../api/baseUrl";
import * as ImagePicker from "expo-image-picker";
import Colors from "../../constants/colors";
import { AntDesign, Feather } from "@expo/vector-icons";

const UserProfile = ({ navigation }) => {
  const { signout } = useContext(AuthContext);
  const { state, getUserData, uploadImage, clearState } = useContext(
    UserContext
  );
  const { id, name, email, mobileno, profileImg } = state.userData;
  const { collegeName } = state.collegeData;

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 3],
        quality: 0.6,
      });
      if (!result.cancelled) {
        const imageUrl = result.uri;
        await uploadImage({ id, imageUrl, profileImg });
        getUserData();
      }
    } catch (err) {
      err = err;
    }
  };

  if (!name) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  const handleLogout = async () => {
    const res = await signout();
    clearState();
    if (res) navigation.replace("Auth");
  };
  return (
    <Screen style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.innerContainer}>
          <View style={styles.imgWrapper}>
            <Image
              style={styles.img}
              source={{
                uri: !profileImg
                  ? "https://img.icons8.com/ultraviolet/80/000000/user.png"
                  : baseUrl + "/" + profileImg,
              }}
            />

            <TouchableOpacity
              style={styles.editIconBox}
              onPress={() => pickImage()}
            >
              <Feather style={styles.editIcon} name="edit-2" />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subtitle}>{email}</Text>
          {mobileno ? (
            <Text style={styles.subtitle}>{mobileno}</Text>
          ) : (
            <TouchableOpacity
              style={{
                paddingVertical: 2,
                paddingHorizontal: 8,
                backgroundColor: Colors.white,
                borderRadius: 10,
                marginTop: 5,
              }}
              activeOpacity={0.7}
              onPress={() => navigation.navigate("EditProfile")}
            >
              <Text
                style={{
                  color: Colors.primary,
                  fontFamily: "Roboto-bold",
                }}
              >
                Add Mobile Number
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.wrapper2}>
        <Text style={styles.subHeading}>Edit</Text>
        <TouchableOpacity
          style={styles.linkWrapper}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <View style={styles.row}>
            <Text style={styles.text}>Profile Details</Text>
            {!mobileno ? (
              <AntDesign
                name="exclamationcircleo"
                size={20}
                color={Colors.yellow}
              />
            ) : null}
            <AntDesign style={styles.icons} name="edit" />
          </View>
        </TouchableOpacity>
        {!collegeName ? <Text style={styles.subHeading}>Add</Text> : null}
        <TouchableOpacity
          style={styles.linkWrapper}
          onPress={() => navigation.navigate("EditCollegeDetails")}
        >
          <View style={styles.row}>
            <Text style={styles.text}>College Details</Text>
            {!collegeName ? (
              <AntDesign
                name="exclamationcircleo"
                size={20}
                color={Colors.yellow}
              />
            ) : null}

            <AntDesign
              style={styles.icons}
              name={!collegeName ? "plus" : "edit"}
            />
          </View>
        </TouchableOpacity>

        <Text style={styles.subHeading}>Account Action</Text>
        <TouchableOpacity style={styles.linkWrapper} onPress={handleLogout}>
          <View style={styles.row}>
            <Text style={styles.text}>Sign Out</Text>
            <AntDesign style={styles.icons} name="logout" />
          </View>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    paddingTop: 10,
  },
  innerContainer: {
    alignItems: "center",
  },
  imgWrapper: {
    width: 100,
    height: 100,
    padding: 5,
    backgroundColor: Colors.white,
    borderRadius: 75,
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 75,
  },
  editIconBox: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  editIcon: {
    fontSize: 16,
    color: Colors.primary,
    backgroundColor: Colors.white,
    padding: 8,
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: "Roboto-bold",
    color: Colors.white,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Roboto-regular",
    marginBottom: 5,
    color: Colors.white,
  },
  wrapper2: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 5,
  },
  subHeading: {
    borderBottomColor: "rgba(0,0,0,0.2)",
    borderBottomWidth: 1,
    color: "#3e4a6e",
    fontSize: 17,
    fontFamily: "Roboto-bold",
    marginVertical: 10,
    paddingBottom: 5,
  },
  linkWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 1,
    marginBottom: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontFamily: "Roboto-bold",
    color: Colors.primary,
  },
  icons: {
    fontSize: 20,
    color: Colors.primary,
  },
});

export default UserProfile;
