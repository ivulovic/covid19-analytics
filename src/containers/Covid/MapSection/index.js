import { useEffect, useState } from "react";
import MapChart from "../../../components/Charts/Map";
const statisticPayload = JSON.stringify({ "dataSetId": 2, "refCodes": [{ "id": 2, "code": "COVID-19 статистике изолације", "values": [{ "id": 3, "name": "Број самоизолованих" }] }], "territoryIds": [168, 40, 41, 169, 170, 42, 43, 44, 45, 46, 171, 172, 173, 174, 47, 175, 176, 177, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 215, 76, 77, 78, 79, 210, 80, 178, 216, 81, 217, 218, 82, 242, 83, 163, 164, 84, 219, 85, 86, 220, 179, 87, 88, 180, 89, 90, 243, 181, 221, 91, 182, 183, 222, 133, 184, 223, 185, 92, 224, 93, 94, 186, 187, 95, 225, 226, 238, 96, 97, 98, 99, 100, 188, 101, 102, 103, 153, 104, 227, 105, 228, 106, 107, 108, 109, 110, 111, 189, 112, 113, 114, 115, 116, 117, 190, 191, 192, 118, 193, 229, 230, 194, 231, 119, 195, 196, 120, 121, 232, 197, 122, 198, 233, 123, 124, 125, 126, 234, 127, 235, 128, 129, 130, 131, 132, 199, 134, 135, 200, 201, 136, 137, 138, 139, 202, 236, 203, 204, 205, 206, 207, 237, 140, 208, 209, 142, 143, 144, 145, 146, 147, 148, 141, 239, 149, 150, 151, 211, 152, 212, 240, 241], "territoryGroupId": 5, "number": 10, "dimTime": "2020-10-13" });
export default function MapSection() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      // const cities = await fetch('https://raw.githubusercontent.com/ivulovic/serbia/main/cities.json').then(raw => raw.json()).then(c => c);
      // console.log(cities);
      setLoading(false);
    }
    fetchData();
  }, [])
  return <div>
    <MapChart loading={loading} />
  </div>
}