import { useState, useEffect } from "react";
import SectionTitle from "../../../../components/SectionTitle";
import { months } from "../../../../utils/date.utils";
import LineChartSection from "../../LineChartSection";

export default function DailyCases({ data: { daily: initialDailyData, raw }, initialDate, onPeriodChange }) {
  const [dailyDate, setDailyDate] = useState(initialDate);
  const [daily, setDaily] = useState();
  useEffect(() => {
    if (raw && dailyDate) {
      const dailyData = onPeriodChange(dailyDate, raw);
      setDaily(dailyData);
    }
  }, [dailyDate, raw]);

  if (!daily || !raw) return null;

  const firstDate = raw.serbia[0].date;
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
    <LineChartSection data={daily.line} type='daily' />
    <div className="flex justify-space-between pagination">
      <button className="button" onClick={decreaseDailyMonth}>Претходни месец</button>
      <button className="button" onClick={increaseDailyMonth}>Наредни месец</button>
    </div>
  </div>
}