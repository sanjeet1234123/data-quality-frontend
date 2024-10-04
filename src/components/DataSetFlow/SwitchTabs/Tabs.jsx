import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Tab from "./Tab";
import "./Tabs.css";
import SwitchTabOne from "./SwitchTabOne/SwitchTabOne";
import SwitchTabTwo from "./SwitchTabTwo/SwitchTabTwo";
import SwitchTabThree from "./SwitchTabThree/SwitchTabThree";
import SwitchTabFour from "./SwitchTabFour/SwitchTabFour";
import SwitchTabFive from "./SwitchTabFive/SwitchTabFive";
import SwitchTabSix from "./SwitchTabSix/SwitchTabSix";

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);
  const location = useLocation();

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const shouldRenderTabContent = !location.pathname.includes("profiling");

  return (
    <div className="tabs-container">
      <div className="tabs">
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            onClick={() => handleTabClick(index)}
            isActive={index === activeTab}
          />
        ))}
      </div>
      <Outlet />
      {shouldRenderTabContent && (
        <div className="tab-content">
          {activeTab === 0 && (
            <div className="tab-pane">
              <SwitchTabOne />
            </div>
          )}
          {activeTab === 1 && (
            <div className="tab-pane">
              <SwitchTabTwo />
            </div>
          )}
          {activeTab === 2 && (
            <div className="tab-pane">
              <SwitchTabThree />
            </div>
          )}
          {activeTab === 3 && (
            <div className="tab-pane">
              <SwitchTabFour />
            </div>
          )}
          {activeTab === 4 && (
            <div className="tab-pane">
              <SwitchTabFive />
            </div>
          )}
          {activeTab === 5 && (
            <div className="tab-pane">
              <SwitchTabFour />
            </div>
          )}
          {activeTab === 6 && (
            <div className="tab-pane">
              <SwitchTabFive />
            </div>
          )}
          {activeTab === 7 && (
            <div className="tab-pane">
              <SwitchTabSix />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Tabs;
