import axios from "axios";
import { AsyncStorage } from "react-native";

import baseUrl from "./baseUrl";
const instance = axios.create({
  baseURL: baseUrl,
});
instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `NSApp ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
export default instance;
