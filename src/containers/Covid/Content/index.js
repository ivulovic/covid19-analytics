import { useContext } from "react/cjs/react.development";
import PageTitle from "../../../components/PageTitle";
import { DataContext } from "../DataProvider/DataContext";
import CasesByMonth from "./CasesByMonth";
import CasesOvertime from "./CasesOvertime";
import DailyCases from "./DailyCases";
import Sparklines from "./Sparklines";
import TodayDataSection from "./TodayDataSection";

export default function Content() {
  const { monthly, daily, cards, initialDate } = useContext(DataContext);
  return <div>
    <PageTitle title="Аналитика вируса корона у Републици Србији" />
    <Sparklines data={{
      monthly,
      daily,
      cards,
    }} />
    <TodayDataSection />
    <CasesOvertime data={{ monthly }} />
    <CasesByMonth data={{ monthly }} />
    <DailyCases data={{ daily }} initialDate={initialDate} />
  </div>
}