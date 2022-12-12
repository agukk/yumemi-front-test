import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "./App.css";
import { CheckboxTitle } from "./components/atoms/CheckboxTitle";
import { Title } from "./components/atoms/Title";
import { Graph } from "./lib/Graph";

function App() {
  const { prefectures, options, handleCheckbox } = Graph();

  return (
    <>
      <Title>yumemi-front-test</Title>
      <CheckboxTitle>都道府県</CheckboxTitle>
      {prefectures?.map((prefecture, index) => {
        return (
          <>
            <label>
              <input
                key={index + 1}
                id={prefecture.prefCode}
                name={prefecture.prefName}
                type='checkbox'
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
