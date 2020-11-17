import StackedBarSection from "../../StackedBarSection";

export default function CasesByMonth({ data: { monthly } }) {
  if (!monthly) return null;
  return <div>
    <h3 className="section-title">ПРИКАЗ ПРОМЕНЕ СТАЊА ЗА СВАКИ МЕСЕЦ ПОЈЕДИНАЧНО</h3>
    <StackedBarSection data={monthly.bar} labels={monthly.labels} />
  </div>
}