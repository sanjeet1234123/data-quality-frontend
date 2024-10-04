import React, { useState, useEffect, useCallback } from "react";
import "./DataSourceTable.css";
import plusicon from "./images/plus-icon.svg";
import crossicon from "./images/cross-icon.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DataSourceForm from "../../Home/SideNavBar/DataSourceForm/DataSourceForm";
import { Checkbox, FormControlLabel, Typography, Divider } from '@mui/material';
import Box from '@mui/joy/Box';
import Badge from '@mui/joy/Badge';

import IconButton from '@mui/material/IconButton';
import MoreVert from '@mui/icons-material/MoreVert';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import right from "../images/right.png";
import add from "../images/add1.svg";
import { REACT_BASE_LOCAL_URL } from "../../../config";

export default function DataSourceTable({ datacsv }) {
  const [data, setData] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedConnectionName, setSelectedConnectionName] = useState(null);
  const [openRunChecksDialog, setOpenRunChecksDialog] = useState(false);
  const [connectionName, setConnectionName] = useState('');
  const [schemaTableName, setSchemaTableName] = useState('');
  const [columnName, setColumnName] = useState('');
  const [columnDatatype, setColumnDatatype] = useState('');
  const [columnNullable, setColumnNullable] = useState('');
  const [collectErrorSamples, setCollectErrorSamples] = useState(false);
  const [additionalParameters, setAdditionalParameters] = useState('');
  const [openNotification, setOpenNotification] = useState(false); 

  const navigate = useNavigate();

  const fetchData = useCallback(() => {
    axios
      .get(REACT_BASE_LOCAL_URL+"/api/connections")
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData, refreshTrigger]);

  function handleDataSetFlow(connection_hash, connection_name) {
    localStorage.setItem("display_name", connection_name);
    navigate(`/data-set-flow/${connection_name}`);
}


  const handleDeleteRow = (connectionName) => {
    setSelectedConnectionName(connectionName);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    const deleteUrl = REACT_BASE_LOCAL_URL+`/api/connections/${selectedConnectionName}`;
    axios
      .delete(deleteUrl)
      .then((response) => {
        console.log("Delete successful:", response);
        setRefreshTrigger((prev) => prev + 1);
        setOpenDeleteDialog(false);
      })
      .catch((error) => {
        console.error("Delete failed:", error);
        setOpenDeleteDialog(false);
      });
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleRunChecks = () => {
    const payload = {
      check_search_filters: {
        fullTableName: `${schemaTableName}`, 
        connection: connectionName,
        enabled: true
      }
    };

    axios.post(REACT_BASE_LOCAL_URL+"/api/jobs/runchecks?wait=false", payload)
      .then((response) => {
        console.log("Run checks successful:", response.data);
        setOpenRunChecksDialog(false);
      })
      .catch((error) => {
        console.error("Run checks failed:", error);
      });

    setConnectionName('');
    setSchemaTableName('');
    setColumnName('');
    setColumnDatatype('');
    setColumnNullable(false);
    setCollectErrorSamples(false);
  };


  const handleCloseRunChecksDialog = () => {
    setOpenRunChecksDialog(false);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const toggleNotification = () => {
    setOpenNotification((prev) => !prev);
  };


  return (
    <div className="datasource-table-wrapper">
      <div className="table-header-wrapper">
        <h4>Added Data Sources({data.length})</h4>
        <div className="table-search-bar-wrapper">
          <div className="notification">
            <Badge badgeContent="❕" onClick={toggleNotification} sx={{ cursor: 'pointer' }}>
              <Typography sx={{ fontSize: '20px' }}>🔔</Typography>
            </Badge>
            {openNotification && (
              <div className="run-checks-notification">
                <div className="top-run-checks">
                  <h1>Notification:</h1><h1>20</h1>
                </div>
                <div className="bottom-run-checks">
                  <div className="run-checks-row">
                    <div className="left-run-checks-row">
                      <p>Run Checks</p>
                    </div>
                    <div className="right-run-checks-row">
                      <div className="run-check-status">
                        <div className="run-checks-severity">
                        </div>
                        <div className="run-checks-valid">
                          <img src={right}></img>
                        </div>
                        <p>2024-09-27 13:12:24</p>
                      </div>
                      <img src={add}></img>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="add-data-source-btn" onClick={toggleSidebar}>
            <img src={plusicon} alt="+" />
            <p>Add Data Source</p>
          </div>
        </div>
      </div>
      <div className="columns-name">
        <div>Connection Name</div>
        <div>Provider Type</div>
        <div>Hostname</div>
        <div>Port</div>
        <div>Database Name</div>
        <div>Username</div>
        <div>Sensitivity</div>
        <div>Action</div>
      </div>
      {data.map((value, index) => (
        <div
          key={index}
          className="table-data"
          onClick={() =>
            handleDataSetFlow(value.connection_hash, value.connection_name)
          }
        >
          <div className="table-row">
            <div>{value.connection_name}</div>
            <div>{value.provider_type}</div>
            <div>{value.postgresql.host}</div>
            <div>{value.postgresql.port || "N/A"}</div>
            <div>{value.postgresql.database}</div>
            <div>{value.postgresql.user}</div>
            <div className={getSensitivityColorClass("high")}>
              high
            </div>
            <div className="column-action">
              <Dropdown>
                <MenuButton
                  slots={{ root: IconButton }}
                  slotProps={{ root: { variant: 'outlined', color: 'neutral' } }}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <MoreVert />
                </MenuButton>
                <Menu style={{ width: '200px', padding: '15px' }}>
                  <MenuItem onClick={(e) => {
                    e.stopPropagation();
                    setConnectionName(value.connection_name);
                    setOpenRunChecksDialog(true);
                  }}>Run checks</MenuItem>
                  <MenuItem>Collect statistics</MenuItem>
                  <MenuItem>Import Metadata</MenuItem>
                  <MenuItem>Add schema</MenuItem>
                  <MenuItem>Copy name</MenuItem>
                  <MenuItem>Refresh</MenuItem>
                  <MenuItem onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteRow(value.connection_name);
                  }}>Delete connection</MenuItem>
                  <MenuItem>Delete Data</MenuItem>
                </Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      ))}
      <Dialog open={openRunChecksDialog} onClose={handleCloseRunChecksDialog} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#3c3c3c' }}>
          Run checks
        </DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginTop: '8px' }}>
            Connection
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            variant="outlined"
            fullWidth
            value={connectionName}
            onChange={(e) => setConnectionName(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ padding: '16px' }}>
          <Button onClick={handleCloseRunChecksDialog} variant="outlined" sx={{ marginRight: '8px' }}>
            Cancel
          </Button>
          <Button onClick={handleRunChecks} variant="contained" color="primary">
            Run checks
          </Button>
        </DialogActions>
      </Dialog>

      <div className={`sidebar ${isOpen ? "active" : ""}`}>
        <div className="sd-header">
          <h3>Add Data source</h3>
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
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog} sx={{ '& .MuiDialog-paper': { padding: '20px', borderRadius: '12px' } }}>
        <DialogTitle sx={{ backgroundColor: '#f5f5f5', fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>
          Confirm Deletion
        </DialogTitle>
        <DialogContent sx={{ padding: '16px' }}>
          <DialogContentText sx={{ fontSize: '1rem', color: '#666', marginBottom: '16px' }}>
            Are you sure you want to remove connection "{selectedConnectionName}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'flex-end', padding: '16px' }}>
          <Button onClick={handleCloseDeleteDialog} sx={{ backgroundColor: '#f5f5f5', color: '#333', fontWeight: 'bold', marginRight: '8px', padding: '8px 16px', borderRadius: '4px', '&:hover': { backgroundColor: '#e0e0e0' } }}>
            Cancel
          </Button>
          <Button onClick={confirmDelete} sx={{ backgroundColor: '#d32f2f', color: 'white', fontWeight: 'bold', padding: '8px 16px', borderRadius: '4px', '&:hover': { backgroundColor: '#c62828' } }}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Run Checks */}
      <Dialog open={openRunChecksDialog} onClose={handleCloseRunChecksDialog} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#3c3c3c' }}>
          Run checks
        </DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginTop: '8px' }}>
            Connection
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            variant="outlined"
            fullWidth
            value={connectionName}
            onChange={(e) => setConnectionName(e.target.value)}
          />

          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginTop: '16px' }}>
            Schema and table name
          </Typography>
          <TextField
            margin="dense"
            variant="outlined"
            fullWidth
            value={schemaTableName}
            onChange={(e) => setSchemaTableName(e.target.value)}
          />

          <Divider sx={{ margin: '16px 0' }} />

          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginTop: '8px' }}>
            Column name
          </Typography>
          <TextField
            margin="dense"
            variant="outlined"
            fullWidth
            value={columnName}
            onChange={(e) => setColumnName(e.target.value)}
          />

          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginTop: '16px' }}>
            Column datatype
          </Typography>
          <TextField
            margin="dense"
            variant="outlined"
            fullWidth
            value={columnDatatype}
            onChange={(e) => setColumnDatatype(e.target.value)}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={columnNullable}
                onChange={(e) => setColumnNullable(e.target.checked)}
              />
            }
            label="Column nullable"
            sx={{ marginTop: '16px' }}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={collectErrorSamples}
                onChange={(e) => setCollectErrorSamples(e.target.checked)}
              />
            }
            label="Collect error samples"
            sx={{ marginTop: '16px' }}
          />
        </DialogContent>
        <DialogActions sx={{ padding: '16px' }}>
          <Button onClick={handleCloseRunChecksDialog} variant="outlined" sx={{ marginRight: '8px' }}>
            Cancel
          </Button>
          <Button onClick={handleRunChecks} variant="contained" color="primary">
            Run checks
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function getSensitivityColorClass(sensitivity) {
  if (sensitivity === "high") return "high-sensitivity";
  if (sensitivity === "medium") return "medium-sensitivity";
  if (sensitivity === "low") return "low-sensitivity";
  return "";
}
