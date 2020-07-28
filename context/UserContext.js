import { AsyncStorage } from "react-native";
import appApi from "../api/appApi";
import createDataContext from "./createDataContext";
import { navigate } from "../navigation/navigationRef";

const userReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "get_user_data":
      return { ...state, userData: { ...action.payload } };
    default:
      return state;
  }
};

const getUserData = (dispatch) => async () => {
  const userId = await AsyncStorage.getItem("id");
  try {
    const response = await appApi.post("/user/profile", { userId });
    if (response.data.error) {
      dispatch({ type: "add_error", payload: response.data.error });
    } else {
      dispatch({ type: "get_user_data", payload: response.data });
    }
  } catch (error) {
    dispatch({ type: "add_error", payload: "Something went Wrong" });
  }
};

const uploadImage = (dispatch) => async ({ id, imageUrl }) => {
  try {
    var data = new FormData();
    data.append("id", id);
    data.append("imageData", {
      uri: imageUrl,
      name: `userProfile-${id}.jpg`,
      type: "image/jpeg",
    });
    const response = await appApi.post("/user/imgupload", data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const { Provider, Context } = createDataContext(
  userReducer,
  { getUserData, uploadImage },
  { userData: {}, errorMessage: "" }
);
