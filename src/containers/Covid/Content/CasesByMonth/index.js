import SectionTitle from "../../../../components/SectionTitle";
import StackedBarSection from "../../StackedBarSection";

export default function CasesByMonth({ data: { monthly } }) {
  if (!monthly) return null;
  return <div>
    <SectionTitle title={`Приказ промене стања за сваки месец појединачно`} />
    <StackedBarSection data={monthly.bar} />
  </div>
}