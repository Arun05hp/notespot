import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Yup from "yup";
import {
  AppForm,
  AppFormField,
  SubmitButton,
  FormImagePicker,
} from "../../components/forms/index";

import Screen from "../../components/Screen";
import { Context as SellBookContext } from "../../context/BuySellBookContext";
import { Context as UserContext } from "../../context/UserContext";
import ErrorMsgBox from "../../components/ErrorMsgBox";
import Colors from "../../constants/colors";
import defaultStyles from "../../constants/styles";
import ProfileError from "../../components/ProfileError";

const validationSchema = Yup.object().shape({
  bookName: Yup.string().required().label("Book Name"),
  authorName: Yup.string().required().label("Author Name"),
  publisherName: Yup.string().required().label("Publisher Name"),
  description: Yup.string().nullable().label("Description"),
  price: Yup.string()
    .matches(/^[0-9]*$/, "Enter Valid Price")
    .required()
    .label("Price"),
  imageUri: Yup.string().nullable().required().label("Image"),
});

const SellBooks = ({ navigation }) => {
  const { sellBook, clearMessage, state: bookState } = useContext(
    SellBookContext
  );
  const { errorMessage, successMessage, isLoading } = bookState;
  const { state } = useContext(UserContext);
  const { id: userId, mobileno } = state.userData;
  const { collegeName } = state.collegeData;

  useEffect(() => {
    return () => {
      clearMessage();
    };
  }, []);

  if (collegeName == undefined || mobileno == null) {
    return <ProfileError onPress={() => navigation.navigate("Profile")} />;
  }

  const onSubmit = async (values, { resetForm }) => {
    const res = await sellBook({
      userId,
      ...values,
    });
    if (res) resetForm();
  };

  return (
    <Screen
      style={{ ...defaultStyles.container, backgroundColor: Colors.white }}
    >
      <Text style={{ ...defaultStyles.heading, marginBottom: 15 }}>
        Enter Book Details
      </Text>
      <ErrorMsgBox
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
      <AppForm
        initialValues={{
          bookName: "",
          authorName: "",
          publisherName: "",
          description: "",
          price: "",
          imageUri: null,
        }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <View style={styles.picker}>
          <FormImagePicker name="imageUri" />
        </View>

        <AppFormField name="bookName" placeholder="Book Name" />
        <AppFormField name="authorName" placeholder="Author Name" />
        <AppFormField name="publisherName" placeholder="Publisher Name" />
        <AppFormField name="price" keyboardType="numeric" placeholder="Price" />
        <AppFormField
          name="description"
          placeholder="Description about book condition"
          multiline={true}
        />
        <SubmitButton title="Submit" isLoading={isLoading} />
      </AppForm>
    </Screen>
  );
};

const styles = StyleSheet.create({
  picker: {
    marginVertical: 10,
    alignItems: "center",
  },
});

export default SellBooks;
