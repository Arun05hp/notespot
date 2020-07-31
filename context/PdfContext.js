import appApi from "../api/appApi";
import createDataContext from "../context/createDataContext";

const pdfReducer = (state, action) => {
  switch (action.type) {
    case "add_message":
      return {
        ...state,
        errorMessage: action.payload.error,
        successMessage: action.payload.success,
      };
    case "clear_message":
      return { ...state, errorMessage: "", successMessage: "" };
    default:
      return state;
  }
};

const clearMessage = (dispatch) => () => {
  dispatch({ type: "clear_message" });
};

const uploadPdf = (dispatch) => async (fileDetails) => {
  console.log("file", fileDetails);
};

export const { Provider, Context } = createDataContext(
  pdfReducer,
  { uploadPdf, clearMessage },
  { errorMessage: "", successMessage: "", isUpdating: false }
);
