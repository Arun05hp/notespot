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
    case "get_pdfs":
      return {
        ...state,
        errorMessage: "",
        successMessage: "",
        pdfLists: action.payload,
      };
    case "clear_message":
      return { ...state, errorMessage: "", successMessage: "" };
    case "isLoading":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

const clearMessage = (dispatch) => () => {
  dispatch({ type: "clear_message" });
};

const uploadPdf = (dispatch) => async ({
  userId,
  topicName,
  category,
  description,
  fileData,
}) => {
  try {
    dispatch({ type: "isLoading", payload: true });
    let data = new FormData();
    data.append("userId", userId);
    data.append("topicName", topicName);
    data.append("category", category);
    data.append("description", description);
    data.append("pdfData", {
      uri: fileData.uri,
      name: fileData.fileName,
      type: "application/pdf",
    });
    const response = await appApi.post("/user/app/pdfupload", data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.data.error) {
      dispatch({
        type: "add_message",
        payload: { error: response.data.error, success: "" },
      });
      dispatch({ type: "isLoading", payload: false });
    } else {
      dispatch({
        type: "add_message",
        payload: { error: "", success: response.data.success },
      });
      dispatch({ type: "isLoading", payload: false });
      return true;
    }
  } catch (error) {
    dispatch({
      type: "add_message",
      payload: { error: "Something Went Wrong", success: "" },
    });
    dispatch({ type: "isLoading", payload: false });
  }
};

const getPdfs = (dispatch) => async () => {
  try {
    const response = await appApi.get("/user/app/getPdfs");
    if (response.data.error) {
      return false;
    } else {
      dispatch({ type: "get_pdfs", payload: response.data });
      return true;
    }
  } catch (error) {
    return false;
  }
};

export const { Provider, Context } = createDataContext(
  pdfReducer,
  { uploadPdf, getPdfs, clearMessage },
  { pdfLists: [], errorMessage: "", successMessage: "", isLoading: false }
);
