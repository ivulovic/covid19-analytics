import './index.css';

export default function PageTitle({ title }) {
  return <header className="page">
    <h1>
      {title}
    </h1>
  </header>
}