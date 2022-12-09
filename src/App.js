import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [prefectures, setPrefectures] = useState([]);

  useEffect(() => {
    // 都道府県一覧を取得する
    axios
      .get("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
        headers: { "X-API-KEY": process.env.REACT_APP_RESAS_API_KEY },
      })
      .then((res) => {
        setPrefectures(res.data.result)
      })
      .catch((error) => {
        console.log(error)
      })
    }, []);
    console.log(prefectures.map((prefecture) => {
      return prefecture.prefName
    }))
  
  return(
    <>
      <h1>yumemi-front-test</h1>
      <h2>都道府県</h2>
      {prefectures.map((prefecture) => {
        return(
          <>
            <label>
              <input 
                type="checkbox"
              />
              {prefecture.prefName}
            </label>
          </>
        );
      })}
    </>
  );
}

export default App;
