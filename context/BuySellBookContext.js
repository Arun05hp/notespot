import appApi from "../api/appApi";
import createDataContext from "../context/createDataContext";

const buySellBookReducer = (state, action) => {
  switch (action.type) {
    case "add_message":
      return {
        ...state,
        errorMessage: action.payload.error,
        successMessage: action.payload.success,
      };
    case "get_Books":
      return {
        ...state,
        errorMessage: "",
        successMessage: "",
        bookLists: action.payload,
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

const sellBook = (dispatch) => async ({
  userId,
  bookName,
  authorName,
  publisherName,
  description,
  price,
  imgUri,
}) => {
  if (!bookName || !authorName || !publisherName || !description) {
    dispatch({
      type: "add_message",
      payload: { error: "All Fields Required", success: "" },
    });
    return null;
  }
  try {
    dispatch({ type: "isLoading", payload: true });
    let data = new FormData();
    data.append("userId", userId);
    data.append("bookName", bookName);
    data.append("authorName", authorName);
    data.append("publisherName", publisherName);
    data.append("description", description);
    data.append("price", price);
    data.append("imgData", {
      uri: imgUri,
      name: `userProfile-${userId}.jpeg`,
      type: "application/pdf",
      type: "image/jpeg",
    });
    const response = await appApi.post("/user/sellBook", data, {
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
    console.log(error);
    dispatch({
      type: "add_message",
      payload: { error: "Something Went Wrong", success: "" },
    });
    dispatch({ type: "isLoading", payload: false });
  }
};

const getBooks = (dispatch) => async () => {
  dispatch({ type: "isLoading", payload: true });
  try {
    const response = await appApi.get("/user/getbooksData");
    if (response.data.error) {
      dispatch({
        type: "add_message",
        payload: { error: response.data.error, success: "" },
      });
      dispatch({ type: "isLoading", payload: false });
    } else {
      dispatch({ type: "get_Books", payload: response.data });
      dispatch({ type: "isLoading", payload: false });
    }
  } catch (error) {
    dispatch({
      type: "add_message",
      payload: { error: "Something Went Wrong", success: "" },
    });
    dispatch({ type: "isLoading", payload: false });
  }
};

export const { Provider, Context } = createDataContext(
  buySellBookReducer,
  { sellBook, getBooks, clearMessage },
  { bookLists: [], errorMessage: "", successMessage: "", isLoading: false }
);
