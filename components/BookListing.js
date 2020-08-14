import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";

import Card from "./Card";
import baseUrl from "../api/baseUrl";
import Colors from "../constants/colors";
import defaultStyles from "../constants/styles";
import { Ionicons } from "@expo/vector-icons";

const BookListing = ({ bookListData, onPress }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={bookListData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(itemData) => (
          <Card
            style={
              !itemData.item.buyerId
                ? { ...styles.card, ...styles.card_bgW }
                : { ...styles.card, ...styles.card_bgC }
            }
          >
            <TouchableOpacity onPress={() => onPress(itemData.item)}>
              <View style={styles.innerContainer}>
                <View style={{ width: 100, height: 120 }}>
                  <Image
                    style={{ width: "100%", height: "100%", borderRadius: 10 }}
                    source={{ uri: baseUrl + "/" + itemData.item.bookImgLink }}
                  />
                </View>
                <View style={styles.infoBox}>
                  <Text style={defaultStyles.title} numberOfLines={2}>
                    {itemData.item.bookName}
                  </Text>
                  <Text style={{ ...defaultStyles.font_RB, color: "#9e9e9e" }}>
                    By {itemData.item.authorName}
                  </Text>
                  <View style={styles.roundWrapper}>
                    <Text
                      style={{ ...defaultStyles.subTitle, color: Colors.white }}
                    >
                      ₹ {itemData.item.price}
                    </Text>
                  </View>
                </View>
                <View style={{ justifyContent: "center" }}>
                  <Ionicons
                    name="ios-arrow-forward"
                    size={24}
                    color="#9e9e9e"
                  />
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
    elevation: 2,
    marginVertical: 10,
  },
  card_bgW: {
    backgroundColor: Colors.white,
  },
  card_bgC: {
    backgroundColor: Colors.card,
  },
  innerContainer: {
    padding: 10,
    flexDirection: "row",
  },
  infoBox: {
    flex: 1,
    justifyContent: "space-between",
    marginHorizontal: 15,
    alignItems: "flex-start",
  },
  roundWrapper: {
    backgroundColor: Colors.primary,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
});
export default BookListing;
