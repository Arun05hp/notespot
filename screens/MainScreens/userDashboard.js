import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import Title from "../../components/Title";
import GridTile from "../../components/GridTile";
import Colors from "../../constants/colors";

import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import GridTitle from "../../components/GridTile";

const GridData = [
  {
    id: "upload",
    title: "Upload Pdf",
    icon: <AntDesign name="upload" size={24} color="black" />,
    backgroundColor: "#f5428d",
  },
  {
    id: "recent",
    title: "Recent Uploads",
    icon: <AntDesign name="clouduploado" size={24} color="black" />,
    backgroundColor: "#f54242",
  },
  {
    id: "search",
    title: "Search Pdf",
    icon: <AntDesign name="search1" size={24} color="black" />,
    backgroundColor: "#f5d142",
  },
  {
    id: "favorites",
    title: "Favorites",
    icon: <AntDesign name="staro" size={24} color="black" />,
    backgroundColor: "#368dff",
  },
  {
    id: "buy",
    title: "Buy Book",
    icon: (
      <MaterialCommunityIcons name="cart-arrow-down" size={24} color="black" />
    ),
    backgroundColor: "#41d95d",
  },
  {
    id: "sell",
    title: "Sell Book",
    icon: (
      <MaterialCommunityIcons name="cart-arrow-up" size={24} color="black" />
    ),
    backgroundColor: "#9eecff",
  },
];

const userDashboard = () => {
  const renderGridItem = (itemData) => {
    return <GridTitle itemData={itemData} />;
  };

  return (
    <FlatList data={GridData} renderItem={renderGridItem} numColumns={2} />
  );
};
userDashboard.navigationOptions = () => {
  return {
    headerTitle: () => <Title title="DASHBOARD" />,
    headerStyle: {
      backgroundColor: Colors.primary,
    },
  };
};

const styles = StyleSheet.create({});
export default userDashboard;
