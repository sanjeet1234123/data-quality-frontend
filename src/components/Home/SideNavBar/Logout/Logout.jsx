import { useNavigate } from "react-router-dom";
import "./Logout.css";
import logoutIcon from "./images/icons8-logout-96.png";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

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
    fontSize: 16,
  },
}));

function Logout() {
  const navigate = useNavigate();
  function handleLogoutbtn() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <div className="logout-wrapper">
      <div onClick={handleLogoutbtn}>
        <div className="logout-btn">
          <LightTooltip title="Logout" placement="right" arrow>
            <IconButton>
              <img src={logoutIcon} alt="icon" />
            </IconButton>
          </LightTooltip>
        </div>
      </div>
    </div>
  );
}

export default Logout;
