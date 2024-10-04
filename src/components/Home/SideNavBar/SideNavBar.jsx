import React, { useState } from "react";
import "./SideNavBar.css";
import akiralogo from "./images/akira-icon.svg";
import secondicon from "./images/side-navbar-second-icon.svg";
import thirdicon from "./images/side-navbar-third-icon.svg";
import fouricon from "./images/side-navbar-four-icon.svg";
import { useNavigate } from "react-router-dom";

import crossImg from "./images/cross-icon.svg";
import DataSourceForm from "./DataSourceForm/DataSourceForm";
import Logout from "./Logout/Logout";

import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#f9f9f9",
    fontSize: 16,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f9f9f9",
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 14,
  },
}));

export default function SideNavBar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [flag, setFlag] = useState(false);
  const username = localStorage.getItem("username");
  if (username) {
    var firstChar = username.slice(0, 1);
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  function handleDataSource() {
    navigate("/data-sources");
  }

  function handleHome() {
    navigate("/chat-bot");
  }
  function handleLogout() {
    if (flag == true) {
      setFlag(false);
    } else {
      setFlag(true);
    }
  }

  return (
    <>
      <div className="side-navbar">
        <img src={akiralogo} alt="logo" />
        <div className="side-navbar-main-wrapper">
          <div className="data-sources" onClick={handleDataSource}>
            <LightTooltip title="Data Sources" placement="right">
              <img className="side-navbar-item" src={secondicon} alt="img" />
            </LightTooltip>
          </div>
          <div onClick={handleHome}>
            <LightTooltip title="Chat-Bot" placement="right">
              <img className="side-navbar-item" src={thirdicon} alt="img" />
            </LightTooltip>
          </div>
          <div className="add-data-sources" onClick={toggleSidebar}>
            <LightTooltip title="Add-Data-Sources" placement="right">
              <img className="side-navbar-item" src={fouricon} alt="img" />
            </LightTooltip>
          </div>
        </div>
        <div>
          {flag ? <Logout /> : <div></div>}
          <div className="side-navbar-account-name-icon" onClick={handleLogout}>
            {firstChar}
          </div>
        </div>
      </div>
      <div className={`sidebar ${isOpen ? "active" : ""}`}>
        <div className="sd-header">
          <h3 className="">Add Data source</h3>
          <div className="sidebar-cross-btn" onClick={toggleSidebar}>
            <img src={crossImg} alt="" />
          </div>
        </div>
        <div className="sd-body">
          <DataSourceForm onClose={toggleSidebar} />
        </div>
      </div>
      <div
        style={{ zIndex: "1" }}
        className={`sidebar-overlay ${isOpen ? "active" : ""}`}
        onClick={toggleSidebar}
      ></div>
    </>
  );
}
