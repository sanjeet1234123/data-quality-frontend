import React, { useState, useRef } from "react";
import linkImg from "../images/link-icon.svg";
import axios from "axios";
import "./DataSourceForm.css";
import postgreSQLimg from "../images/postgreSQL.svg";
import snowflakeImg from "../images/snowflake.svg";
import amazonRedshiftImg from "../images/amazonRedshift.svg";
import microsoftAzureImg from "../images/microsoftAzure.svg";
import googleBigQueryImg from "../images/googleBigQuery.svg";
import oracleImg from "../images/oracle.svg";
import databricksImg from "../images/databricks.svg";
import teradataImg from "../images/teradata.svg";
import amazonAthinaImg from "../images/amazonAthena.svg";
import Connect from "../images/Connect.svg";
import { REACT_BASE_LOCAL_URL } from "../../../../config"

export default function DataSourceForm() {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [isConnectionTested, setIsConnectionTested] = useState(false);
  const [formData, setFormData] = useState({
    user_id: "",
    name: "",
    desc: "",
    sensitivity: "",
    data_type: "",
    host: "",
    port: null,
    database_name: "",
    username: "",
    password: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [isCSVUploaded, setIsCSVUploaded] = useState(false);
  const inputRef = useRef(null);

  const [fieldErrors, setFieldErrors] = useState({});


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setFieldErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const { name, desc, sensitivity, data_type, host, port, database_name, username, password } = formData;
    const newFieldErrors = {};

    if (!name) newFieldErrors.name = "Display Name is required.";
    if (!desc) newFieldErrors.desc = "Description is required.";
    if (!host) newFieldErrors.host = "Host is required.";
    if (!port) newFieldErrors.port = "Port is required.";
    if (isNaN(port) || port <= 0) newFieldErrors.port = "Port must be a valid positive number.";
    if (!database_name) newFieldErrors.database_name = "Database Name is required.";
    if (!username) newFieldErrors.username = "User Name is required.";
    if (!password) newFieldErrors.password = "Password is required.";

    setFieldErrors(newFieldErrors);
    return Object.keys(newFieldErrors).length === 0;
  };

  const handleTestConnection = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const testConnectionData = {
      provider_type: "postgresql",
      postgresql: {
        port: formData.port || "5432",
        properties: {},
        user: formData.username,
        password: formData.password,
        host: formData.host,
        database: formData.database_name,
      },
    };

    try {
      const response = await axios.post(
        `${REACT_BASE_LOCAL_URL}/api/datasource/testconnection?verifyNameUniqueness=true`,
        { ...testConnectionData, connection_name: formData.name },
        { headers: { "Content-Type": "application/json" } }
      );

      const { connectionTestResult, errorMessage } = response.data;

      if (connectionTestResult === "SUCCESS") {
        setMessage("Connection test successful.");
        setError("");
        setIsConnectionTested(true);
      } else {
        setError(errorMessage || "Connection test failed. Please check your inputs.");
        setMessage("");
        setIsConnectionTested(false);
      }
    } catch (error) {
      setError("Connection test failed. Please check your inputs.");
      setMessage("");
      setIsConnectionTested(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isConnectionTested) {
      setError("Please test the connection first.");
      return;
    }
    if (!validateForm()) return;
  
    const formDataToSend = {
      provider_type: "postgresql",
      postgresql: {
        port: formData.port || "5432",
        properties: {},
        user: formData.username,
        password: formData.password,
        host: formData.host,
        database: formData.database_name,
      },
      connection_name: formData.name,
    };
  
    try {
      const response = await axios.post(
        `${REACT_BASE_LOCAL_URL}/api/connections/${formData.name}/basic`,
        formDataToSend
      );
      setMessage("Connection successfully added");
      setError("");
      window.location.reload();
    } catch (error) {
      setError(
        error.response?.status === 409
          ? "Connection name already exists"
          : error.response?.data?.error || "An error occurred while submitting the form."
      );
      setMessage("");
    }
  };
  

  function handleFile(files) {
    if (files && files[0]) {
      setSelectedFile(files[0]);
      setIsCSVUploaded(true);
    }
  }

  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files);
    }
  };

  const handleFileChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files);
    }
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  const clearFileSelection = () => {
    setSelectedFile(null);
    setIsCSVUploaded(false);
    setFormData((prevData) => ({
      ...prevData,
      sensitivity: "",
      data_type: "",
      host: "",
      port: null,
      database_name: "",
      username: "",
      password: "",
    }));
  };

  return (
    <>
      <div className="sd-body-heading">
        <p>Data Source type</p>
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
      {/* <div className="drag-drop-file-wrapper">
        <form
          id="form-file-upload"
          onDragEnter={handleDrag}
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            ref={inputRef}
            type="file"
            id="input-file-upload"
            onChange={handleFileChange}
            accept=".csv"
          />
          <label
            id="label-file-upload"
            htmlFor="input-file-upload"
            className={dragActive ? "drag-active" : ""}
          >
            <div>
              <p>Drag and drop your CSV file here or</p>
              <button className="upload-button" onClick={onButtonClick}>
                Upload a file
              </button>
            </div>
          </label>
          {dragActive && (
            <div
              id="drag-file-element"
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            ></div>
          )}
        </form>
      </div>
      {selectedFile && (
        <div className="selected-file-wrapper">
          <p className="selected-file">Selected file: {selectedFile.name}</p>
          <button
            onClick={clearFileSelection}
            className="data-source-connect-btn"
            style={{ marginTop: "10px" }}
          >
            <p>Clear Selection</p>
          </button>
        </div>
      )} */}

      <div className="data-source-form-wrapper">
        <form className="data-source-form" onSubmit={handleSubmit}>
          <div className="form-first-section">
            <label htmlFor="displayName">
              Display Name<span>*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter name to display"
              required
              value={formData.name}
              onChange={handleChange}
            />
            {fieldErrors.name && <p className="error-message">{fieldErrors.name}</p>}

            <label htmlFor="desc">
              Description<span>*</span>
            </label>
            <input
              type="text"
              name="desc"
              placeholder="Enter desc"
              required
              value={formData.desc}
              onChange={handleChange}
            />
            {fieldErrors.desc && <p className="error-message">{fieldErrors.desc}</p>}

            {!isCSVUploaded && (
              <>
                <label htmlFor="sensitivity">
                  Sensitivity<span></span>
                </label>
                <select
                  name="sensitivity"
                  required
                  value={formData.sensitivity}
                  onChange={handleChange}
                >
                  <option value="none">None</option>
                  <option value="high">High</option>
                  <option value="low">Low</option>
                </select>
                <label htmlFor="data_type">
                  Data Type<span></span>
                </label>
                <select
                  name="data_type"
                  required
                  value={formData.data_type}
                  onChange={handleChange}
                >
                  <option value="none">None</option>
                  <option value="data element">Data Element</option>
                  <option value="metadata">Metadata</option>
                  <option value="other">Other</option>
                </select>
              </>
            )}
          </div>

          {!isCSVUploaded && (
            <>
              <div className="form-credential-section">
                <p>Credentials</p>
                <label htmlFor="host">
                  Host<span>*</span>
                </label>
                <input
                  type="text"
                  name="host"
                  placeholder="Enter host name"
                  required
                  value={formData.host}
                  onChange={handleChange}
                />
                {fieldErrors.host && <p className="error-message">{fieldErrors.host}</p>}

                <label htmlFor="port">
                  Port<span>*</span>
                </label>
                <input
                  type="text"
                  name="port"
                  placeholder="Enter the port"
                  required
                  value={formData.port}
                  onChange={handleChange}
                />
                {fieldErrors.port && <p className="error-message">{fieldErrors.port}</p>}

                <label htmlFor="databaseName">
                  Database Name<span>*</span>
                </label>
                <input
                  type="text"
                  name="database_name"
                  placeholder="Enter the database name"
                  required
                  value={formData.database_name}
                  onChange={handleChange}
                />
                {fieldErrors.database_name && <p className="error-message">{fieldErrors.database_name}</p>}
              </div>
              <div className="form-authentication-section">
                <p>Authentication</p>
                <label htmlFor="username">
                  User Name<span>*</span>
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter user name"
                  required
                  value={formData.username}
                  onChange={handleChange}
                />
                {fieldErrors.username && <p className="error-message">{fieldErrors.username}</p>}

                <label htmlFor="password">
                  Password<span>*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
                {fieldErrors.password && <p className="error-message">{fieldErrors.password}</p>}
              </div>
            </>
          )}

          {error && <p className="error-message">{error}</p>}
          {message && <p className="success-message">{message}</p>}
          <div className="data-source-connect-btn-wrapper">
            <div className="btn-inner-wrapper">
              <button
                type="button"
                onClick={handleTestConnection}
                className="data-source-connect-btn2"
              >
                <img src={Connect} alt="link-icon" />
                <p>Test Connection</p>
              </button>
              <button
                type="submit"
                className="data-source-connect-btn"
                disabled={!isConnectionTested}
              >
                <img className="abc" src={linkImg} alt="link-icon" />
                <p>Connect</p>
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
