import BasicPie from "./Meter/BasicPie";
import "./SwitchTabFive.css";
import LinearProgress from "@mui/joy/LinearProgress";
import Meter from "./Meter/Meter";
import MonitorTable from "./MonitorTable/MonitorTable";
// import TableHealth from "./TableHealth/TableHealth";
// import TestResults from "./TestResults/TestResults";
// import assertionimg from "./images/Group 1437253269(1).png";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingBar from "../../LoadingBar/LoadingBar";
import { useParams } from "react-router-dom";
// const value = 85;

export default function SwitchTabFive() {
  const [data, setData] = useState(null);
  const tokenStr = localStorage.getItem("accessToken");
  const params = useParams();
  console.log(params);

  const fetchData = () => {
    axios
      .post(
        `https://data-quality-backend.lab.neuralcompany.team/store_quality/${params.file}`,
        {},
        {
          headers: { Authorization: `Bearer ${tokenStr}` },
        }
      )
      .then((response) => {
        setData(response.data.data.quality[0]);
        console.log(response.data.data.quality[0]);
        // console.log(response.data.quality);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="tab-five-wrapper">
        {data ? (
          <div>
            <div className="tab-five-section-one">
              <div>
                <p>Data Quality Score</p>
                <div className="speedometer">
                  <div className="basic-pie">
                    <BasicPie />
                  </div>
                  <div className="meter">
                    {data && <Meter value={data.data_quality_score} />}
                  </div>
                </div>
              </div>
              <div>
                <p>Rules against target</p>
                <div className="tab-five-linear-progress">
                  <div>Validity</div>
                  <div className="scale">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                  <div className="scale-reading">
                    <div>0</div>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                    <div>6</div>
                    <div>7</div>
                    <div>8</div>
                    <div>9</div>
                    <div>10</div>
                  </div>
                  <div className="scale-progress-bar">
                    <LinearProgress
                      determinate
                      value={data && data.monitored_data}
                      color="success"
                      sx={{
                        "--LinearProgress-thickness": "12px",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div>
                <p>Monitored Tables</p>
                <div className="monitored-data">
                  <MonitorTable label1={"Unmonitored"} label2={"Monitored"} />
                  <div className="monitored-data-value">
                    <span>Total Table</span>
                    <p>{data && data.rules_against_target}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="switch-tab-loading-bar">
            <LoadingBar />
          </div>
        )}

        {/* <div className="tab-five-section-two">
          <div>
            <p>Table Health</p>
            <div className="table-health-data">
              <TableHealth />
              <div className="table-health-data-value">
                <span>Total Table</span>
                <p>{data && data[3]}</p>
              </div>
            </div>
          </div>
          <div>
            <p>Test Results Breakdown</p>
            <div className="test-results-data">
              <TestResults />
              <div className="table-health-data-value">
                <span>Total Table</span>
                <p>{data && data[2]}</p>
              </div>
            </div>
          </div>
          <div>
            Assertion test
            <div className="assertion-img">
              <img src={assertionimg} alt="" />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
