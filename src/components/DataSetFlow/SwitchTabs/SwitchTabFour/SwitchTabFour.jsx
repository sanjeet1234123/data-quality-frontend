import "./SwitchTabFour.css";
import starIcon from "./images/star-icon-blue.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingBar from "../../LoadingBar/LoadingBar";
import { useParams } from "react-router-dom";

const initialData = [
  {
    column: "user_id",
    Description: "Float",
    score: "High",
    sample_data: "30.5",
  },
  {
    column: "Transaction_id",
    Description: "String",
    score: "High",
    sample_data: "30.5",
  },
  {
    column: "transaction_amount",
    Description: "Boolean",
    score: "High",
    sample_data: "30.5",
  },
  {
    column: "transaction_description",
    Description: "char",
    score: "High",
    sample_data: "30.5",
  },
];

export default function SwitchTabFour() {
  const [data, setData] = useState(null);
  const tokenStr = localStorage.getItem("accessToken");
  const params = useParams();
  console.log(params);

  const navigate = useNavigate();
  function onClickHandlerChatBot() {
    navigate("/chat-bot");
  }

  const fetchData = () => {
    axios
      .post(
        `https://data-quality-backend.lab.neuralcompany.team/store_rules_detected/${params.file}`,
        {},
        {
          headers: { Authorization: `Bearer ${tokenStr}` },
        }
      )
      .then((response) => {
        setData(response.data.data.rules);
        // console.log(response.data.data.rules);
        // console.log(response.data.rules_detected);
        // console.log(response.data.business_terms[0]);
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
      <div className="tab-four-header-content">
        <div className="tab-four-header-heading">
          <img src={starIcon} alt="star-icon" />
          <p>
            Suggestions from copilot below. the data profile data type and asset
            details were used to generate Suggestions
          </p>
        </div>
        <div className="tab-four-btn" onClick={onClickHandlerChatBot}>
          Create Rule Using AI
        </div>
      </div>

      {data ? (
        <div>
          <div className="switch-tab-four-wrapper">
            <div className="tab-four-table-header">
              <div></div>
              <div>
                <p>Rule Name</p>
              </div>
              <div>
                <p>Rule Type</p>
              </div>
              <div>
                <p>Columns</p>
              </div>
              <div>
                <p>Rule Description</p>
              </div>
            </div>
            {data?.map((row, i) => (
              <div key={i} className="tab-four-table">
                <div className="tab-four-table-row">
                  <div></div>
                  <div>{row.name}</div>
                  <div>{row.type}</div>
                  <div>{row.column}</div>
                  <div>{row.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="switch-tab-loading-bar">
          <LoadingBar />
        </div>
      )}
    </div>
  );
}
