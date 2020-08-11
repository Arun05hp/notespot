import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Input } from "react-native-elements";

import { Context as SellBookContext } from "../../context/BuySellBookContext";
import { Context as UserContext } from "../../context/UserContext";
import ErrorMsgBox from "../../components/ErrorMsgBox";
import ImageInput from "../../components/ImageInput";
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
  const [imgUri, setImgUri] = useState(null);
  const [imgExist, setImgExist] = useState(false);

  const [priceError, setPriceError] = useState("");

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
          setImgUri(null);
          setTimeout(function () {
            // navigation.goBack();
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
        <ImageInput imageUri={imgUri} onChangeImage={(uri) => setImgUri(uri)} />
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
        </View>
      </View>
    </ScrollView>
  );
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
