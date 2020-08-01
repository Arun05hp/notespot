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

const uploadPdf = (dispatch) => async ({
  userId,
  topicName,
  category,
  description,
  fileName,
  uri,
}) => {
  if (!topicName || !category || !fileName || !uri) {
    dispatch({
      type: "add_message",
      payload: { error: "Required Topic Name and Category", success: "" },
    });
    return;
  }
  try {
    let data = new FormData();
    data.append("userId", userId);
    data.append("topicName", topicName);
    data.append("category", category);
    data.append("description", description);
    data.append("pdfData", {
      uri: uri,
      name: fileName,
      type: "application/pdf",
    });
    const response = await appApi.post("/user/pdfupload", data, {
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
    } else {
      dispatch({
        type: "add_message",
        payload: { error: "", success: response.data.success },
      });
    }
  } catch (error) {
    dispatch({
      type: "add_message",
      payload: { error: "Something Went Wrong", success: "" },
    });
  }
};

export const { Provider, Context } = createDataContext(
  pdfReducer,
  { uploadPdf, clearMessage },
  { errorMessage: "", successMessage: "", isUpdating: false }
);
