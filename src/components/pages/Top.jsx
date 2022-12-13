import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useGetPrefectures } from "../../hooks/useGetPrefectures";
import { useHandleCheckbox } from "../../hooks/useHandleCheckbox";
import { CheckboxTitle } from "../atoms/CheckboxTitle";
import { Title } from "../atoms/Title";

export const Top = () => {
    const { prefectures } = useGetPrefectures();
    const { prefPopulation, prefectureName, handleCheckbox} = useHandleCheckbox();
  
    const years = prefPopulation?.map((item) =>
      item?.data?.map((population) => population.year),
    )[0];
  
    const series = [];
    const populationData = prefPopulation?.map((item) =>
      item?.data?.map((population) => population.value),
    );
    for (const index in prefectureName) {
      series.push({
        name: prefectureName[index],
        data: populationData[index],
      });
    }
  
    // Highchartsのグラフを作成
    const options = {
      chart: {
        type: "line",
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
    };
  
    return (
      <>
        <Title>yumemi-front-test</Title>
        <CheckboxTitle>都道府県</CheckboxTitle>
        {prefectures &&
          prefectures.map((prefecture, index) => {
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
