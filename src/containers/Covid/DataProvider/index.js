import { Children, useEffect, useState } from "react";
import { DataContext } from "./DataContext";

export default function DataProvider(props) {
  const [daily, setDaily] = useState();
  const [monthly, setMonthly] = useState();
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/ivulovic/api.covid-analytics/main/files/monthlySummary.json')
      .then(res => res.json())
      .then(setMonthly);
    fetch('https://raw.githubusercontent.com/ivulovic/api.covid-analytics/main/files/dailySummary.json')
      .then(res => res.json())
      .then(setDaily);
  }, [])
  return <DataContext.Provider value={{
    daily,
    monthly,
  }}>
    {Children.only(props.children)}
  </DataContext.Provider>
}