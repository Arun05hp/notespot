import React, { useContext, useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";

import GridTile from "../../components/GridTile";
import { Context as UserContext } from "../../context/UserContext";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const GridData = [
  {
    id: "upload",
    title: "Upload Pdf",
    icon: <AntDesign name="upload" size={24} color="#0298C8" />,
    color: "#0298C8",
    navigateScreen: "Upload",
  },
  {
    id: "recent",
    title: "Recent Uploads",
    icon: <AntDesign name="clouduploado" size={24} color="#D168F7" />,
    color: "#D168F7",
    navigateScreen: "pdfFlow",
  },
  {
    id: "search",
    title: "Search Pdf",
    icon: <AntDesign name="search1" size={24} color="#F84772" />,
    color: "#F84772",
    navigateScreen: "UploadPdf",
  },
  {
    id: "status",
    title: "Book Status",
    icon: <MaterialCommunityIcons name="cart" size={24} color="#F66E50" />,
    color: "#F66E50",
    navigateScreen: "BookStatus",
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
    navigateScreen: "Buy",
  },
  {
    id: "sell",
    title: "Sell Book",
    icon: (
      <MaterialCommunityIcons name="cart-arrow-up" size={24} color="#39dc36" />
    ),
    color: "#0298C8",
    navigateScreen: "Sell",
  },
];

const UserDashboard = ({ navigation }) => {
  const { getUserData, getCollegeDetails } = useContext(UserContext);

  const renderGridItem = (itemData) => {
    return (
      <GridTile
        onClick={() => navigation.navigate(itemData.item.navigateScreen)}
        itemData={itemData}
      />
    );
  };

  useEffect(() => {
    getUserData();
    getCollegeDetails();
  }, []);

  return (
    <FlatList
      style={styles.container}
      data={GridData}
      renderItem={renderGridItem}
      numColumns={2}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 15,
  },
});
export default UserDashboard;
