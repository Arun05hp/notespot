import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";

import { Context as AuthContext } from "../../context/AuthContext";
import { Context as UserContext } from "../../context/UserContext";
import baseUrl from "../../api/baseUrl";
import * as ImagePicker from "expo-image-picker";
import Card from "../../components/Card";
import Colors from "../../constants/colors";
import { AntDesign, Feather } from "@expo/vector-icons";

const UserProfile = () => {
  const { signout } = useContext(AuthContext);
  const { state, getUserData, uploadImage } = useContext(UserContext);
  const { id, name, email, mobileno, profileImg } = state.userData;

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
        await uploadImage({ id, imageUrl });
        getUserData();
      }
    } catch (E) {
      console.log(E);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        {!name ? (
          <ActivityIndicator size="large" color={Colors.white} />
        ) : (
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
            {mobileno != 0 ? (
              <Text style={styles.subtitle}>{mobileno}</Text>
            ) : (
              <TouchableOpacity
                style={{
                  paddingVertical: 2,
                  paddingHorizontal: 8,
                  backgroundColor: Colors.white,
                  borderRadius: 10,
                }}
                activeOpacity={0.7}
              >
                <Text
                  style={{ color: Colors.primary, fontFamily: "Roboto-bold" }}
                >
                  Add Mobile Number
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
      <View style={styles.wrapper2}>
        <Card style={styles.card}>
          <TouchableOpacity style={styles.pd}>
            <View style={styles.row}>
              <Text style={styles.text}>Edit Profile Details</Text>
              <AntDesign style={styles.icons} name="edit" />
            </View>
          </TouchableOpacity>
        </Card>
        <Card style={styles.card}>
          <TouchableOpacity style={styles.pd}>
            <View style={styles.row}>
              <Text style={styles.text}>Add College Details</Text>
              <AntDesign style={styles.icons} name="plus" />
            </View>
          </TouchableOpacity>
        </Card>
        <Card style={styles.card}>
          <TouchableOpacity style={styles.pd} onPress={signout}>
            <View style={styles.row}>
              <Text style={styles.text}>Sign Out</Text>
              <AntDesign style={styles.icons} name="logout" />
            </View>
          </TouchableOpacity>
        </Card>
      </View>
    </View>
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
    padding: 15,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginVertical: 5,
  },
  pd: {
    padding: 15,
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

UserProfile.navigationOptions = () => {
  return {
    headerTitle: "PROFILE",
  };
};
export default UserProfile;
