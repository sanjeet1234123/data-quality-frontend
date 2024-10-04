import SideNavBar from "../Home/SideNavBar/SideNavBar";
import staricon from "../DataSource/images/star-icon.svg";
import leftarrow from "../DataSource/images/left-arrow-icon.svg";
import Tabs from "./SwitchTabs/Tabs";
import "./DataSetFlow.css";
import { useNavigate } from "react-router-dom";

export default function DataSetFlow() {
  const tabData = [
    { label: "Data Overview" },
    { label: "Profiling Results" },
    { label: "Business Terms" },
    { label: "Rules Detected" },
    { label: "Data Quality" },
    { label: "Report" },
  ];
  const navigate = useNavigate();
  function onClickHandler() {
    navigate("/data-sources");
  }

  function onClickHandlerChatBot() {
    navigate("/chat-bot");
  }
  return (
    <div className="data-set-flow-container">
      <SideNavBar />
      <div className="data-set-flow-right-wrapper">
        <div className="data-set-flow-header">
          <div
            className="back-btn"
            onClick={onClickHandler}
            style={{ cursor: "pointer" }}
          >
            <img src={leftarrow} alt="img" />
            <p>Back</p>
          </div>
        </div>
        <div className="data-set-flow-wrapper">
          <div className="data-set-flow">
            <div className="data-set-flow-heading">
              <h2>SUPPLIER_references</h2>
              <div className="ask-ai-btn" onClick={onClickHandlerChatBot}>
                <img src={staricon} alt="img" />
                <p>Ask AI</p>
              </div>
            </div>
            <Tabs tabs={tabData} />
          </div>
        </div>
      </div>
    </div>
  );
}
