import React from "react";

import CustomButton from "../../components/CustomButton";
import Colors from "../../constants/colors";
import UserProfileBar from "../../components/UserProfileBar";
import ViewBook from "../../components/ViewBook";

const ViewBookStatus = ({ route }) => {
  const { bookData } = route.params;

  let buyerButtonText = "";
  let buyerButtonBg = Colors.primary;
  let disabled = false;
  if (bookData.sellerId) {
    if (!bookData.sellerStatus && !bookData.buyerStatus) {
      buyerButtonText = "Requested";
      buyerButtonBg = Colors.yellow;
      disabled = true;
    } else if (bookData.sellerStatus != null && !bookData.buyerStatus) {
      buyerButtonText = "Accepted";
      disabled = true;
      buyerButtonBg = Colors.secondary;
    } else {
      buyerButtonText = "Purchased";
      disabled = true;
      buyerButtonBg = Colors.secondary;
    }
  }

  return (
    <ViewBook bookData={bookData}>
      <UserProfileBar profileImg={null} name={"Arun kumar"} />
      <CustomButton
        isDisabled={true}
        style={{ alignSelf: "center" }}
        title={buyerButtonText}
        bgColor={buyerButtonBg}
        color={Colors.white}
      />
    </ViewBook>
  );
};

export default ViewBookStatus;
