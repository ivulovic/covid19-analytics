import { useState, useEffect } from "react";
import SectionTitle from "../../../../components/SectionTitle";
import { months } from "../../../../utils/date.utils";
import LineChartSection from "../../LineChartSection";

export default function DailyCases({ data: { daily: initialDailyData }, initialDate }) {
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
    data.forEach(({ date, positiveForDate, deathsForDate }) => {
      const d = new Date(date);
      const y = d.getFullYear();
      const m = d.getMonth();
      const day = d.getDate();
      if (m !== month) return;
      const ts = Date.UTC(y, m, day);
      confirmed.push([ts, positiveForDate]);
      deaths.push([ts, deathsForDate]);
    })
    setDaily({ confirmed, deaths });
  }
  if (!initialDailyData) {
    return null;
  }
  const firstDate = initialDailyData[0].date;
  const getDateString = (d) => {
    return new Date(d).toISOString().split('T')[0];
  }
  const decreaseDailyMonth = () => {
    const newDateTs = new Date(dailyDate).setMonth(new Date(dailyDate).getMonth() - 1);
    if (new Date(newDateTs) < new Date(firstDate).getTime()) {
      return;
    }
    const newDate = getDateString(newDateTs);
    setDailyDate(newDate);
  }
  const increaseDailyMonth = () => {
    const newDateTs = new Date(dailyDate).setMonth(new Date(dailyDate).getMonth() + 1);
    if (new Date(newDateTs) > new Date().getTime()) {
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