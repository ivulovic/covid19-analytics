import { useContext } from "react/cjs/react.development";
import PageTitle from "../../../components/PageTitle";
import { DataContext } from "../DataProvider/DataContext";
import CasesByMonth from "./CasesByMonth";
import CasesOvertime from "./CasesOvertime";
import DailyCases from "./DailyCases";
import Sparklines from "./Sparklines";

export default function Content() {
  const { monthly, daily, raw, initialDate, onPeriodChange } = useContext(DataContext);
  return <div>
    <PageTitle title="Аналитика вируса корона у Републици Србији" />
    <Sparklines data={{
      monthly,
      daily
    }} />
    <CasesOvertime data={{ monthly }} />
    <CasesByMonth data={{ monthly }} />
    <DailyCases data={{ daily, raw }} initialDate={initialDate} onPeriodChange={onPeriodChange} />
  </div>
}