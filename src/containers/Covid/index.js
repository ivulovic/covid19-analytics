import "./index.css";
import DataProvider from './DataProvider';
import Content from './Content';

export default function CovidPage() {
  return <main>
    <DataProvider>
      <Content />
    </DataProvider>
  </main>
}