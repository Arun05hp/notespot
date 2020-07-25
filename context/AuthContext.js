import { AsyncStorage } from "react-native";
import appApi from "../api/appApi";
import createDataContext from "./createDataContext";
import { navigate } from "../navigation/navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload, successMessage: "" };
    case "signup":
      return {
        errorMessage: "",
        successMessage: action.payload.success,
        token: action.payload.token,
      };
    case "signin":
      return {
        errorMessage: "",
        successMessage: "",
        token: action.payload.token,
      };
    case "signout":
      return { errorMessage: "", successMessage: "", token: null };
    case "clear_message":
      return { ...state, errorMessage: "", successMessage: "" };

    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({
      type: "signin",
      payload: token,
    });
    navigate("MainFlow");
  } else {
    navigate("AuthFlow");
  }
};

const clearMessage = (dispatch) => () => {
  dispatch({ type: "clear_message" });
};

const signup = (dispatch) => async ({ name, email, password }) => {
  try {
    const response = await appApi.post("/user/signup", {
      name,
      email,
      password,
    });
    if (response.data.error) {
      dispatch({ type: "add_error", payload: response.data.error });
    } else {
      dispatch({ type: "signup", payload: response.data });
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: "add_error", payload: "Something went Wrong" });
  }
};

const signin = (dispatch) => async ({ email, password }) => {
  try {
    const response = await appApi.post("/user/signin", { email, password });
    if (response.data.error) {
      dispatch({ type: "add_error", payload: response.data.error });
    } else {
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "signin", payload: response.data });
      navigate("MainFlow");
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: "add_error", payload: "Something went Wrong" });
  }
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { tryLocalSignin, signup, signin, clearMessage },
  { token: null, errorMessage: "", successMessage: "" }
);
