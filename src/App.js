import axios from "axios";
import Highcharts from 'highcharts';
import HighchartsReact from "highcharts-react-official";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [prefectures, setPrefectures] = useState([]);
  const [prefPopulation, setPrefPopulation] = useState([]);
  const [prefectureName, setPrefectureName] = useState([]);
  const copyPrefPopulation = prefPopulation.slice();

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
    const checkedPrefName = event.target.name
    const checkedPrefCode = event.target.id

    // チェックをつけた時の処理
    if(isChecked)
    {
      // prefNameをsetPrefectureNameに代入する
      setPrefectureName([...prefectureName, checkedPrefName])

      // 人口情報を取得する
      axios
        .get(`https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${checkedPrefCode}`, {
          headers: { "X-API-KEY": process.env.REACT_APP_RESAS_API_KEY },
        })
        .then((res) => {
          copyPrefPopulation.push({
            name: checkedPrefName,
            data: res.data.result.data[0].data,
          });
          setPrefPopulation(copyPrefPopulation);
        })
        .catch((error) => {
          console.log(error)
        })
    }
    // チェックを外した時の処理
    else
    {
      const copyPrefName = [...prefectureName]
      const deleteIndex = copyPrefPopulation.findIndex(prefInfo => prefInfo.name === checkedPrefName)

      const removePrefName = copyPrefName.filter(prefName => prefName !== checkedPrefName)
      copyPrefPopulation.splice(deleteIndex, 1)

      setPrefectureName(removePrefName)
      setPrefPopulation(copyPrefPopulation)
    }
  }

  // 年度を定数yearsに代入する
  const years = prefPopulation.map(item => item.data.map(population => population.year))[0]

  // 都道府県名とその人口情報をを定数seriesに代入する
  const series = [];
  const populationData = prefPopulation.map(item => item.data.map(population => population.value))
  for (const index in prefectureName) {
    series.push({
      name: prefectureName[index],
      data: populationData[index],
    });
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
    series: series,
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
