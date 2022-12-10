import axios from "axios";
import Highcharts from 'highcharts';
import HighchartsReact from "highcharts-react-official";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [prefectures, setPrefectures] = useState([]);
  const [prefPopulation, setPrefPopulation] = useState([]);
  const [prefectureName, setPrefectureName] = useState([]);

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

  const handleCheckbox = (event) => {
    const isChecked = event.target.checked

    // チェックをつけた時の処理
    if(isChecked)
    {
      // prefCodeを変数idに代入する
      let id = event.target.id
      // prefNameをsetPrefectureNameに代入する
      setPrefectureName(event.target.name)

      // 人口情報を取得する
      axios
        .get(`https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${id}`, {
          headers: { "X-API-KEY": process.env.REACT_APP_RESAS_API_KEY },
        })
        .then((res) => {
          setPrefPopulation(res.data.result.data[0].data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    // チェックを外した時の処理
    else
    {
      const removePrefName = [prefectureName]
      const removePrefPopulation = [prefPopulation]
      removePrefName.splice(0, 1)
      removePrefPopulation.splice(0, 1)
      setPrefectureName(removePrefName)
      setPrefPopulation(removePrefPopulation)
    }
  }

  // 年度を定数yearsに代入する
  const years = prefPopulation.map(population => population.year)

  // 年度を定数seriesに代入する
  const series = {
    name: prefectureName,
    data: prefPopulation.map(population => population.value),
  }

  // Highchartsのグラフを作成
  const options = {
    chart: {
      type: 'line'
    },
    title: {
      text: "総人口推移",
    },
    xAxis: {
      title: {
        text: "年度",
      },
      categories: years,
    },
    yAxis: {
      title: {
        text: "人口数",
      },
    },
    series: series
  }

  return(
    <>
      <h1>yumemi-front-test</h1>
      <h2>都道府県</h2>
      {prefectures.map((prefecture, index) => {
        return(
          <>
            <label>
              <input 
                key={index + 1}
                id={prefecture.prefCode}
                name={prefecture.prefName}
                type="checkbox"
                onChange={(event) => handleCheckbox(event)}
              />
              {prefecture.prefName}
            </label>
          </>
        );
      })}
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
}

export default App;
