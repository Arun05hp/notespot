import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";

import { Context as BuyBookContext } from "../../context/BuySellBookContext";
import Card from "../../components/Card";
import baseUrl from "../../api/baseUrl";
import Colors from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";

const BuyBook = ({ navigation }) => {
  const { state, getBooks } = useContext(BuyBookContext);
  const bookListData = state.bookLists;

  useEffect(() => {
    getBooks();
  }, []);

  if (bookListData.length <= 0) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={bookListData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={(itemData) => (
          <Card style={styles.card}>
            <TouchableOpacity onPress={() => {}}>
              <View style={styles.innerContainer}>
                <View style={{ width: 100, height: 120 }}>
                  <Image
                    style={{ width: "100%", height: "100%", borderRadius: 10 }}
                    source={{ uri: baseUrl + "/" + itemData.item.bookImgLink }}
                  />
                </View>
                <View style={styles.infoBox}>
                  <Text style={styles.title} numberOfLines={2}>
                    {itemData.item.bookName}
                  </Text>
                  <Text style={styles.subTitle}>
                    By {itemData.item.authorName}
                  </Text>
                  <View style={styles.roundWrapper}>
                    <Text style={styles.price}>₹ {itemData.item.price}</Text>
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
    backgroundColor: "white",
    marginVertical: 10,
    elevation: 2,
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
    backgroundColor: "#4853dd",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    borderRadius: 20,
  },
  title: {
    fontSize: 18,
    fontFamily: "Roboto-bold",
    color: "#333333",
  },
  price: {
    fontSize: 16,
    fontFamily: "Roboto-bold",
    color: Colors.white,
  },
  subTitle: {
    fontSize: 14,
    fontFamily: "Roboto-bold",
    color: "#9e9e9e",
  },
  description: {
    fontSize: 14,
    fontFamily: "Roboto-regular",
  },
});

BuyBook.navigationOptions = () => {
  return {
    headerTitle: "Buy Book",
  };
};

export default BuyBook;
