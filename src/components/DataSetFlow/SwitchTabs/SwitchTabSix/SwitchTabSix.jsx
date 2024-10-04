import CirculerBarGraph from "./CirculerBarGraph/CircularBarGraph";
import "./SwitchTabSix.css";
import { useState, useEffect } from "react";
import axios from "axios";
import LoadingBar from "../../LoadingBar/LoadingBar";
import { useParams } from "react-router-dom";
// import img from "./images/tab-six.png";
// import RuleOccurenceGraph from "./RuleOccurenceGraph/RuleOccurenceGraph";

// const ruleOccurrences = [
//   {
//     name: "Validity product",
//     dimension: "validity",
//     score: 100,
//     date: "ID",
//     total_rows: "3720",
//     failed_rows: "0",
//     primary_data_element: "product_id",
//     discription: "check against the reference",
//   },
//   {
//     name: "Validity product",
//     dimension: "validity",
//     score: 100,
//     date: "ID",
//     total_rows: "3720",
//     failed_rows: "0",
//     primary_data_element: "product_id",
//     discription: "check against the reference",
//   },
//   {
//     name: "Validity product",
//     dimension: "validity",
//     score: 100,
//     date: "ID",
//     total_rows: "3720",
//     failed_rows: "0",
//     primary_data_element: "product_id",
//     discription: "check against the reference",
//   },
//   {
//     name: "Validity product",
//     dimension: "validity",
//     score: 60,
//     date: "ID",
//     total_rows: "3720",
//     failed_rows: "0",
//     primary_data_element: "product_id",
//     discription: "check against the reference",
//   },
//   {
//     name: "Validity product",
//     dimension: "validity",
//     score: 30,
//     date: "ID",
//     total_rows: "3720",
//     failed_rows: "0",
//     primary_data_element: "product_id",
//     discription: "check against the reference",
//   },
// ];

export default function SwitchTabSix() {
  const [data, setData] = useState(null);
  const tokenStr = localStorage.getItem("accessToken");
  const params = useParams();
  console.log(params);

  const fetchData = () => {
    axios
      .post(
        `https://data-quality-backend.lab.neuralcompany.team/store_report/${params.file}`,
        {},
        {
          headers: { Authorization: `Bearer ${tokenStr}` },
        }
      )
      .then((response) => {
        setData(response.data.data.reports[0].scores);
        console.log(response.data.data.reports[0].scores);
        // console.log(response.data.quality);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const getScoreColorClass = (score) => {
  //   if (score > 75) {
  //     return "green-text";
  //   } else if (score > 50) {
  //     return "yellow-text";
  //   }
  //   return "red-text";
  // };

  return (
    <div>
      <div className="tab-six-wrapper">
        {data ? (
          <div>
            <div className="tab-six-section-one">
              <div className="tab-six-section-one-subitem">
                <p>Consistency({data && data.consistency})</p>
                <div className="tab-six-circuler-bar-graph">
                  <CirculerBarGraph
                    value1={data && data.consistency * 10}
                    color1={"#ED6D4D"}
                    color2={"#c8c8c8"}
                  />
                  <div className="tab-six-circuler-bar-graph-data-value">
                    <p>{data && data.consistency * 10}%</p>
                  </div>
                </div>
              </div>
              <div className="tab-six-section-one-subitem">
                <p>Validity({data && data.validity_of_the_data})</p>
                <div className="tab-six-circuler-bar-graph">
                  <CirculerBarGraph
                    value1={data && data.validity_of_the_data * 10}
                    color1={"#2043DF"}
                    color2={"#c8c8c8"}
                  />
                  <div className="tab-six-circuler-bar-graph-data-value">
                    <p>{data && data.validity_of_the_data * 10}%</p>
                  </div>
                </div>
              </div>
              <div className="tab-six-section-one-subitem">
                <p>Accurarcy({data && data.accuracy_of_the_model})</p>
                <div className="tab-six-circuler-bar-graph">
                  <CirculerBarGraph
                    value1={data && data.accuracy_of_the_model}
                    color1={"#159b1a"}
                    color2={"#c8c8c8"}
                  />
                  <div className="tab-six-circuler-bar-graph-data-value">
                    {data.accuracy_of_the_model === "Not applicable" ? (
                      <p>None</p>
                    ) : (
                      <p>{data && data.accuracy_of_the_model}%</p>
                    )}
                  </div>
                </div>
              </div>
              {/* <div className="tab-six-horizontal-bar-graph">
            <p>Number of rule occurence by dimensions</p>
            <RuleOccurenceGraph />
            
          </div> */}
            </div>
          </div>
        ) : (
          <div className="switch-tab-loading-bar">
            <LoadingBar />
          </div>
        )}

        {/* <div className="tab-six-section-two">
          <p>Rule Occurrences</p>
          <div className="tab-six-section-two-wrapper">
            <div className="tab-six-section-table-header tab-six-section-table">
              <div>Name</div>
              <div>Dimension</div>
              <div>Score</div>
              <div>Date</div>
              <div>Total Rows</div>
              <div>Failed Rows</div>
              <div>Primary Data Element</div>
              <div>Description</div>
            </div>
            <div className="tab-six-section-table-data">
              {ruleOccurrences.map((value, index) => (
                <div
                  key={index}
                  className="tab-six-section-table tab-six-section-table-row"
                >
                  <div>{value.name}</div>
                  <div>{value.dimension}</div>
                  <div className={getScoreColorClass(value.score)}>
                    {value.score}
                    <span>%</span>
                  </div>
                  <div>{value.date}</div>
                  <div>{value.total_rows}</div>
                  <div>{value.failed_rows}</div>
                  <div>{value.primary_data_element}</div>
                  <div>{value.discription}</div>
                </div>
              ))}
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
