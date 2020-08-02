import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Input } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import * as ImagePicker from "expo-image-picker";
import { Context as SellBookContext } from "../../context/BuySellBookContext";
import { Context as UserContext } from "../../context/UserContext";
import ErrorMsgBox from "../../components/ErrorMsgBox";
import TwoButtonRow from "../../components/TwoButtonRow";
import { Entypo } from "@expo/vector-icons";
import Colors from "../../constants/colors";

const SellBooks = ({ navigation }) => {
  const { sellBook, clearMessage, state: bookState } = useContext(
    SellBookContext
  );
  const { errorMessage, successMessage, isLoading } = bookState;
  const { state } = useContext(UserContext);
  const userId = state.userData.id;

  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [publisherName, setPublisherName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imgUri, setImgUri] = useState("");
  const [imgExist, setImgExist] = useState(false);
  const selectBtnText = imgExist ? "Change Image" : "Select Image";

  const [priceError, setPriceError] = useState("");

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
        setImgUri(imageUrl);
        setImgExist(true);
      }
    } catch (err) {
      err = err;
    }
  };

  const validate = async () => {
    if (imgExist) {
      const regx = /^[0-9]*$/;
      if (price && regx.test(price)) {
        const res = await sellBook({
          userId,
          bookName,
          authorName,
          publisherName,
          description,
          price,
          imgUri,
        });
        if (res) {
          setBookName("");
          setAuthorName("");
          setDescription("");
          setPublisherName("");
          setPrice("");
          setImgExist(false);
          setImgUri("");
          setTimeout(function () {
            navigation.goBack();
          }, 1500);
        }
      } else {
        setPriceError("Number Only");
      }
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
    >
      <View style={styles.contentContainer}>
        <NavigationEvents onWillFocus={clearMessage} />
        <Text style={styles.heading}>Enter Book Details</Text>
        <View style={styles.container}>
          <Input
            containerStyle={styles.inputContainer}
            inputStyle={styles.Input}
            labelStyle={styles.label}
            label="Book Name"
            value={bookName}
            onChangeText={setBookName}
          />
          <Input
            containerStyle={styles.inputContainer}
            inputStyle={styles.Input}
            labelStyle={styles.label}
            label="Publisher Name"
            value={publisherName}
            onChangeText={setPublisherName}
          />
          <Input
            containerStyle={styles.inputContainer}
            inputStyle={styles.Input}
            labelStyle={styles.label}
            label="Author Name"
            value={authorName}
            onChangeText={setAuthorName}
          />
          <Input
            containerStyle={styles.inputContainer}
            inputStyle={styles.Input}
            labelStyle={styles.label}
            label="Description"
            placeholder="About the book condition"
            multiline={true}
            value={description}
            onChangeText={setDescription}
          />
          <Input
            keyboardType="numeric"
            errorMessage={priceError}
            onFocus={() => setPriceError("")}
            containerStyle={styles.inputContainer}
            inputStyle={styles.Input}
            labelStyle={styles.label}
            label="Price"
            placeholder="00"
            multiline={true}
            value={price}
            onChangeText={setPrice}
          />
          <ErrorMsgBox
            errorMessage={errorMessage}
            successMessage={successMessage}
          />
          <View>
            {imgExist && (
              <View style={styles.showFileContainer}>
                <View style={styles.imgWrapper}>
                  <Image
                    style={{ width: "100%", height: "100%" }}
                    source={{
                      uri: imgUri,
                    }}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setImgExist(false);
                    setImgUri("");
                  }}
                >
                  <Entypo
                    style={{
                      textAlign: "center",
                      padding: 5,
                      borderRadius: 20,
                      backgroundColor: Colors.white,
                      borderWidth: 1,
                      borderColor: "rgba(0,0,0,0.2)",
                    }}
                    name="cross"
                    size={20}
                    color="#dc3545"
                  />
                </TouchableOpacity>
              </View>
            )}
            {!imgExist && (
              <Text style={{ color: "#ff0011", textAlign: "center" }}>
                Please Select Image !
              </Text>
            )}
            <TwoButtonRow
              isImglogo={true}
              firstBtnText={selectBtnText}
              secBtnText="Upload"
              onSubmit1st={pickImage}
              onSubmit2nd={() => validate()}
              isloading={isLoading}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

SellBooks.navigationOptions = () => {
  return {
    headerTitle: "Sell Book",
  };
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    padding: 10,
  },
  heading: {
    fontSize: 20,
    fontFamily: "Roboto-bold",
    color: Colors.primary,
    marginBottom: 15,
  },
  container: {
    width: "90%",
    padding: 10,
  },
  inputContainer: {
    paddingHorizontal: 0,
  },
  Input: {
    fontSize: 16,
    minHeight: 30,
  },
  label: {
    fontFamily: "Roboto-bold",
    color: Colors.primary,
    padding: 0,
  },
  showFileContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  imgWrapper: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    width: 140,
    height: 140,
    marginBottom: 10,
  },
  fileNameText: {
    paddingLeft: 5,
  },
});

export default SellBooks;
