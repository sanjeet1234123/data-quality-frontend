import "./Summary.css";
import insightsgraph from "./images/Instance.svg";

export default function Summary() {
  const summaryDetails = [
    { segments: "Engagement section", no_of_user: "4500", changes: "25%" },
    { segments: "Engagement section", no_of_user: "4500", changes: "25%" },
    { segments: "Engagement section", no_of_user: "4500", changes: "25%" },
  ];
  return (
    <>
      <div className="dashboard-summary-wrapper">
        <div className="summary-wrapper">
          <div className="summary-heading">
            <p>Summary</p>
          </div>
          <div className="summary">
            <div className="summary-table-header">
              <p>Segments</p>
              <p>Number of User</p>
              <p>Change in DAU from previous period</p>
            </div>
            <div className="summary-table-body">
              {summaryDetails.map((value, index) => (
                <div key={index} className="summary-table-rows">
                  <div>{value.segments}</div>
                  <div>{value.no_of_user}</div>
                  <div style={{ color: "#" }}>{value.changes}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="insights-wrapper">
          <div className="insights-heading">
            <p>Key insights</p>
          </div>
          <div className="insights-graph">
            <img src={insightsgraph} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
