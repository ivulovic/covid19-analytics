import SectionTitle from "../../../../components/SectionTitle";
import LineChartSection from "../../LineChartSection";

export default function CasesOvertime({ data: { monthly } }) {
  if (!monthly) return null;
  const confirmed = [];
  const deaths = [];
  monthly.forEach(({ sumPositive, sumDeaths, date }) => {
    const d = new Date(date);
    const ts = Date.UTC(d.getFullYear(), d.getMonth(), 1);

    confirmed.push([ts, sumPositive]);
    deaths.push([ts, sumDeaths]);
  })
  return <div>
    <SectionTitle title={`Приказ промене стања током времена`} />
    <LineChartSection data={{
      confirmed,
      deaths,
    }} />
  </div>
}