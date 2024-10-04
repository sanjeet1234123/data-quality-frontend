import { useParams } from "react-router-dom";
import database from "../SwitchTabOne/images/database.png";
import styles from "./SwitchTabTwo.css";
import { useEffect, useState } from "react";
import { handleGetSchema } from "./switchTabTwoAPI.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import datasource from "../SwitchTabOne/images/data-source.png";
import profiling from "../SwitchTabOne/images/profiling.png";
import monitoringchecks from "../SwitchTabOne/images/monitoring-checks.png";
import partitionchecks from "../SwitchTabOne/images/partition-checks.png";
import { REACT_BASE_LOCAL_URL, REACT_BASE_PROD_URL } from "../../../../config";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import ProfilingTable from "../../../ProfilingTable/ProfilingTable.jsx";


function SwitchTabMonitoringChecks() {
  const { connectionName } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("data-quality");
  const [schemaData, setSchemaData] = useState([]);

  const [tables, setTables] = useState([]);
  const [selectedTables, setSelectedTables] = useState([]);

  const [tableData, setTableData] = useState([]);
  const [loadingTables, setLoadingTables] = useState(true);
  const [errorTables, setErrorTables] = useState(null);

  const [columnData, setColumnData] = useState([]);
  const [loadingColumns, setLoadingColumns] = useState(true);
  const [errorColumns, setErrorColumns] = useState(null);
  const [activeScheduleTab1, setActiveScheduleTab1] = useState("data-tables");

  const handleScheduleTabClick1 = (tab) => {
    setActiveScheduleTab1(tab);
  };

  const [schemaFilter, setSchemaFilter] = useState("");
  const [tableFilter, setTableFilter] = useState("");
  const [columnFilter, setColumnFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);

  // Separate filters for each view
  const [tableSchemaFilter, setTableSchemaFilter] = useState("");
  const [tableTableFilter, setTableTableFilter] = useState("");
  const [columnSchemaFilter, setColumnSchemaFilter] = useState("");
  const [columnTableFilter, setColumnTableFilter] = useState("");
  // const [columnFilter, setColumnFilter] = useState('');
  // const [typeFilter, setTypeFilter] = useState('');

  const [filteredTableRows, setFilteredTableRows] = useState([]);
  const [filteredColumnRows, setFilteredColumnRows] = useState([]);

  // pagination states for columns
  const [currentColumnPage, setCurrentColumnPage] = useState(1);
  const rowsPerPage = 10;

  // pagination states for tables
  const [currentTablePage, setCurrentTablePage] = useState(1);

  const [selectedTable, setSelectedTable] = useState(null);
  const [viewingTableInfo, setViewingTableInfo] = useState(false);


  const handleTablePageChange = (event, value) => {
    setCurrentTablePage(value);
  };
  const handleColumnPageChange = (event, value) => {
    setCurrentColumnPage(value);
  };

  // pagination logic for columns
  const indexOfLastColumnRow = currentColumnPage * rowsPerPage;
  const indexOfFirstColumnRow = indexOfLastColumnRow - rowsPerPage;
  const currentColumnRows = columnData.slice(
    indexOfFirstColumnRow,
    indexOfLastColumnRow
  );
  const totalColumnPages = Math.ceil(columnData.length / rowsPerPage);

  // pagination logic for tables
  const indexOfLastTableRow = currentTablePage * rowsPerPage;
  const indexOfFirstTableRow = indexOfLastTableRow - rowsPerPage;
  const currentTableRows = tableData.slice(
    indexOfFirstTableRow,
    indexOfLastTableRow
  );
  const totalTablePages = Math.ceil(tableData.length / rowsPerPage);

  useEffect(() => {
    const fetchSchema = async () => {
      const data = await handleGetSchema({ DB_NAME: connectionName });
      setSchemaData(data);
    };

    fetchSchema();
  }, []);

  useEffect(() => {
    const fetchColumnsData = async () => {
      try {
        const response = await axios.get(
          REACT_BASE_LOCAL_URL +
            `/api/search/columns?connection=${connectionName}&schema=&table=&column=&page=1&limit=50&checkType=monitoring`
        );
        setColumnData(response.data);
        setLoadingColumns(false);
      } catch (err) {
        setErrorColumns(err);
        setLoadingColumns(false);
      }
    };

    fetchColumnsData();
  }, [connectionName]);

  useEffect(() => {
    const fetchTablesData = async () => {
      try {
        const response = await axios.get(
          REACT_BASE_LOCAL_URL +
            `/api/search/tables?connection=${connectionName}&schema=&table=&page=1&limit=50&checkType=monitoring`
        );
        setTableData(response.data);
        setLoadingTables(false);
      } catch (err) {
        setErrorTables(err);
        setLoadingTables(false);
      }
    };

    fetchTablesData();
  }, [connectionName]);

  useEffect(() => {
    // Filter for Table View
    if (searchTriggered) {
      const filteredTables = currentTableRows.filter((item) => {
        const schemaMatch = item.target.schema_name
          .toLowerCase()
          .includes(tableSchemaFilter.toLowerCase());
        const tableMatch = item.target.table_name
          .toLowerCase()
          .includes(tableTableFilter.toLowerCase());
        return schemaMatch && tableMatch;
      });
      setFilteredTableRows(filteredTables);
    } else {
      setFilteredTableRows(currentTableRows);
    }
  }, [searchTriggered, tableSchemaFilter, tableTableFilter, currentTableRows]);

  useEffect(() => {
    // Filter for Column View
    if (searchTriggered) {
      const filteredColumns = currentColumnRows.filter((item) => {
        const schemaMatch = item.table.schema_name
          .toLowerCase()
          .includes(columnSchemaFilter.toLowerCase());
        const tableMatch = item.table.table_name
          .toLowerCase()
          .includes(columnTableFilter.toLowerCase());
        const columnMatch = item.column_name
          .toLowerCase()
          .includes(columnFilter.toLowerCase());
        const typeMatch = item.type_snapshot.column_type
          .toLowerCase()
          .includes(typeFilter.toLowerCase());
        return schemaMatch && tableMatch && columnMatch && typeMatch;
      });
      setFilteredColumnRows(filteredColumns);
    } else {
      setFilteredColumnRows(currentColumnRows);
    }
  }, [
    searchTriggered,
    columnSchemaFilter,
    columnTableFilter,
    columnFilter,
    typeFilter,
    currentColumnRows,
  ]);

  const handleSearch = () => {
    setSearchTriggered(true);
  };

  return (
    <div className={styles.SwitchTabMonitoringChecks}>
        {viewingTableInfo ? (
          <ProfilingTable 
            table={selectedTable.name} 
            schema={selectedTable.schema} 
            connection={selectedTable.connection}
            onBack={() => setViewingTableInfo(false)}
          />
        ) : (
        <div>
      <div className="top-data-overview">
        <div className="connection-name">
          <img src={database} alt="database" />
          <h2>{connectionName}</h2>
        </div>
      </div>

      <div className="tab-data-overview">
        <div
          className={`tab-data ${activeTab === "schemas" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("schemas");
          }}
        >
          <p>Schemas</p>
        </div>
        <div
          className={`tab-data ${activeTab === "data-quality" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("data-quality");
          }}
        >
          <p>Data quality summary</p>
        </div>
      </div>

      {console.log(schemaData)}

      {activeTab === "schemas" && (
        <table className={styles.schema}>
          <tbody>
            {schemaData.length > 0 ? (
              schemaData.map((schema, index) => (
                <tr key={index} className={styles.schemaData}>
                  <td>
                    <h4>{schema.schema_name}</h4>
                  </td>
                  <td>
                    <p>Edit multiple data quality checks</p>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">
                  <p>No schema data available</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {activeTab === "data-quality" && (
        <div>
          <div className="nested-tab-overview">
            <div
              className={`tab-data ${
                activeScheduleTab1 === "data-tables" ? "active" : ""
              }`}
              onClick={() => handleScheduleTabClick1("data-tables")}
            >
              <p>Tables</p>
            </div>
            <div
              className={`tab-data ${
                activeScheduleTab1 === "data-columns" ? "active" : ""
              }`}
              onClick={() => handleScheduleTabClick1("data-columns")}
            >
              <p>Columns</p>
            </div>
          </div>
          {activeScheduleTab1 === "data-tables" && (
            <div className="data-tables-container">
              <div className="filter-section">
                <input
                  type="text"
                  placeholder="Schema name"
                  className="filter-input"
                  value={tableSchemaFilter}
                  onChange={(e) => setTableSchemaFilter(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Table name"
                  className="filter-input"
                  value={tableTableFilter}
                  onChange={(e) => setTableTableFilter(e.target.value)}
                />
                <button className="search-button" onClick={handleSearch}>
                  Search
                </button>
                <button
                  className="reset-button"
                  onClick={() => {
                    setTableSchemaFilter("");
                    setTableTableFilter("");
                    setSearchTriggered(false); // Reset the search trigger
                  }}
                >
                  Reset
                </button>
              </div>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Schema</th>
                    <th>Table</th>
                    <th>Data quality KPI</th>
                    <th>Completeness</th>
                    <th>Validity</th>
                    <th>Consistency</th>
                    <th>Availability</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingTables ? (
                    <tr>
                      <td colSpan="8" style={{ textAlign: "center" }}>
                        Loading...
                      </td>
                    </tr>
                  ) : errorTables ? (
                    <tr>
                      <td colSpan="8" style={{ textAlign: "center" }}>
                        Error loading data
                      </td>
                    </tr>
                  ) : filteredTableRows.length === 0 ? (
                    <tr>
                      <td colSpan="8" style={{ textAlign: "center" }}>
                        No data available
                      </td>
                    </tr>
                  ) : (
                    filteredTableRows.map((item) => {
                      const {
                        schema_name,
                        table_name,
                        data_quality_kpi,
                        dimensions,
                      } = item.data_quality_status;

                      return (
                        <tr key={item.table_hash}>
                          <td
                          >
                            {item.target.schema_name}
                            </td>
                          <td
                            style={{ cursor: "pointer",textDecoration: "underline",paddingBottom:"2px" }}
                            onClick={() => {
                              setSelectedTable({
                                name: item.target.table_name,
                                schema: item.target.schema_name,
                                connection: connectionName
                              });
                              setViewingTableInfo(true); // Show the ProfilingTable component
                            }}
                          >
                            {item.target.table_name}
                          </td>
                          <td>
                            {data_quality_kpi ? (
                              <span
                                style={{
                                  backgroundColor:
                                    data_quality_kpi < 100
                                      ? "rgb(239, 236, 130)"
                                      : "#fb7857",
                                  padding: "3px 5px",
                                  borderRadius: "4px",
                                  fontSize: "12px",
                                  fontWeight: "300",
                                }}
                              >
                                {`${data_quality_kpi}%`}
                              </span>
                            ) : (
                              <span
                                style={{
                                  visibility: "hidden",
                                  display: "inline-block",
                                  width: "100%",
                                }}
                              >
                                N/A
                              </span>
                            )}
                          </td>
                          <td>
                            {dimensions?.Completeness?.data_quality_kpi ? (
                              <span
                                style={{
                                  backgroundColor:
                                    dimensions.Completeness.current_severity ===
                                    "warning"
                                      ? "rgb(239, 236, 130)"
                                      : "#fb7857",
                                  padding: "3px 5px",
                                  borderRadius: "4px",
                                  fontSize: "12px",
                                  fontWeight: "300",
                                }}
                              >
                                {`${dimensions.Completeness.data_quality_kpi}%`}
                              </span>
                            ) : (
                              <span
                                style={{
                                  visibility: "hidden",
                                  display: "inline-block",
                                  width: "100%",
                                }}
                              >
                                N/A
                              </span>
                            )}
                          </td>
                          <td>
                            {dimensions?.Validity?.data_quality_kpi ? (
                              <span
                                style={{
                                  backgroundColor:
                                    dimensions.Validity.current_severity ===
                                    "warning"
                                      ? "rgb(239, 236, 130)"
                                      : "#fb7857",
                                  padding: "3px 5px",
                                  borderRadius: "4px",
                                  fontSize: "12px",
                                  fontWeight: "300",
                                }}
                              >
                                {`${dimensions.Validity.data_quality_kpi}%`}
                              </span>
                            ) : (
                              <span
                                style={{
                                  visibility: "hidden",
                                  display: "inline-block",
                                  width: "100%",
                                }}
                              >
                                N/A
                              </span>
                            )}
                          </td>
                          <td>
                            {dimensions?.Consistency?.data_quality_kpi ? (
                              <span
                                style={{
                                  backgroundColor:
                                    dimensions.Consistency.current_severity ===
                                    "warning"
                                      ? "rgb(239, 236, 130)"
                                      : "#fb7857",
                                  padding: "3px 5px",
                                  borderRadius: "4px",
                                  fontSize: "12px",
                                  fontWeight: "300",
                                }}
                              >
                                {`${dimensions.Consistency.data_quality_kpi}%`}
                              </span>
                            ) : (
                              <span
                                style={{
                                  visibility: "hidden",
                                  display: "inline-block",
                                  width: "100%",
                                }}
                              >
                                N/A
                              </span>
                            )}
                          </td>
                          <td>
                            {dimensions?.Availability?.data_quality_kpi ? (
                              <span
                                style={{
                                  backgroundColor:
                                    dimensions.Availability.current_severity ===
                                    "warning"
                                      ? "rgb(239, 236, 130)"
                                      : "#fb7857",
                                  padding: "3px 5px",
                                  borderRadius: "4px",
                                  fontSize: "12px",
                                  fontWeight: "300",
                                }}
                              >
                                {`${dimensions.Availability.data_quality_kpi}%`}
                              </span>
                            ) : (
                              <span
                                style={{
                                  visibility: "hidden",
                                  display: "inline-block",
                                  width: "100%",
                                }}
                              >
                                N/A
                              </span>
                            )}
                          </td>
                          <td
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <img
                              src={datasource}
                              style={{
                                width: "18px",
                                height: "20px",
                                cursor: "pointer",
                                marginRight: "5px",
                              }}
                              alt="Data Source"
                            />
                            <img
                              src={profiling}
                              style={{
                                width: "18px",
                                height: "20px",
                                cursor: "pointer",
                                marginRight: "5px",
                              }}
                              alt="Profiling"
                            />
                            <img
                              src={monitoringchecks}
                              style={{
                                width: "18px",
                                height: "20px",
                                cursor: "pointer",
                                marginRight: "5px",
                              }}
                              alt="Monitoring Checks"
                            />
                            <img
                              src={partitionchecks}
                              style={{
                                width: "18px",
                                height: "20px",
                                cursor: "pointer",
                              }}
                              alt="Partition Checks"
                            />
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
              <div className="pagination">
                <Stack spacing={2}>
                  <Pagination
                    count={totalTablePages}
                    page={currentTablePage}
                    onChange={handleTablePageChange}
                    variant="outlined"
                    shape="rounded"
                    sx={{
                      "& .MuiPaginationItem-root": {
                        color: "#fb7857", // Text color for the items
                      },
                      "& .MuiPaginationItem-outlined": {
                        borderColor: "#fb7857", // Border color for the outlined items
                      },
                      "& .MuiPaginationItem-outlined.Mui-selected": {
                        backgroundColor: "#fb7857", // Background color for the selected item
                        color: "#fff", // Text color for the selected item
                      },
                      "& .MuiPaginationItem-outlined:hover": {
                        backgroundColor: "rgba(251, 120, 87, 0.2)", // Hover effect
                      },
                    }}
                  />
                </Stack>
              </div>
            </div>
          )}
          {activeScheduleTab1 === "data-columns" && (
            <div className="data-columns-container">
              <div className="filter-section">
                <input
                  type="text"
                  placeholder="Schema name"
                  className="filter-input"
                  value={columnSchemaFilter}
                  onChange={(e) => setColumnSchemaFilter(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Table name"
                  className="filter-input"
                  value={columnTableFilter}
                  onChange={(e) => setColumnTableFilter(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Column name"
                  className="filter-input"
                  value={columnFilter}
                  onChange={(e) => setColumnFilter(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Column type"
                  className="filter-input"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                />
                <button className="search-button" onClick={handleSearch}>
                  Search
                </button>
                <button
                  className="reset-button"
                  onClick={() => {
                    setColumnSchemaFilter("");
                    setColumnTableFilter("");
                    setColumnFilter("");
                    setTypeFilter("");
                    setSearchTriggered(false);
                  }}
                >
                  Reset
                </button>
              </div>
              <table className="data-columns">
                <thead>
                  <tr>
                    <th>Schema</th>
                    <th>Table</th>
                    <th>Column</th>
                    <th>Column Type</th>
                    <th>Data Quality KPI</th>
                    <th>Completeness</th>
                    <th>Validity</th>
                    <th>Consistency</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingColumns ? (
                    <tr>
                      <td colSpan="9" style={{ textAlign: "center" }}>
                        Loading...
                      </td>
                    </tr>
                  ) : errorColumns ? (
                    <tr>
                      <td colSpan="9" style={{ textAlign: "center" }}>
                        Error loading data
                      </td>
                    </tr>
                  ) : filteredColumnRows.length === 0 ? (
                    <tr>
                      <td colSpan="9" style={{ textAlign: "center" }}>
                        No data available
                      </td>
                    </tr>
                  ) : (
                    filteredColumnRows.map((item) => {
                      const {
                        schema_name,
                        table_name,
                        column_name,
                        type_snapshot,
                        data_quality_status,
                      } = item;
                      const dimensions = data_quality_status.dimensions || {};

                      return (
                        <tr key={item.column_hash}>
                          <td>{item.table.schema_name}</td>
                          <td>{item.table.table_name}</td>
                          <td>{item.column_name}</td>
                          <td>{type_snapshot.column_type}</td>
                          <td>
                            {data_quality_status?.data_quality_kpi ? (
                              <span
                                style={{
                                  backgroundColor:
                                    data_quality_status.data_quality_kpi < 100
                                      ? "rgb(239, 236, 130)"
                                      : "#fb7857",
                                  padding: "3px 5px",
                                  borderRadius: "4px",
                                  fontSize: "12px",
                                  fontWeight: "300",
                                }}
                              >
                                {`${data_quality_status.data_quality_kpi}%`}
                              </span>
                            ) : (
                              <span
                                style={{
                                  visibility: "hidden",
                                  display: "inline-block",
                                  width: "100%",
                                }}
                              >
                                N/A
                              </span>
                            )}
                          </td>
                          <td>
                            {dimensions?.Completeness?.data_quality_kpi ? (
                              <span
                                style={{
                                  backgroundColor:
                                    dimensions.Completeness.current_severity ===
                                    "warning"
                                      ? "rgb(239, 236, 130)"
                                      : "#fb7857",
                                  padding: "3px 5px",
                                  borderRadius: "4px",
                                  fontSize: "12px",
                                  fontWeight: "300",
                                }}
                              >
                                {`${dimensions.Completeness.data_quality_kpi}%`}
                              </span>
                            ) : (
                              <span
                                style={{
                                  visibility: "hidden",
                                  display: "inline-block",
                                  width: "100%",
                                }}
                              >
                                N/A
                              </span>
                            )}
                          </td>
                          <td>
                            {dimensions?.Validity?.data_quality_kpi ? (
                              <span
                                style={{
                                  backgroundColor:
                                    dimensions.Validity.current_severity ===
                                    "warning"
                                      ? "rgb(239, 236, 130)"
                                      : "#fb7857",
                                  padding: "3px 5px",
                                  borderRadius: "4px",
                                  fontSize: "12px",
                                  fontWeight: "300",
                                }}
                              >
                                {`${dimensions.Validity.data_quality_kpi}%`}
                              </span>
                            ) : (
                              <span
                                style={{
                                  visibility: "hidden",
                                  display: "inline-block",
                                  width: "100%",
                                }}
                              >
                                N/A
                              </span>
                            )}
                          </td>
                          <td>
                            {dimensions?.Consistency?.data_quality_kpi ? (
                              <span
                                style={{
                                  backgroundColor:
                                    dimensions.Consistency.current_severity ===
                                    "warning"
                                      ? "rgb(239, 236, 130)"
                                      : "#fb7857",
                                  padding: "3px 5px",
                                  borderRadius: "4px",
                                  fontSize: "12px",
                                  fontWeight: "300",
                                }}
                              >
                                {`${dimensions.Consistency.data_quality_kpi}%`}
                              </span>
                            ) : (
                              <span
                                style={{
                                  visibility: "hidden",
                                  display: "inline-block",
                                  width: "100%",
                                }}
                              >
                                N/A
                              </span>
                            )}
                          </td>
                          <td
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <img
                              src={datasource}
                              style={{
                                width: "18px",
                                height: "20px",
                                cursor: "pointer",
                                marginRight: "5px",
                              }}
                              alt="Data Source"
                            />
                            <img
                              src={profiling}
                              style={{
                                width: "18px",
                                height: "20px",
                                cursor: "pointer",
                                marginRight: "5px",
                              }}
                              alt="Profiling"
                            />
                            <img
                              src={monitoringchecks}
                              style={{
                                width: "18px",
                                height: "20px",
                                cursor: "pointer",
                                marginRight: "5px",
                              }}
                              alt="Monitoring Checks"
                            />
                            <img
                              src={partitionchecks}
                              style={{
                                width: "18px",
                                height: "20px",
                                cursor: "pointer",
                              }}
                              alt="Partition Checks"
                            />
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
              <div className="pagination">
                <Stack spacing={2}>
                  <Pagination
                    count={totalTablePages}
                    page={currentTablePage}
                    onChange={handleTablePageChange}
                    variant="outlined"
                    shape="rounded"
                    sx={{
                      "& .MuiPaginationItem-root": {
                        color: "#fb7857", // Text color for the items
                      },
                      "& .MuiPaginationItem-outlined": {
                        borderColor: "#fb7857", // Border color for the outlined items
                      },
                      "& .MuiPaginationItem-outlined.Mui-selected": {
                        backgroundColor: "#fb7857", // Background color for the selected item
                        color: "#fff", // Text color for the selected item
                      },
                      "& .MuiPaginationItem-outlined:hover": {
                        backgroundColor: "rgba(251, 120, 87, 0.2)", // Hover effect
                      },
                    }}
                  />
                </Stack>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
      )}
    </div>
  );
}

export default SwitchTabMonitoringChecks;
