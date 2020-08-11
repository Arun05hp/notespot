import React from "react";
import PDFReader from "rn-pdf-reader-js";
import baseUrl from "../../api/baseUrl";

const ViewPdf = ({ route }) => {
  const { uri } = route.params;
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
