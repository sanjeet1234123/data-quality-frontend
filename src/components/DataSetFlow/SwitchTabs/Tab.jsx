// import React, { useState } from "react";

const Tab = ({ label, onClick, isActive }) => (
  <div className="tab-wrapper">
    <div className={`tab ${isActive ? "active" : ""}`} onClick={onClick}>
      {label}
    </div>
  </div>
);

export default Tab;
