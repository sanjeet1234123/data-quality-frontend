import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import SideNavBar from "../Home/SideNavBar/SideNavBar";
import "./DataSource.css";

import DataSourceForm from "../Home/SideNavBar/DataSourceForm/DataSourceForm";
import crossicon from "./images/cross-icon.svg";

import emptyBoxImg from "./images/empty-box 1.svg";
import postgreSQLimg from "./images/postgreSQL.svg";
import snowflakeImg from "./images/snowflake.svg";
import amazonRedshiftImg from "./images/amazonRedshift.svg";
import microsoftAzureImg from "./images/microsoftAzure.svg";
import googleBigQueryImg from "./images/googleBigQuery.svg";
import oracleImg from "./images/oracle.svg";
import databricksImg from "./images/databricks.svg";
import teradataImg from "./images/teradata.svg";
import amazonAthinaImg from "./images/amazonAthena.svg";
import DataSourceTable from "./DataSourceTable/DataSourceTable";

// import NoDataSourceWrapper from "./NoDataSourceWrapper"; // Assume you've separated this into its own component

export default function DataSource() {
  const [data, setData] = useState([]);
  const tokenStr = localStorage.getItem("accessToken");

  const fetchData = useCallback(() => {
    const storedData = localStorage.getItem("dataSourceTableData");

    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      axios
        .get(
          "https://data-quality-backend.lab.neuralcompany.team/get_the_csv_data",
          {
            headers: { Authorization: `Bearer ${tokenStr}` },
          }
        )
        .then((response) => {
          setData(response.data);
          localStorage.setItem(
            "dataSourceTableData",
            JSON.stringify(response.data)
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [tokenStr]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDeleteRow = (id) => {
    axios
      .delete(
        `https://data-quality-backend.lab.neuralcompany.team/delete_the_csv_data/${id}`,
        {
          headers: { Authorization: `Bearer ${tokenStr}` },
        }
      )
      .then(() => {
        const updatedData = data.filter((item) => item.file_id !== id);
        setData(updatedData);
        localStorage.setItem(
          "dataSourceTableData",
          JSON.stringify(updatedData)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRefresh = () => {
    fetchData();
  };

  return (
    <div className="data-source">
      <SideNavBar />
      {data.length === 0 ? (
        <NoDataSourceWrapper />
      ) : (
        <DataSourceWrapper
          data={data}
          onRefresh={handleRefresh}
          onDeleteRow={handleDeleteRow}
        />
      )}
    </div>
  );
}

const DataSourceWrapper = ({ data, onRefresh, onDeleteRow }) => {
  return (
    <div className="data-source-wrapper">
      <div className="data-source-header">
        <div className="data-source-header-back-btn">
          <p>Data Source Catalog</p>
        </div>
      </div>
      <div className="data-source-heading-wrapper"></div>
      <DataSourceTable
        data={data}
        onRefresh={onRefresh}
        onDeleteRow={onDeleteRow}
      />
    </div>
  );
};

const NoDataSourceWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="data-source-wrapper">
      <div className="data-source-header">
        <div className="data-source-header-back-btn">
          <p>Data Source Catalog</p>
        </div>
      </div>
      <div className="data-source-main-container">
        <div className="no-data-source-wrapper">
          <div className="no-data-source-heading">
            <img src={emptyBoxImg} alt="emptyBoxImg" />
            <p>No Data Sources added</p>
            <p>Add data source and start exploring your data</p>
          </div>
          <div className="list-of-data-sources-wrapper">
            <div className="data-source-tool">
              <img src={postgreSQLimg} alt="postgreSQL" />
            </div>
            <div className="data-source-tool">
              <img src={microsoftAzureImg} alt="postgreSQL" />
            </div>
            <div className="data-source-tool">
              <img src={amazonRedshiftImg} alt="postgreSQL" />
            </div>
            <div className="data-source-tool">
              <img src={snowflakeImg} alt="postgreSQL" />
            </div>
            <div className="data-source-tool">
              <img src={googleBigQueryImg} alt="postgreSQL" />
            </div>
            <div className="data-source-tool">
              <img src={amazonAthinaImg} alt="postgreSQL" />
            </div>
            <div className="data-source-tool">
              <img src={teradataImg} alt="postgreSQL" />
            </div>
            <div className="data-source-tool">
              <img src={oracleImg} alt="postgreSQL" />
            </div>
            <div className="data-source-tool">
              <img src={databricksImg} alt="postgreSQL" />
            </div>
          </div>
          <div
            className="drag-drop-file-wrapper drag-drop"
            onClick={toggleSidebar}
          >
            <div id="form-file-upload">
              <label id="label-file-upload">
                <div>
                  <p>Drag and drop your CSV file here or</p>
                  <p>Upload a file</p>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className={`sidebar ${isOpen ? "active" : ""}`}>
        <div className="sd-header">
          <h3 className="">Add Data source</h3>
          <div className="sidebar-cross-btn" onClick={toggleSidebar}>
            <img src={crossicon} alt="crossicon" />
          </div>
        </div>
        <div className="sd-body">
          <DataSourceForm onClose={toggleSidebar} />
        </div>
      </div>
      <div
        className={`sidebar-overlay ${isOpen ? "active" : ""}`}
        onClick={toggleSidebar}
      ></div>
    </div>
  );
};