import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import { Context as PdfContext } from "../../context/PdfContext";
import Card from "../../components/Card";
import defaultStyles from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";

const PdfLists = ({ navigation }) => {
  const { state, getPdfs } = useContext(PdfContext);
  const pdfListData = state.pdfLists;
  useEffect(() => {
    getPdfs();
  }, []);

  if (pdfListData.length <= 0) {
    return (
      <View style={defaultStyles.flex_1_center}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={pdfListData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={(itemData) => (
          <Card style={styles.card}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ViewPdf", {
                  pdfName: itemData.item.pdfName,
                  uri: itemData.item.pdfLink,
                })
              }
            >
              <View style={styles.innerContainer}>
                <MaterialIcons
                  name="picture-as-pdf"
                  size={34}
                  color="#d21e27"
                />
                <View style={{ marginHorizontal: 10 }}>
                  <Text style={defaultStyles.title}>
                    Title: {itemData.item.pdfName}
                  </Text>
                  <Text style={styles.subTitle}>
                    Category: {itemData.item.category}
                  </Text>
                  {itemData.item.description ? (
                    <Text style={defaultStyles.sText} numberOfLines={2}>
                      Description: {itemData.item.description}
                    </Text>
                  ) : null}
                </View>
              </View>
            </TouchableOpacity>
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
  subTitle: {
    fontSize: 16,
    fontFamily: "Roboto-regular",
  },
});

export default PdfLists;
