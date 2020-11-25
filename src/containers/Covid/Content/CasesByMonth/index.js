import SectionTitle from "../../../../components/SectionTitle";
import StackedBarSection from "../../StackedBarSection";

export default function CasesByMonth({ data: { monthly } }) {
  if (!monthly) return null;
  const confirmed = [];
  const deaths = [];
  monthly.forEach(({ sumPositive, sumDeaths, date }, i) => {
    const d = new Date(date);
    const ts = Date.UTC(d.getFullYear(), d.getMonth(), 1);
    const confirmedValue = i === 0 ? sumPositive : sumPositive - monthly[i - 1].sumPositive;
    const deathsValue = i === 0 ? sumDeaths : sumDeaths - monthly[i - 1].sumDeaths;
    confirmed.push([ts, confirmedValue]);
    deaths.push([ts, deathsValue]);
  })
  return <div>
    <SectionTitle title={`Приказ промене стања за сваки месец појединачно`} />
    <StackedBarSection data={{
      confirmed,
      deaths
    }} />
  </div>
}