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
import Card from "../../components/Card";
import Colors from "../../constants/colors";
import { AntDesign, Feather } from "@expo/vector-icons";

const UserProfile = () => {
  const { signout } = useContext(AuthContext);
  const { state, getUserData } = useContext(UserContext);
  const { name, email } = state.userData;

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
                  uri: "https://img.icons8.com/ultraviolet/80/000000/user.png",
                }}
              />
              <TouchableOpacity
                style={styles.editIconBox}
                onPress={() => console.log("change")}
              >
                <Feather style={styles.editIcon} name="edit-2" />
              </TouchableOpacity>
            </View>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.subtitle}>{email}</Text>
            <Text style={styles.subtitle}>8894989573</Text>
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
    right: -10,
  },
  editIcon: {
    fontSize: 20,
    color: Colors.primary,
    backgroundColor: Colors.white,
    padding: 5,
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
