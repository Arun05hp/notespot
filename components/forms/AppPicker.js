import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
} from "react-native";

import { useFormikContext } from "formik";
import AppTextInput from "../AppTextInput";
import Colors from "../../constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const AppPicker = ({ disabled, items, placeholder, name }) => {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.6}
        disabled={disabled}
        style={styles.container}
        onPress={() => setModalVisible(true)}
      >
        <AppTextInput
          editable={false}
          inputStyle={styles.container}
          placeholder={placeholder}
          placeholderTextColor={Colors.placeholder}
          errorMessage={touched[name] ? errors[name] : ""}
          value={values[name]}
          multiline={true}
          rightIcon={
            <MaterialCommunityIcons
              name="chevron-down"
              size={20}
              color={Colors.placeholder}
            />
          }
        />
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide">
        <FlatList
          data={items}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                setModalVisible(false);
                setFieldValue(name, item.name);
              }}
            >
              <Text style={styles.text}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </Modal>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  text: {
    fontSize: 16,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.placeholder,
    fontFamily: "Roboto-bold",
    color: Colors.primary,
  },
});

export default AppPicker;
