import MiniChartCard from "../../../../components/Cards/MiniChartCard";
import { renderDate, renderTimestampDate } from "../../../../utils/date.utils";
import { formatNumber } from "../../../../utils/number.utils";
import { cardsMapper } from "./data";

export default function Sparklines({ data: { monthly, daily } }) {

  const getTimestampFromDate = (date) => {
    const dateObj = new Date(date);
    const d = dateObj.getDate();
    const m = dateObj.getMonth();
    const y = dateObj.getFullYear();
    const ts = Date.UTC(y, m, d);
    return ts;
  }
  // const confirmedSumTooltip = function (datum) {
  //   const xAxisValue = this.x;
  //   const { date } = monthly[xAxisValue - 1];
  //   const ts = getTimestampFromDate(date);
  //   const label = renderTimestampDate(ts, { showDay: false });
  //   return `
  //     <b>${label}</b> <br/>
  //     Укупно регистрованих: ${formatNumber(this.y)}
  //   `;
  // }
  const monthlyTooltip = (description) => function () {
    const xAxisValue = this.x;
    const { date } = monthly[xAxisValue - 1];
    const ts = getTimestampFromDate(date);
    const label = renderTimestampDate(ts, { showDay: false });
    return `
      <b>${label}</b> <br/>
      ${description}: ${formatNumber(this.y)}
    `;
  }

  const dailyTooltip = (description) => function () {
    const { date } = currentMonthDailyData[this.x - 1]
    return `
      <b>${renderDate(date)}</b> <br/>
      ${description}: ${formatNumber(this.y)}
    `;
  }
  // const confirmedTooltip = function () {
  //   const { date } = currentMonthDailyData[this.x - 1]
  //   return `
  //     <b>${renderDate(date)}</b> <br/>
  //     Потврђених: ${formatNumber(this.y)}
  //   `;
  // }
  // const deathsTooltip = function () {
  //   const { date } = currentMonthDailyData[this.x - 1]
  //   return `
  //     <b>${renderDate(date)}</b> <br/>
  //     Преминулих: ${formatNumber(this.y)}
  //   `;
  // }
  if (!monthly || !daily) return null;
  const currentMonth = new Date().getMonth();
  const currentMonthDailyData = [];

  for (let i = daily.length - 1; i >= 0; i--) {
    const { date } = daily[i];
    const dateObj = new Date(date);
    if (dateObj.getMonth() < currentMonth) {
      break;
    }
    currentMonthDailyData.unshift(daily[i]);
  }
  const lastDailyRecord = daily[daily.length - 1];
  console.log(lastDailyRecord)
  return <div className="cards-container">

    <MiniChartCard title="Укупно број тестираних лица"
      chartData={monthly.map(({ sumTested }) => sumTested).join(', ')}
      seriesOptions={{
        color: '#3b4863'
      }}
      tooltipFormatter={monthlyTooltip('Укупно тестираних')}
      value={lastDailyRecord.sumTested}
    // growth={{ value: -16, text: " критично" }}
    />


    <MiniChartCard title="Укупан број регистрованих лица"
      seriesOptions={{
        color: '#10b759',
        // color: '#3b4863'
      }}
      chartData={monthly.map(({ sumPositive }) => sumPositive).join(', ')}
      value={lastDailyRecord.sumPositive}
      tooltipFormatter={monthlyTooltip('Укупно регистрованих')}
      growth={{ value: lastDailyRecord.percentOfInfectedSumComparedWithTestedSum + '%', text: " укупно тестираних лица" }}

    />

    <MiniChartCard title="Број тестираних у последња 24 часа"
      chartData={currentMonthDailyData.map(({ testedForDate }) => testedForDate).join(', ')}
      seriesOptions={{
        color: '#00b8d4'
        // color: '#3b4863'
      }}
      tooltipFormatter={dailyTooltip('Број тестираних')}
      value={lastDailyRecord.testedForDate}
    // growth={{ value: -16, text: " критично" }}
    />


    <MiniChartCard title="Број потврђених у последња 24 часа"
      chartData={currentMonthDailyData.map(({ positiveForDate }) => positiveForDate).join(', ')}
      seriesOptions={{
        color: '#6B6DEE',
        // color: '#3b4863'
      }}
      tooltipFormatter={dailyTooltip('Број потврђених')}
      value={lastDailyRecord.positiveForDate}
      growth={{ value: lastDailyRecord.percentOfInfectedComparedWithTestedForDate + '%', text: " тестираних лица" }}
    />

    <MiniChartCard title="Број хоспитализованих у последња 24 часа"
      chartData={currentMonthDailyData.map(({ hospitalizedForDate }) => hospitalizedForDate).join(', ')}
      seriesOptions={{
        color: '#ffc107',
        // color: '#3b4863'
      }}
      tooltipFormatter={dailyTooltip('Број хоспитализованих')}
      value={lastDailyRecord.hospitalizedForDate}
      growth={{ value: lastDailyRecord.percentOfHospitalizedComparedWithInfectedSumForDate + '%', text: " укупно позитивних лица" }}
    />


    <MiniChartCard title="Број преминулих у последња 24 часа"
      chartData={currentMonthDailyData.map(({ deathsForDate }) => deathsForDate).join(', ')}
      seriesOptions={{
        color: '#dc3545',
        // color: '#3b4863'
      }}
      tooltipFormatter={dailyTooltip('Број преминулих')}
      value={lastDailyRecord.deathsForDate}
    // growth={{ value: -16, text: " критично" }}
    />
  </div>
}