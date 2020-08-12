import React, { useContext, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import * as Yup from "yup";
import {
  AppForm,
  AppFormField,
  SubmitButton,
  FormImagePicker,
} from "../../components/forms/index";
import { Context as SellBookContext } from "../../context/BuySellBookContext";
import { Context as UserContext } from "../../context/UserContext";
import ErrorMsgBox from "../../components/ErrorMsgBox";

import Colors from "../../constants/colors";

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

const SellBooks = () => {
  const { sellBook, clearMessage, state: bookState } = useContext(
    SellBookContext
  );
  const { errorMessage, successMessage, isLoading } = bookState;
  const { state } = useContext(UserContext);
  const userId = state.userData.id;

  useEffect(() => {
    return () => {
      clearMessage();
    };
  }, []);

  const onSubmit = async (values, { resetForm }) => {
    const res = await sellBook({
      userId,
      ...values,
    });
    if (res) resetForm();
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
    >
      <View style={styles.contentContainer}>
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
          <FormImagePicker name="imageUri" />
          <AppFormField
            name="bookName"
            placeholder="Book Name"
            placeholderTextColor={Colors.placeholder}
          />
          <AppFormField
            name="authorName"
            placeholder="Author Name"
            placeholderTextColor={Colors.placeholder}
          />
          <AppFormField
            name="publisherName"
            placeholder="Publisher Name"
            placeholderTextColor={Colors.placeholder}
          />

          <AppFormField
            name="description"
            placeholder="Description about book condition"
            placeholderTextColor={Colors.placeholder}
            multiline={true}
          />
          <AppFormField
            name="price"
            keyboardType="numeric"
            placeholder="Price"
            placeholderTextColor={Colors.placeholder}
          />
          <SubmitButton title="Submit" isLoading={isLoading} />
        </AppForm>
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
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default SellBooks;
