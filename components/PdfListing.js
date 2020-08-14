import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

import Card from "./Card";
import Colors from "../constants/colors";
import defaultStyles from "../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import PdfDownloadBtn from "./PdfDownloadBtn";
const PdfListing = ({ pdfListData, onPress }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={pdfListData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <View style={styles.innerContainer}>
              <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={() => onPress(item)}>
                  <View style={{ ...styles.innerContainer, padding: 5 }}>
                    <MaterialIcons
                      name="picture-as-pdf"
                      size={24}
                      color={Colors.danger}
                    />
                    <View style={{ marginHorizontal: 10, flex: 1 }}>
                      <Text style={defaultStyles.subTitle}>
                        Title: {item.pdfName}
                      </Text>
                      <Text
                        style={{
                          ...defaultStyles.sText,
                          fontFamily: "Roboto-bold",
                        }}
                      >
                        Category: {item.category}
                      </Text>
                      {item.description ? (
                        <Text style={defaultStyles.sText} numberOfLines={2}>
                          Description: {item.description}
                        </Text>
                      ) : null}
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
              <PdfDownloadBtn item={item} />
            </View>
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    borderRadius: 5,
    backgroundColor: "white",
    marginVertical: 10,
    elevation: 2,
  },
  innerContainer: {
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
  },
});
export default PdfListing;
