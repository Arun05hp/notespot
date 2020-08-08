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
    case "isLoading":
      return { ...state, isLoading: action.payload };
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
    navigate("MainNavigator");
  } else {
    navigate("AuthNavigator");
  }
};

const clearMessage = (dispatch) => () => {
  dispatch({ type: "clear_message" });
};

const signup = (dispatch) => async ({ name, email, password }) => {
  dispatch({ type: "isLoading", payload: true });
  try {
    const response = await appApi.post("/user/signup", {
      name,
      email,
      password,
    });
    if (response.data.error) {
      dispatch({ type: "add_error", payload: response.data.error });
      dispatch({ type: "isLoading", payload: false });
    } else {
      dispatch({ type: "signup", payload: response.data });
      dispatch({ type: "isLoading", payload: false });
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: "add_error", payload: "Something went Wrong" });
    dispatch({ type: "isLoading", payload: false });
  }
};

const signin = (dispatch) => async ({ email, password }) => {
  dispatch({ type: "isLoading", payload: true });
  try {
    const response = await appApi.post("/user/signin", { email, password });
    if (response.data.error) {
      dispatch({ type: "add_error", payload: response.data.error });
      dispatch({ type: "isLoading", payload: false });
    } else {
      await AsyncStorage.setItem("token", response.data.token);
      await AsyncStorage.setItem("id", response.data.id.toString());
      dispatch({ type: "signin", payload: response.data });
      dispatch({ type: "isLoading", payload: false });
      navigate("MainFlow");
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: "add_error", payload: "Something went Wrong" });
    dispatch({ type: "isLoading", payload: false });
  }
};

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("id");
  dispatch({ type: "signout" });
  navigate("AuthFlow");
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { tryLocalSignin, signup, signin, signout, clearMessage },
  { token: null, errorMessage: "", successMessage: "", isLoading: false }
);
