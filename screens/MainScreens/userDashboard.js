import React from "react";
import { FlatList, StyleSheet } from "react-native";

import Title from "../../components/Title";
import GridTitle from "../../components/GridTile";

import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../../constants/colors";

const GridData = [
  {
    id: "upload",
    title: "Upload Pdf",
    icon: <AntDesign name="upload" size={24} color="#0298C8" />,
    color: "#0298C8",
    navigateScreen: "UploadPdf",
  },
  {
    id: "recent",
    title: "Recent Uploads",
    icon: <AntDesign name="clouduploado" size={24} color="#D168F7" />,
    color: "#D168F7",
    navigateScreen: "UploadPdf",
  },
  {
    id: "search",
    title: "Search Pdf",
    icon: <AntDesign name="search1" size={24} color="#F84772" />,
    color: "#F84772",
    navigateScreen: "UploadPdf",
  },
  {
    id: "favorites",
    title: "Favorites",
    icon: <AntDesign name="staro" size={24} color="#F66E50" />,
    color: "#F66E50",
    navigateScreen: "UploadPdf",
  },
  {
    id: "buy",
    title: "Buy Book",
    icon: (
      <MaterialCommunityIcons
        name="cart-arrow-down"
        size={24}
        color="#4ebbf9"
      />
    ),
    color: "#0298C8",
    navigateScreen: "UploadPdf",
  },
  {
    id: "sell",
    title: "Sell Book",
    icon: (
      <MaterialCommunityIcons name="cart-arrow-up" size={24} color="#39dc36" />
    ),
    color: "#0298C8",
    navigateScreen: "UploadPdf",
  },
];

const userDashboard = ({ navigation }) => {
  const renderGridItem = (itemData) => {
    return (
      <GridTitle
        navigation={navigation}
        itemData={itemData}
        navigateScreen={itemData.item.navigateScreen}
      />
    );
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
