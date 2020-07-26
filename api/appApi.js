import axios from "axios";

const instance = axios.create({
  baseURL: "https://nebula-boiling-yuzu.glitch.me",
  // baseURL: "http://192.168.43.122:3000",
});
export default instance;
