import { useState, useEffect } from "react";
import SectionTitle from "../../../../components/SectionTitle";
import { months } from "../../../../utils/date.utils";
import LineChartSection from "../../LineChartSection";

export default function DailyCases({ data: { daily: initialDailyData } }) {
  const initialDate = new Date().toISOString().split('T')[0];

  const [dailyDate, setDailyDate] = useState(initialDate);
  const [daily, setDaily] = useState();

  useEffect(() => {
    if (dailyDate && initialDailyData) {
      updateDataForMonth(initialDailyData, dailyDate);
    }
  }, [initialDailyData, dailyDate]);

  const updateDataForMonth = (data, date = initialDate) => {
    const month = new Date(date).getMonth();
    const confirmed = [];
    const deaths = [];
    const tested = [];
    const hospitalized = [];
    const onRespirator = [];
    data.forEach(({ date, positiveForDate, deathsForDate, testedForDate, hospitalizedForDate, onRespiratorForDate }) => {
      const d = new Date(date);
      const y = d.getFullYear();
      const m = d.getMonth();
      const day = d.getDate();
      if (m !== month) return;
      const ts = Date.UTC(y, m, day);
      confirmed.push([ts, positiveForDate]);
      deaths.push([ts, deathsForDate]);
      tested.push([ts, testedForDate]);
      hospitalized.push([ts, hospitalizedForDate])
      onRespirator.push([ts, onRespiratorForDate]);
    })
    setDaily({ confirmed, deaths, tested, hospitalized, onRespirator });
  }
  if (!initialDailyData) {
    return null;
  }
  const firstDate = initialDailyData[0].date;
  const newestDate = initialDailyData[initialDailyData.length - 1].date;
  const getDateString = (d) => {
    return new Date(d).toISOString().split('T')[0];
  }
  const decreaseDailyMonth = () => {
    const [y, m, d] = firstDate.split('-');
    const newDateTs = new Date(new Date(dailyDate).setMonth(new Date(dailyDate).getMonth() - 1)).setDate(parseInt(d));
    if (newDateTs < new Date(firstDate).getTime()) {
      return;
    }
    const newDate = getDateString(newDateTs);
    setDailyDate(newDate);
  }
  const increaseDailyMonth = () => {
    const [y, m, d] = newestDate.split('-');
    const newDateTs = new Date(new Date(dailyDate).setMonth(new Date(dailyDate).getMonth() + 1)).setDate(parseInt(d))
    if (newDateTs > new Date().getTime()) {
      return;
    }
    const newDate = getDateString(newDateTs);
    setDailyDate(newDate);
  }
  const dailyDateObj = new Date(dailyDate);
  return <div>
    <SectionTitle title={`Дневни приказ промене стања за месец ${months[dailyDateObj.getMonth()]} ${dailyDateObj.getFullYear()}`} />
    {daily && <LineChartSection data={daily} type='daily' />}
    <div className="flex justify-space-between pagination">
      <button className="button" onClick={decreaseDailyMonth}>Претходни месец</button>
      <button className="button" onClick={increaseDailyMonth}>Наредни месец</button>
    </div>
  </div>
}