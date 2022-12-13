import { useState } from "react";
import { client } from "../api/CreateUrl";

export const useHandleCheckbox = () => {
    const [prefPopulation, setPrefPopulation] = useState([]);
    const [prefectureName, setPrefectureName] = useState([]);
    
    const handleCheckbox = (event) => {
        const copyPrefPopulation = prefPopulation.slice();
        const isChecked = event.target.checked;
        const checkedPrefName = event.target.name;
        const checkedPrefCode = event.target.id;
    
        if (isChecked) {
          // prefNameをsetPrefectureNameに代入する
          setPrefectureName([...prefectureName, checkedPrefName]);
    
          // 人口情報を取得する
          client
            .get(
              `/population/composition/perYear?prefCode=${checkedPrefCode}`,
              {
                headers: { "X-API-KEY": process.env.REACT_APP_RESAS_API_KEY },
              },
            )
            .then((res) => {
              copyPrefPopulation.push({
                name: checkedPrefName,
                data: res.data.result.data[0].data,
              });
              setPrefPopulation(copyPrefPopulation);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          const copyPrefName = [...prefectureName];
          const deleteIndex = copyPrefPopulation.findIndex(
            (prefInfo) => prefInfo.name === checkedPrefName,
          );
    
          const removePrefName = copyPrefName.filter(
            (prefName) => prefName !== checkedPrefName,
          );
          copyPrefPopulation.splice(deleteIndex, 1);
    
          setPrefectureName(removePrefName);
          setPrefPopulation(copyPrefPopulation);
        }
      };

      return {
        prefPopulation,
        prefectureName,
        handleCheckbox
      };
}
