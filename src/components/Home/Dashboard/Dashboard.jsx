import "./Dashboard.css";
import Overview from "./Overview/Overview";
import Summary from "./Summary/Summary";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-wrapper">
        <div className="dashboard-header">
          <p>Data Visual</p>
        </div>
        <Overview />
        <Summary />
      </div>
    </div>
  );
}
