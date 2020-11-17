import { Children, useEffect, useState } from "react";
import { DataContext } from "./DataContext";

export default function DataProvider(props) {
  const [raw, setRaw] = useState();
  const [daily, setDaily] = useState();
  const [monthly, setMonthly] = useState();
  const initialDate = new Date().toISOString().split('T')[0];
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/igr/c19json/master/covid19-jhc.json')
      .then(res => res.json())
      .then(d => {
        setRaw(d)
        setupMonthlyData(d);
        const dailyData = setupDailyData(initialDate, d);
        setDaily(dailyData)
      })
  }, []);
  const setupMonthlyData = (dataToMap) => {
    const labels = [];
    const dataSorted = {
      line: {},
      bar: {},
      l: {
        confirmed: [],
        recovered: [],
        deaths: [],
      },
      b: {
        confirmed: [],
        recovered: [],
        deaths: [],
      }
    };
    let counter = 0;
    dataToMap.serbia.forEach(({ date, confirmed, recovered, deaths }, i) => {
      const d = new Date(date);
      const isLastRecord = dataToMap.serbia.length - 1 === i;
      const y = d.getFullYear();
      const m = d.getMonth() + 1;
      const day = d.getDate();
      const lastDay = isLastRecord ? day : new Date(y, m, 0).getDate();
      if (day !== lastDay) {
        return;
      }
      const ts = Date.UTC(y, m - 1, 1)
      if (!labels.includes(ts)) {
        labels.push(ts);
        const hasPreviousMonth = counter > 0;
        dataSorted['l'].confirmed.push([ts, parseInt(confirmed)]);
        // dataSorted['l'].recovered.push([ts, parseInt(recovered)]);
        dataSorted['l'].deaths.push([ts, parseInt(deaths)]);

        dataSorted['b'].confirmed.push([ts, hasPreviousMonth ? parseInt(confirmed) - dataSorted['l'].confirmed[counter - 1][1] : parseInt(confirmed)]);
        // dataSorted['b'].recovered.push([ts, hasPreviousMonth ? parseInt(recovered) - dataSorted['l'].recovered[counter - 1][1] : parseInt(recovered)]);
        dataSorted['b'].deaths.push([ts, hasPreviousMonth ? parseInt(deaths) - dataSorted['l'].deaths[counter - 1][1] : parseInt(deaths)]);
        counter += 1;
      }
    })
    setMonthly({
      labels,
      line: dataSorted.l,
      bar: dataSorted.b,
    })
  }
  const setupDailyData = (inputDate, d) => {
    const currentMonth = new Date(inputDate).getMonth();
    const labels = [];
    const dataSorted = {
      line: {
        confirmed: [],
        recovered: [],
        deaths: [],
      },
    };

    const monthData = d.serbia.filter(({ date }) => new Date(date).getMonth() === currentMonth);
    const firstDayOfMonth = new Date(monthData[0].date);
    let lastDateInPreviousMonth = firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 1)
    let [lastDayInPreviousMonth] = new Date(lastDateInPreviousMonth).toISOString().split('T');
    const lastDayInPreviousMonthData = d.serbia.find(({ date }) => date === lastDayInPreviousMonth) || { confirmed: 0, recovered: 0, deaths: 0 };
    monthData.map(({ date, confirmed, recovered, deaths }, i) => {
      labels.push(date);
      const d = new Date(date);
      const y = d.getFullYear();
      const m = d.getMonth() + 1;
      const day = d.getDate();
      const ts = Date.UTC(y, m - 1, day)

      const hasPreviousDay = monthData[i - 1] !== undefined;

      if (confirmed > 0) {
        dataSorted['line'].confirmed.push([ts, hasPreviousDay ? parseInt(confirmed) - monthData[i - 1].confirmed : parseInt(confirmed) - lastDayInPreviousMonthData.confirmed]);
      } else {
        dataSorted['line'].confirmed.push([ts, 0]);
      }
      if (recovered > 0) {
        dataSorted['line'].recovered.push([ts, hasPreviousDay ? parseInt(recovered) - monthData[i - 1].recovered : parseInt(recovered) - lastDayInPreviousMonthData.recovered]);
      } else {
        dataSorted['line'].recovered.push([ts, 0]);
      }
      if (deaths > 0) {
        const value = hasPreviousDay ? parseInt(deaths) - monthData[i - 1].deaths : parseInt(deaths) - lastDayInPreviousMonthData.deaths
        // dataSorted['line'].deaths.push(value < 0 ? deaths : value);
        dataSorted['line'].deaths.push([ts, value]);
      } else {
        dataSorted['line'].deaths.push([ts, deaths])
      }
    })
    dataSorted.labels = labels;
    return dataSorted;
  }
  return <DataContext.Provider value={{
    raw,
    daily,
    monthly,
    initialDate,
    onPeriodChange: setupDailyData,
  }}>
    {Children.only(props.children)}
  </DataContext.Provider>
}