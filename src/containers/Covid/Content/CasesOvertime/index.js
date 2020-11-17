import LineChartSection from "../../LineChartSection";

export default function CasesOvertime({ data: { monthly } }) {
  if (!monthly) return null;
  return <div>
    <h3 className="section-title">ПРИКАЗ ПРОМЕНЕ СТАЊА ТОКОМ ВРЕМЕНА</h3>
    <LineChartSection data={monthly.line} labels={monthly.labels} />
  </div>
}