import greenbar from "../images/green-bar.svg";
import columnsicon from "../images/columns-icon.svg";
import rowsicon from "../images/rows-icon.svg";
import BasicPie from "../../../DataSetFlow/SwitchTabs/SwitchTabFive/Meter/BasicPie";
import Meter from "../../../DataSetFlow/SwitchTabs/SwitchTabFive/Meter/Meter";
import { LinearProgress } from "@mui/material";
import MonitorTable from "../../../DataSetFlow/SwitchTabs/SwitchTabFive/MonitorTable/MonitorTable";
import TableHealth from "../../../DataSetFlow/SwitchTabs/SwitchTabFive/TableHealth/TableHealth";
import TestResults from "../../../DataSetFlow/SwitchTabs/SwitchTabFive/TestResults/TestResults";
import "./Overview.css";
import { useState, useEffect } from "react";
import axios from "axios";
import LoadingBar from "../../../DataSetFlow/LoadingBar/LoadingBar";
export default function Overview() {
  const [data, setData] = useState(null);
  const tokenStr = localStorage.getItem("accessToken");

  const [scoredata, setScoreData] = useState(null);

  const fetchScoreData = () => {
    axios
      .post(
        `https://data-quality-backend.lab.neuralcompany.team/store_quality/${localStorage.getItem(
          "fileid"
        )}`,
        {},
        {
          headers: { Authorization: `Bearer ${tokenStr}` },
        }
      )
      .then((response) => {
        setScoreData(response.data.data.quality[0]);
        // console.log(response.data.data.quality[0]);
        // console.log(response.data.quality);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchData = async () => {
    await axios
      .post(
        `https://data-quality-backend.lab.neuralcompany.team/store_data_overview/${localStorage.getItem(
          "fileid"
        )}`,
        {},
        {
          headers: { Authorization: `Bearer ${tokenStr}` },
        }
      )
      .then((response) => {
        setData(response.data);
        // console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
    fetchScoreData();
  }, []);
  return (
    <>
      <div className="dashboard-data-overview-wrapper">
        <div className="dashboard-data-overview-heading">
          <p>Data overview</p>
        </div>
        {data ? (
          <div className="dashboard-data-overview">
            <div className="dashboard-data-overview-items">
              <div>
                <img src={rowsicon} alt="" />
                <div className="item">
                  <p>Total Number of rows</p>
                  <span>{data?.data.message.rows}</span>
                </div>
              </div>
              <div>
                <img src={columnsicon} alt="" />
                <div className="item">
                  <p>Total Number of columns</p>
                  <span>{data?.data.message.columns}</span>
                </div>
              </div>
            </div>
            <div className="dashboard-data-overview-item">
              <div className="metadata-heading">
                <p>Metadata</p>
              </div>
              <div className="metadata-body">
                <div>
                  <p>Name</p>
                  <p>
                    {data.data.message.metadata[0]
                      ? data.data.message.metadata[0].name
                      : data.data.message.metadata.name}
                  </p>
                </div>
                <div>
                  <p>Created at</p>{" "}
                  <span>
                    {data.data.message.metadata[0]
                      ? data.data.message.metadata[0].created_at
                      : data.data.message.metadata.created_at}
                  </span>
                </div>
                <div>
                  <p>Relates to</p>
                  <span>
                    {data.data.message.metadata[0]
                      ? data.data.message.metadata[0].relates_to
                      : data.data.message.metadata.relates_to}
                  </span>
                </div>
                <div>
                  <p>connection</p>
                  <span>
                    {data.data.message.metadata[0]
                      ? data.data.message.metadata[0].connection
                      : data.data.message.metadata.connection}
                  </span>
                </div>
              </div>
            </div>
            {/* <div className="dashboard-data-overview-item">
            <div className="sla">
              <p>SLA</p>
              <div>
                <img src={greenbar} alt="progress-bar" />
                <p>5/5</p>
              </div>
            </div>
            <div className="test-report">
              <div className="test-report-header">
                <p>Test report</p>
                <span>See all</span>
              </div>
              <div className="test-report-score">
                <p>100% Score</p> <span>5 Test</span>
              </div>
              <div className="test-report-score-bar">
                <img src={greenbar} alt="progress-bar" />
              </div>
            </div>
          </div> */}
          </div>
        ) : (
          <div>
            <LoadingBar />
          </div>
        )}
      </div>
      <div className="dashboard-data-quality-wrapper">
        <div className="dashboard-data-quality-heading">
          <p>Data Quality</p>
        </div>
        {scoredata ? (
          <>
            <div className="dashboard-data-quality">
              <div className="dashboard-data-quality-item">
                <p>Data Quality Score</p>
                <div className="speedometer">
                  <div className="basic-pie">
                    <BasicPie />
                  </div>
                  <div className="meter">
                    <Meter value={scoredata?.data_quality_score} />
                  </div>
                </div>
              </div>
              <div className="dashboard-data-quality-item">
                <p>Monitored Tables</p>
                <div className="monitored-data">
                  <MonitorTable />
                  <div className="monitored-data-value">
                    <span>Monitored data</span>
                    <p>{scoredata?.monitored_data}</p>
                  </div>
                  <ul>
                    <li>Monitored</li>
                    <li>UnMonitored</li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="overview-data-quality-loading-bar">
            <LoadingBar />
          </div>
        )}

        {/* <div className="dashboard-data-quality-section-two">
          <div>
            <p>Table Health</p>
            <div className="table-health-data">
              <TableHealth />
              <div className="table-health-data-value">
                <span>Total Table</span>
                <p>85</p>
              </div>
            </div>
          </div>
          <div>
            <p>Test Results Breakdown</p>
            <div className="test-results-data">
              <TestResults />
              <div className="table-health-data-value">
                <span>Total Table</span>
                <p>85</p>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}
