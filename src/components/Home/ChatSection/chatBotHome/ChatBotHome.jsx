import arrowicon from "../images/question-wrapper-arrow-icon.svg";
import "./ChatBotHome.css";
import axios from "axios";
import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

export default function ChatBotHome() {
  const [data, setData] = useState(null);
  const tokenStr = localStorage.getItem("accessToken");
  // const params = useParams();

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
        setData(response.data.data.message);
        // console.log("j", data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="chat-section-body">
      <div className="chat-section-heading">
        <h1>
          <span> AI Conversational</span> Data Analyst
        </h1>
        <p>
          Your personal AI data assistant. Seamlessly integrate your database
          for rapid, informed decision-making. Get instant analysis and answers,
          optimizing growth metrics daily. Ask anything, get analyst-grade
          responses.
        </p>
      </div>

      <div className="chat-section-question-container">
        <div className="chat-section-question-wrapper">
          <div className="chat-section-question">
            <p>Give me the summary of the data source.</p>
            <img src={arrowicon} alt="arrow-icon" />
          </div>
          <div className="chat-section-question">
            <p>User duration engagement change vs last week ?</p>
            <img src={arrowicon} alt="arrow-icon" />
          </div>
          <div className="chat-section-question">
            <p>Provide an overview of this week's IAP Revanue performance.</p>
            <img src={arrowicon} alt="arrow-icon" />
          </div>
          <div className="chat-section-question">
            <p>What are the factors of drop in our sales revenue this week?</p>
            <img src={arrowicon} alt="arrow-icon" />
          </div>
        </div>
      </div>
      <div className="chat-section-summary-wrapper">
        <div className="chat-section-summary-heading">Summary</div>
        <div className="chat-section-summary-body">
          <pre>
            <p>{data?.summery}</p>
          </pre>
        </div>
      </div>
    </div>
  );
}
