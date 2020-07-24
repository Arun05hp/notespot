import { AsyncStorage } from "react-native";
import appApi from "../api/appApi";
import createDataContext from "./createDataContext";
import { navigate } from "../navigation/navigationRef";

const authReducer = (state, action) => {
  switch (action.key) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signup":
      return { errorMessage: "", token: action.payload };
    case "signin":
      return { errorMessage: "", token: action.payload };
    case "signout":
      return { errorMessage: "", token: null };
    case "clear_error":
      return { ...state, errorMessage: "" };

    default:
      return state;
  }
};

const signup = (dispatch) => async ({ name, email, password }) => {
  try {
    const response = await appApi.post("/user/signup", {
      name,
      email,
      password,
    });
    console.log(response);
    dispatch({ type: "signup", payload: response.data.token });
    // navigate("Signin");
  } catch (error) {
    console.log(error);
    dispatch({ type: "add_error", payload: "Something went Wrong" });
  }
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup },
  { token: null, errorMessage: "" }
);
