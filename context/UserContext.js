import { AsyncStorage } from "react-native";
import appApi from "../api/appApi";
import createDataContext from "./createDataContext";

const userReducer = (state, action) => {
  switch (action.type) {
    case "add_message":
      return {
        ...state,
        errorMessage: action.payload.error,
        successMessage: action.payload.success,
      };

    case "get_user_data":
      return {
        ...state,
        userData: { ...action.payload },
      };
    case "clear_state":
      return { ...state, errorMessage: "", userData: {}, successMessage: "" };
    case "clear_message":
      return { ...state, errorMessage: "", successMessage: "" };
    default:
      return state;
  }
};

const clearMessage = (dispatch) => () => {
  dispatch({ type: "clear_message" });
};

const clearState = (dispatch) => () => {
  dispatch({ type: "clear_state" });
};

const getUserData = (dispatch) => async () => {
  const userId = await AsyncStorage.getItem("id");
  try {
    const response = await appApi.post("/user/profile", { userId });
    if (response.data.error) {
      dispatch({
        type: "add_message",
        payload: { error: response.data.error, success: "" },
      });
    } else {
      dispatch({ type: "get_user_data", payload: response.data });
    }
  } catch (error) {
    dispatch({
      type: "add_message",
      payload: { error: "Something Went Wrong", success: "" },
    });
  }
};

const uploadImage = (dispatch) => async ({ id, imageUrl, profileImg }) => {
  try {
    var data = new FormData();
    data.append("id", id);
    data.append("imageData", {
      uri: imageUrl,
      name: `userProfile-${id}.jpg`,
      type: "image/jpeg",
    });
    data.append("profileImg", profileImg);
    const response = await appApi.post("/user/imgupload", data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateProfile = (dispatch) => async ({
  id,
  username,
  useremail,
  mobileNumber,
  userAddress,
}) => {
  try {
    const response = await appApi.post("/user/updateprofile", {
      id,
      username,
      useremail,
      mobileNumber,
      userAddress,
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
  userReducer,
  { getUserData, uploadImage, clearState, updateProfile, clearMessage },
  { userData: {}, errorMessage: "", successMessage: "" }
);
