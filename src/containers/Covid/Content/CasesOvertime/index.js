import SectionTitle from "../../../../components/SectionTitle";
import LineChartSection from "../../LineChartSection";

export default function CasesOvertime({ data: { monthly } }) {
  if (!monthly) return null;
  return <div>
    <SectionTitle title={`Приказ промене стања током времена`} />
    <LineChartSection data={monthly.line} />
  </div>
}