// import { useState, useEffect } from 'react';

// import MiniChartCard from "../../../components/Cards/MiniChartCard";
// import PageTitle from "../../../components/PageTitle";
// import { months, renderDate } from '../../../utils/date.utils';
// import { formatNumber } from '../../../utils/number.utils';
// import LineChartSection from '../LineChartSection';
// import StackedBarSection from '../StackedBarSection';

// export default function SparklineSection() {
//   const [loading, setLoading] = useState(true);
//   const [rawData, setRawData] = useState();
//   const [chartData, setChartData] = useState({});
//   const [dailyData, setDailyData] = useState({});
//   const [dailyDate, setDailyDate] = useState(new Date().toISOString().split('T')[0]);
//   useEffect(() => {
//     // https://github.com/igr/c19json
//     fetch('https://raw.githubusercontent.com/igr/c19json/master/covid19-jhc.json')
//       .then(res => res.json())
//       .then(d => {
//         setRawData(d);
//         setupData('monthly', d);
//       })
//   }, []);
//   useEffect(() => {
//     if (rawData && dailyDate) {
//       setupDailyData(dailyDate, rawData);
//     }
//   }, [dailyDate, rawData])

//   const getDateString = (d) => {
//     return new Date(d).toISOString().split('T')[0];
//   }
//   const setupDailyData = (inputDate, d) => {
//     const currentMonth = new Date(inputDate).getMonth();
//     const labels = [];
//     const dataSorted = {
//       line: {
//         confirmed: [],
//         recovered: [],
//         deaths: [],
//       },
//     };

//     const monthData = d.serbia.filter(({ date }) => new Date(date).getMonth() === currentMonth);
//     const firstDayOfMonth = new Date(monthData[0].date);
//     let lastDateInPreviousMonth = firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 1)
//     let [lastDayInPreviousMonth] = new Date(lastDateInPreviousMonth).toISOString().split('T');
//     const lastDayInPreviousMonthData = d.serbia.find(({ date }) => date === lastDayInPreviousMonth) || { confirmed: 0, recovered: 0, deaths: 0 };
//     monthData.map(({ date, confirmed, recovered, deaths }, i) => {
//       labels.push(date);
//       const hasPreviousDay = monthData[i - 1] !== undefined;

//       if (confirmed > 0) {
//         dataSorted['line'].confirmed.push(hasPreviousDay ? parseInt(confirmed) - monthData[i - 1].confirmed : parseInt(confirmed) - lastDayInPreviousMonthData.confirmed);
//       } else {
//         dataSorted['line'].confirmed.push(0);
//       }
//       if (recovered > 0) {
//         dataSorted['line'].recovered.push(hasPreviousDay ? parseInt(recovered) - monthData[i - 1].recovered : parseInt(recovered) - lastDayInPreviousMonthData.recovered);
//       } else {
//         dataSorted['line'].recovered.push(0);
//       }
//       if (deaths > 0) {
//         const value = hasPreviousDay ? parseInt(deaths) - monthData[i - 1].deaths : parseInt(deaths) - lastDayInPreviousMonthData.deaths
//         // dataSorted['line'].deaths.push(value < 0 ? deaths : value);
//         dataSorted['line'].deaths.push(value);
//       } else {
//         dataSorted['line'].deaths.push(deaths)
//       }
//     })
//     dataSorted.labels = labels;
//     setDailyData({
//       daily: dataSorted
//     })
//     setLoading(false)
//   }
//   const setupData = (period, dataToMap) => {
//     switch (period) {
//       case 'monthly': {
//         const labels = [];
//         const dataSorted = {
//           line: {},
//           bar: {},
//           l: {
//             confirmed: [],
//             recovered: [],
//             deaths: [],
//           },
//           b: {
//             confirmed: [],
//             recovered: [],
//             deaths: [],
//           }
//         };
//         let counter = 0;
//         dataToMap.serbia.forEach(({ date, confirmed, recovered, deaths }, i) => {
//           const d = new Date(date);
//           const isLastRecord = dataToMap.serbia.length - 1 === i;
//           const y = d.getFullYear();
//           const m = d.getMonth() + 1;
//           const day = d.getDate();
//           const lastDay = isLastRecord ? day : new Date(y, m, 0).getDate();
//           if (day !== lastDay) {
//             return;
//           }
//           const ts = Date.UTC(y, m - 1, 1)
//           if (!labels.includes(ts)) {
//             labels.push(ts);
//             const hasPreviousMonth = counter > 0;
//             dataSorted['l'].confirmed.push([ts, parseInt(confirmed)]);
//             // dataSorted['l'].recovered.push([ts, parseInt(recovered)]);
//             dataSorted['l'].deaths.push([ts, parseInt(deaths)]);

//             dataSorted['b'].confirmed.push([ts, hasPreviousMonth ? parseInt(confirmed) - dataSorted['l'].confirmed[counter - 1][1] : parseInt(confirmed)]);
//             // dataSorted['b'].recovered.push([ts, hasPreviousMonth ? parseInt(recovered) - dataSorted['l'].recovered[counter - 1][1] : parseInt(recovered)]);
//             dataSorted['b'].deaths.push([ts, hasPreviousMonth ? parseInt(deaths) - dataSorted['l'].deaths[counter - 1][1] : parseInt(deaths)]);
//             counter += 1;
//           }
//         })
//         setChartData({
//           labels,
//           line: dataSorted.l,
//           bar: dataSorted.b,
//         })
//         return;
//       }

//       default: break;
//     }
//   }
//   const sum = (accumulator, currentValue) => accumulator + currentValue;
//   if (loading) return null;
//   const confirmedSumTooltip = function () {
//     return `
//       <b>${months[this.x - 1]}</b> <br/>
//       Укупно регистрованих: ${formatNumber(this.y)}
//     `;
//   }
//   const confirmedTooltip = function () {
//     return `
//       <b>${renderDate(dailyData.daily.labels[this.x - 1])}</b> <br/>
//       Потврђених: ${formatNumber(this.y)}
//     `;
//   }
//   const deathsTooltip = function () {
//     return `
//       <b>${renderDate(dailyData.daily.labels[this.x - 1])}</b> <br/>
//       Преминулих: ${formatNumber(this.y)}
//     `;
//   }
//   const decreaseDailyMonth = () => {
//     const newDateTs = new Date(dailyDate).setMonth(new Date(dailyDate).getMonth() - 1);
//     if (new Date(newDateTs) < new Date(firstDate).getTime()) {
//       return;
//     }
//     const newDate = getDateString(newDateTs);
//     setDailyDate(newDate);
//   }
//   const increaseDailyMonth = () => {
//     const newDateTs = new Date(dailyDate).setMonth(new Date(dailyDate).getMonth() + 1);
//     if (new Date(newDateTs) > new Date().getTime()) {
//       return;
//     }
//     const newDate = getDateString(newDateTs);
//     setDailyDate(newDate);
//   }

//   if (loading) return null;
//   const firstDate = rawData.serbia[0].date;
//   return <div>
//     <PageTitle title="Аналитика вируса корона у Републици Србији" />
//     <div className="cards-container">
//       <MiniChartCard title="УКУПАН БРОЈ РЕГИСТРОВАНИХ СЛУЧАЈЕВА"
//         labels={chartData.labels}
//         seriesOptions={{
//           color: 'a'
//         }}
//         chartData={chartData.line.confirmed.map(([ts, value]) => value).join(', ')}
//         value={chartData.line.confirmed[chartData.line.confirmed.length - 1][1]}
//         tooltipFormatter={confirmedSumTooltip}
//       // growth={{ value: -16, text: " критично" }}
//       />
//       <MiniChartCard title="БРОЈ ПОТВРЂЕНИХ У ПОСЛЕДЊА 24 ЧАСА"
//         chartData={dailyData.daily.line.confirmed.join(', ')}
//         // seriesOptions={{
//         //   color: '#00b8d4'
//         // }}
//         tooltipFormatter={confirmedTooltip}
//         value={dailyData.daily.line.confirmed[dailyData.daily.line.confirmed.length - 1]}
//       // growth={{ value: -16, text: " критично" }} 
//       />

//       <MiniChartCard title="БРОЈ ПРЕМИНУЛИХ У ПОСЛЕДЊА 24 ЧАСА"
//         chartData={dailyData.daily.line.deaths.join(', ')}
//         // seriesOptions={{
//         //   color: '#00b8d4'
//         // }}
//         tooltipFormatter={deathsTooltip}
//         value={dailyData.daily.line.deaths[dailyData.daily.line.deaths.length - 1]}
//       // growth={{ value: -16, text: " критично" }}
//       />
//     </div>
//     <h3 className="section-title">ПРИКАЗ ПРОМЕНЕ СТАЊА ТОКОМ ВРЕМЕНА</h3>
//     <LineChartSection data={chartData.line} labels={chartData.labels} />
//     <h3 className="section-title">ПРИКАЗ ПРОМЕНЕ СТАЊА ЗА СВАКИ МЕСЕЦ ПОЈЕДИНАЧНО</h3>
//     <StackedBarSection data={chartData.bar} labels={chartData.labels} />
//     <h3 className="section-title">ДНЕВНИ ПРИКАЗ ПРОМЕНЕ СТАЊА ЗА МЕСЕЦ {months[new Date(dailyDate).getMonth()]} {new Date(dailyDate).getFullYear()}</h3>
//     <LineChartSection data={dailyData.daily.line} labels={dailyData.daily.labels} />
//     <div className="flex justify-space-between pagination">
//       <button className="button" style={{ marginRight: '10px' }} onClick={decreaseDailyMonth}>Претходни месец</button>
//       <button className="button" onClick={increaseDailyMonth}>Наредни месец</button>
//     </div>
//   </div>
// }