import axios from "axios";

export const client = axios.create({
  baseURL: "https://opendata.resas-portal.go.jp/api/v1",
});
