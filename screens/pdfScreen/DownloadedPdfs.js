import React, { useState, useEffect } from "react";

import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
} from "react-native";

import * as FileSystem from "expo-file-system";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Card from "../../components/Card";
import Colors from "../../constants/colors";
import defaultStyles from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";

const DownloadedPdfs = ({ navigation }) => {
  const [pdfs, setPdfs] = useState([]);
  useEffect(() => {
    navigation.addListener("focus", () => {
      getDownloadedPdfs();
    });
    return () => {
      setPdfs([]);
    };
  }, []);

  const getDownloadedPdfs = async () => {
    try {
      const pdfFolder = FileSystem.documentDirectory + "pdfs/";
      const pdfArray = await FileSystem.readDirectoryAsync(pdfFolder);
      if (pdfArray) {
        setPdfs(pdfArray);
      }
    } catch (error) {}
  };

  if (pdfs.length <= 0) {
    return (
      <View style={defaultStyles.flex_1_center}>
        <Text style={defaultStyles.subTitle}>No Pdf Downloaded</Text>
      </View>
    );
  }

  const deletePdf = async (pdfname) => {
    const pdfLink = FileSystem.documentDirectory + "pdfs/" + pdfname;
    try {
      const { uri } = await FileSystem.getInfoAsync(pdfLink);
      const res = await FileSystem.deleteAsync(uri);
      getDownloadedPdfs();
    } catch (error) {}
  };

  const onPress = async (pdfName) => {
    const pdfFolder = FileSystem.documentDirectory + "pdfs/";
    try {
      const base64 = await FileSystem.readAsStringAsync(pdfFolder + pdfName, {
        encoding: FileSystem.EncodingType.Base64,
      });

      if (base64) {
        const base64Data = "data:application/pdf;base64," + base64;
        navigation.navigate("ViewPdf", {
          pdfName: pdfName,
          base64: base64Data,
        });
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const renderRightAction = (pdfName) => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => deletePdf(pdfName)}
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <MaterialIcons name="delete" size={24} color={Colors.danger} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={pdfs}
        keyExtractor={(index) => index}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Swipeable renderRightActions={() => renderRightAction(item)}>
              <TouchableOpacity onPress={() => onPress(item)}>
                <View style={styles.innerContainer}>
                  <MaterialIcons
                    name="picture-as-pdf"
                    size={24}
                    color={Colors.danger}
                  />
                  <View style={{ marginHorizontal: 10, flex: 1 }}>
                    <Text style={defaultStyles.subTitle}>{item}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Swipeable>
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
    paddingHorizontal: 5,
  },
  innerContainer: {
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
  },
});

export default DownloadedPdfs;
