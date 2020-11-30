import SectionTitle from "../../../../components/SectionTitle";
import LineChartSection from "../../LineChartSection";

export default function CasesOvertime({ data: { monthly } }) {
  if (!monthly) return null;
  const confirmed = [];
  const deaths = [];
  const tested = [];
  const hospitalized = [];
  monthly.forEach(({ sumPositive, sumDeaths, sumTested, sumHospitalized, date }) => {
    const d = new Date(date);
    const ts = Date.UTC(d.getFullYear(), d.getMonth(), 1);

    confirmed.push([ts, sumPositive]);
    deaths.push([ts, sumDeaths]);
    tested.push([ts, sumTested]);
    hospitalized.push([ts, sumHospitalized]);
  })
  return <div>
    <SectionTitle title={`Приказ промене стања током времена`} />
    <LineChartSection data={{
      confirmed,
      deaths,
      tested,
      hospitalized
    }} />
  </div>
}