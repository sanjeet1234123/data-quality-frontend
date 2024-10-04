import "./SwitchTabThree.css";
import { useState, useEffect } from "react";
import axios from "axios";
import LoadingBar from "../../LoadingBar/LoadingBar";
import { useParams } from "react-router-dom";

export default function SwitchTabThree() {
  const params = useParams();
  console.log(params);
  

  return (
    <div>
        <div>
          <div className="switch-tab-three-heading">
            <p>Profile Resulting created by AI</p>
          </div>
          <div className="switch-tab-three-wrapper">
            <div className="tab-three-table-header">
              <div></div>
              <div>
                <p>Insight Statement</p>
              </div>
              <div>
                <p>Insights Type</p>
              </div>
              <div>
                <p>Score</p>
              </div>
              <div>
                <p>Columns</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
