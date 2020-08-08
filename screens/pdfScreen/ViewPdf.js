import React from "react";
import PDFReader from "rn-pdf-reader-js";
import baseUrl from "../../api/baseUrl";

const ViewPdf = ({ navigation }) => {
  const uri = navigation.getParam("uri");
  const sourceUri = baseUrl + "/" + uri;

  return (
    <PDFReader
      source={{
        uri: sourceUri,
      }}
      withScroll={true}
      withPinchZoom={true}
    />
  );
};

export default ViewPdf;
