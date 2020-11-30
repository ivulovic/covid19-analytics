import SectionTitle from "../../../../components/SectionTitle";
import StackedBarSection from "../../StackedBarSection";

export default function CasesByMonth({ data: { monthly } }) {
  if (!monthly) return null;
  const confirmed = [];
  const deaths = [];
  const tested = [];
  const hospitalized = [];
  monthly.forEach(({ sumPositive, sumDeaths, sumTested, sumHospitalized, date }, i) => {
    const d = new Date(date);
    const ts = Date.UTC(d.getFullYear(), d.getMonth(), 1);
    const confirmedValue = i === 0 ? sumPositive : sumPositive - monthly[i - 1].sumPositive;
    const deathsValue = i === 0 ? sumDeaths : sumDeaths - monthly[i - 1].sumDeaths;
    const testedValue = i === 0 ? sumTested : sumTested - monthly[i - 1].sumTested;
    const hospitalizedValue = i === 0 ? sumHospitalized : sumHospitalized - monthly[i - 1].sumHospitalized;

    confirmed.push([ts, confirmedValue]);
    deaths.push([ts, deathsValue]);

    tested.push([ts, testedValue]);
    hospitalized.push([ts, hospitalizedValue]);
  })
  return <div>
    <SectionTitle title={`Приказ промене стања за сваки месец појединачно`} />
    <StackedBarSection data={{
      confirmed,
      deaths,
      tested,
      hospitalized,
    }} />
  </div>
}