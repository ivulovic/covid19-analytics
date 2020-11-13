import MiniChartCard from "../../components/Cards/MiniChartCard";
import PageTitle from "../../components/PageTitle";
import "./index.css";

export default function CovidPage() {
  return <main>
    <PageTitle title="Аналитика вируса корона у Републици Србији" />
    <div className="cards-container">
      <MiniChartCard title="Укупан број случајева" value={41891} growth={{ value: -16, text: " критично" }} />
      <MiniChartCard title="Укупан број случајева" value={41891} growth={{ value: -16, text: " критично" }} />
      <MiniChartCard title="Укупан број случајева" value={41891} growth={{ value: -16, text: " критично" }} />
    </div>
  </main>
}