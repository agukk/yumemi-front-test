import { useEffect, useState } from "react";
import { client } from "../api/CreateUrl";

export const useGetPrefectures = () => {
  const [prefectures, setPrefectures] = useState([]);

  useEffect(() => {
    client
      .get("/prefectures", {
        headers: { "X-API-KEY": process.env.REACT_APP_RESAS_API_KEY },
      })
      .then((res) => {
        setPrefectures(res.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return {
    prefectures,
  };
};
