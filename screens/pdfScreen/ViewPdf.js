import React from "react";
import PDFReader from "rn-pdf-reader-js";
import baseUrl from "../../api/baseUrl";

const ViewPdf = ({ route }) => {
  const { uri, base64 } = route.params;
  const sourceUri = baseUrl + "/" + uri;
  let source = {};
  if (base64) {
    source = {
      base64: base64,
    };
  } else {
    source = {
      uri: sourceUri,
    };
  }

  return <PDFReader source={source} withScroll={true} withPinchZoom={true} />;
};

export default ViewPdf;
