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
    case "get_college_data":
      return {
        ...state,
        collegeData: { ...action.payload },
      };
    case "clear_state":
      return {
        ...state,
        errorMessage: "",
        userData: {},
        collegeData: {},
        successMessage: "",
      };
    case "clear_message":
      return { ...state, errorMessage: "", successMessage: "" };
    case "isUpdating":
      return { ...state, isUpdating: action.payload };

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

const getCollegeDetails = (dispatch) => async () => {
  const userId = await AsyncStorage.getItem("id");
  try {
    const response = await appApi.post("/user/getCollegeData", { userId });
    if (response.data.error) {
      dispatch({
        type: "add_message",
        payload: { error: response.data.error, success: "" },
      });
    } else {
      dispatch({ type: "get_college_data", payload: response.data });
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
  dispatch({ type: "isUpdating", payload: true });
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
      dispatch({ type: "isUpdating", payload: false });
    } else {
      dispatch({
        type: "add_message",
        payload: { error: "", success: response.data.success },
      });
      dispatch({ type: "isUpdating", payload: false });
    }
  } catch (error) {
    dispatch({
      type: "add_message",
      payload: { error: "Something Went Wrong", success: "" },
    });
    dispatch({ type: "isUpdating", payload: false });
  }
};

const updateCollegeDetails = (dispatch) => async (data) => {
  dispatch({ type: "isUpdating", payload: true });
  try {
    const response = await appApi.post("/user/updateCollegeDetails", data);
    if (response.data.error) {
      dispatch({
        type: "add_message",
        payload: { error: response.data.error, success: "" },
      });
      dispatch({ type: "isUpdating", payload: false });
    } else {
      dispatch({
        type: "add_message",
        payload: { error: "", success: response.data.success },
      });
      dispatch({ type: "isUpdating", payload: false });
    }
  } catch (error) {
    dispatch({
      type: "add_message",
      payload: { error: "Something Went Wrong", success: "" },
    });
    dispatch({ type: "isUpdating", payload: false });
  }
};

export const { Provider, Context } = createDataContext(
  userReducer,
  {
    getUserData,
    getCollegeDetails,
    uploadImage,
    clearState,
    updateProfile,
    clearMessage,
    updateCollegeDetails,
  },
  {
    userData: {},
    collegeData: {},
    errorMessage: "",
    successMessage: "",
    isUpdating: false,
  }
);
