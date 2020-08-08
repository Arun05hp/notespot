import { CommonActions } from "@react-navigation/native";
export const navigate = (routeName, params) => {
  navigation.dispatch(
    CommonActions.navigate({
      name: routeName,
      params,
    })
  );
};
