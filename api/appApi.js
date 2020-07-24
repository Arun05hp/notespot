import axios from "axios";

const instance = axios.create({
  baseURL: "https://notespotappdb.herokuapp.com",
});
export default instance;
