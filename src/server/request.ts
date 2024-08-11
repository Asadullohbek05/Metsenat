import axios from "axios";

const request = axios.create({
  baseURL: "https://metsenatclub.xn--h28h.uz/api/v1/",
  timeout: 10000,
});

export default request;
