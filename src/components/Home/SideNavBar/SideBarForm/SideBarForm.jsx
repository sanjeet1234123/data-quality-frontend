import postgreSQLimg from "../images/postgreSQL.svg";
import snowflakeImg from "../images/snowflake.svg";
import amazonRedshiftImg from "../images/amazonRedshift.svg";
import microsoftAzureImg from "../images/microsoftAzure.svg";
import googleBigQueryImg from "../images/googleBigQuery.svg";
import oracleImg from "../images/oracle.svg";
import databricksImg from "../images/databricks.svg";
import teradataImg from "../images/teradata.svg";
import amazonAthinaImg from "../images/amazonAthena.svg";
import crossImg from "../images/cross-icon.svg";
import DragDropFile from "../DragDropFile/DragDropFile";
// import linkImg from "./images/link-icon.svg";
import DataSourceForm from "../DataSourceForm/DataSourceForm";
import { useState } from "react";

export default function SideBarForm(value) {
  const [isOpen, setIsopen] = useState(false);
  setIsopen(value);
  const ToggleSidebar = () => {
    isOpen === true ? setIsopen(false) : setIsopen(true);
  };
  return (
    <>
      <div className={`sidebar ${isOpen === true ? "active" : ""}`}>
        <div className="sd-header">
          <h3 className="">Add Data source</h3>
          <div className="sidebar-cross-btn" onClick={ToggleSidebar}>
            <img src={crossImg} alt="" />
          </div>
        </div>
        <div className="sd-body">
          <div className="sd-body-heading">
            <p>Data Source type</p>
          </div>
          <div className="list-of-data-sources-wrapper">
            <div className="data-source-tool">
              <img src={postgreSQLimg} alt="postgreSQL" />
            </div>
            <div className="data-source-tool">
              <img src={microsoftAzureImg} alt="postgreSQL" />
            </div>
            <div className="data-source-tool">
              <img src={amazonRedshiftImg} alt="postgreSQL" />
            </div>
            <div className="data-source-tool">
              <img src={snowflakeImg} alt="postgreSQL" />
            </div>
            <div className="data-source-tool">
              <img src={googleBigQueryImg} alt="postgreSQL" />
            </div>
            <div className="data-source-tool">
              <img src={amazonAthinaImg} alt="postgreSQL" />
            </div>
            <div className="data-source-tool">
              <img src={teradataImg} alt="postgreSQL" />
            </div>
            <div className="data-source-tool">
              <img src={oracleImg} alt="postgreSQL" />
            </div>
            <div className="data-source-tool">
              <img src={databricksImg} alt="postgreSQL" />
            </div>
          </div>
          <div className="drag-drop-file-wrapper">
            <DragDropFile />
          </div>
          <DataSourceForm />
        </div>
      </div>
      <div
        className={`sidebar-overlay ${isOpen === true ? "active" : ""}`}
        onClick={ToggleSidebar}
      ></div>
    </>
  );
}
