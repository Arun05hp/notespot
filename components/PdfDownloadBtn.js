import React from "react";
import { TouchableOpacity, ActivityIndicator } from "react-native";

import Colors from "../constants/colors";
import { MaterialIcons } from "@expo/vector-icons";

const PdfDownloadBtn = ({ item }) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={() => console.log(item)}>
      {false ? (
        <MaterialIcons name="file-download" size={24} color={Colors.yellow} />
      ) : (
        <ActivityIndicator size="small" color={Colors.yellow} />
      )}
    </TouchableOpacity>
  );
};

export default PdfDownloadBtn;
