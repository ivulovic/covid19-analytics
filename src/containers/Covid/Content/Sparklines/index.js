import MiniChartCard from "../../../../components/Cards/MiniChartCard";
import { months, renderDate, renderTimestampDate } from "../../../../utils/date.utils";
import { formatNumber } from "../../../../utils/number.utils";

export default function Sparklines({ data: { monthly, daily } }) {
  const confirmedSumTooltip = function () {
    const labels = monthly.labels;
    const ts = labels[this.x - 1];
    const label = renderTimestampDate(ts, { showDay: false });
    return `
      <b>${label}</b> <br/>
      Укупно регистрованих: ${formatNumber(this.y)}
    `;
  }
  const confirmedTooltip = function () {
    return `
      <b>${renderDate(daily.labels[this.x - 1])}</b> <br/>
      Потврђених: ${formatNumber(this.y)}
    `;
  }
  const deathsTooltip = function () {
    return `
      <b>${renderDate(daily.labels[this.x - 1])}</b> <br/>
      Преминулих: ${formatNumber(this.y)}
    `;
  }
  if (!monthly || !daily) return null;
  return <div className="cards-container">
    <MiniChartCard title="УКУПАН БРОЈ РЕГИСТРОВАНИХ СЛУЧАЈЕВА"
      labels={monthly.labels}
      seriesOptions={{
        color: '#00b8d4'
      }}
      chartData={monthly.line.confirmed.map(([ts, value]) => value).join(', ')}
      value={monthly.line.confirmed[monthly.line.confirmed.length - 1][1]}
      tooltipFormatter={confirmedSumTooltip}
    // growth={{ value: -16, text: " критично" }}
    />
    <MiniChartCard title="БРОЈ ПОТВРЂЕНИХ У ПОСЛЕДЊА 24 ЧАСА"
      chartData={daily.line.confirmed.map(([ts, value]) => value).join(', ')}
      seriesOptions={{
        color: '#00b8d4'
      }}
      tooltipFormatter={confirmedTooltip}
      value={daily.line.confirmed[daily.line.confirmed.length - 1][1]}
    // growth={{ value: -16, text: " критично" }} 
    />

    <MiniChartCard title="БРОЈ ПРЕМИНУЛИХ У ПОСЛЕДЊА 24 ЧАСА"
      chartData={daily.line.deaths.map(([ts, value]) => value).join(', ')}
      seriesOptions={{
        color: '#00b8d4'
      }}
      tooltipFormatter={deathsTooltip}
      value={daily.line.deaths[daily.line.deaths.length - 1][1]}
    // growth={{ value: -16, text: " критично" }}
    />
  </div>
}