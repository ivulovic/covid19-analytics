import { Children, useEffect, useState } from "react";
import { cardsOrder, keysMapper } from "./data";
import { DataContext } from "./DataContext";

export default function DataProvider(props) {
  const [cards, setCards] = useState();
  const [daily, setDaily] = useState();
  const [monthly, setMonthly] = useState();
  const initialDate = new Date().toISOString().split('T')[0];
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/ivulovic/api.covid-analytics/main/files/monthlySummary.json')
      .then(res => res.json())
      .then(setMonthly)
    fetch('https://raw.githubusercontent.com/ivulovic/api.covid-analytics/main/files/dailySummary.json')
      .then(res => res.json())
      .then((data) => {
        setDaily(data);
        // set cards

      })
  }, []);

  return <DataContext.Provider value={{
    daily,
    monthly,
    cards,
    initialDate,
  }}>
    {Children.only(props.children)}
  </DataContext.Provider>
}