import "./ProfilingTable.css";
import { useState, useEffect } from "react";
import delete1 from "./Images/delete1.svg";
import delete2 from "./Images/delete2.svg";
import stats from "./Images/stats.svg";
import drop from "./Images/drop-down.svg";
import video from "./Images/video-run.svg"
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Fade from '@mui/material/Fade';
import FormControlLabel from '@mui/material/FormControlLabel';
import enable from "./Images/enable.svg";
import setting1 from "./Images/setting1.svg";
import clock from "./Images/clock.svg";
import runcheck from "./Images/run-check.svg";
import result from "./Images/result.svg";
import question from "./Images/question.svg";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


function ProfilingTable({ table, schema, connection, onBack }) {
  const [activeTab, setActiveTab] = useState("data-statistics");
  const [selectedTables, setSelectedTables] = useState([]);

  const handleCheckboxChange = (columnName) => {
    setSelectedTables(prevSelected =>
      prevSelected.includes(columnName)
        ? prevSelected.filter(name => name !== columnName)
        : [...prevSelected, columnName]
    );
  };

  const [isVolumeExpanded, setIsVolumeExpanded] = useState(true);

  const toggleSection = (section) => {
    if (section === "volume") {
      setIsVolumeExpanded(!isVolumeExpanded);
    }
  };

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [checked, setChecked] = useState(false);

  const handleChange1 = () => {
    setChecked((prev) => !prev);
  };


  const options = ['Error', 'Disabled', 'Warning', 'Fatal', 'Multiple error'];
  const [value, setValue] = useState(options[0]);
  const [inputValue, setInputValue] = useState('Error');

  return (
    <div className="profiling-container">
      <div className="top-profiling-conatiner">
        <h1>Profiling checks for {connection}.{table}.{schema}</h1>
        <div className="profiling-action">
          <button>Collect statistics</button>
          <button onClick={onBack}>Back</button>
        </div>
      </div>

      <div className="tab-data-overview">
        <div
          className={`tab-data ${activeTab === "data-statistics" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("data-statistics");
          }}
        >
          <p>Basic data statistics</p>
        </div>
        <div
          className={`tab-data ${activeTab === "table-preview" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("table-preview");
          }}
        >
          <p>Table preview</p>
        </div>
        <div
          className={`tab-data ${activeTab === "table-quality-status" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("table-quality-status");
          }}
        >
          <p>Table quality status</p>
        </div>
        <div
          className={`tab-data ${activeTab === "profiling-checks-editor" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("profiling-checks-editor");
          }}
        >
          <p>Profiling checks editor</p>
        </div>
      </div>

      {activeTab === "data-statistics" && (
        <div className="data-statistics-conatiner">
          <div className="table-statistics">
            <div className="table-header">
              <p>Total rows: <strong>9.192k</strong></p>
              <p>Column count: <strong>9</strong></p>
              <p>Collected at: <strong>2024-10-04 14:32:38</strong></p>
            </div>

            <table className="statistics-table">
              <thead>
                <tr>
                  <th>Dimensions</th>
                  <th>Column name</th>
                  <th>Detected data type</th>
                  <th>Imported data type</th>
                  <th>Length</th>
                  <th>Nulls percent</th>
                  <th>Distinct count</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <div className="dimention-wrapper" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <input
                          className="stats-input"
                          type="checkbox"
                          checked={selectedTables.includes(row.columnName)}
                          onChange={() => handleCheckboxChange(row.columnName)}
                        />
                        <div className="stats-wrapper">
                          <div className="round"></div>
                          <div className="red-round"></div>
                          <div className="round"></div>
                        </div>
                        {row.dimensions}
                      </div>
                    </td>
                    <td>{row.columnName}</td>
                    <td>{row.detectedDataType}</td>
                    <td>{row.importedDataType}</td>
                    <td>{row.length}</td>
                    <td>
                      <div className="null-wrapper">
                        {row.nullsPercent}
                        <div className="null-percentage">
                        </div>
                      </div>
                    </td>
                    <td><div className="distinct-count">{row.distinctCount}</div></td>
                    <td>
                      <div className="profiling-action-wrapper">
                        <div className="profiling-action-buttom">
                          <img src={stats}></img>
                        </div>
                        <div className="profiling-action-buttom">
                          <img src={delete1}></img>
                        </div>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "table-quality-status" && (
        <div className="table-quality-status">
          <div className="filters-section">
            <div className="group-checks">
              <label>Group checks by:</label>
              <input type="radio" id="category" name="group" value="category" />
              <label htmlFor="category">Category</label>
              <input type="radio" id="quality-dimension" name="group" value="quality-dimension" defaultChecked />
              <label htmlFor="quality-dimension">Quality Dimension</label>
            </div>
            <div className="date-selection-wrapper">
              <div className="date-selection">
                <input type="radio" id="current-month" name="time" value="current-month" />
                <label htmlFor="current-month">Current month</label>
                <input type="radio" id="last-3-months" name="time" value="last-3-months" />
                <label htmlFor="last-3-months">Last 3 months</label>
                <input type="radio" id="since" name="time" value="since" defaultChecked />
                <label htmlFor="since">Since</label>
                <input type="date" id="date-start" />
              </div>
              <div className="severity-status">
                <input type="radio" id="current-severity" name="severity" value="current-severity" />
                <label htmlFor="current-severity">Current severity status</label>
                <input type="radio" id="highest-severity" name="severity" value="highest-severity" defaultChecked />
                <label htmlFor="highest-severity">Highest severity status</label>
              </div>
            </div>
          </div>
          <div className="status-summary">
            <div className="current-status">
              <p><strong>Current table status</strong></p>
              <p>Status: <strong>valid</strong></p>
              <p>Last check executed at: <strong>2024-10-04 08:00:00</strong></p>
              <p>Data quality KPI score: <strong>100.00%</strong></p>
            </div>
            <div className="total-checks">
              <p><strong>Total checks executed</strong></p>
              <p>Total checks executed: <strong>25</strong></p>
              <p>Correct results: <strong>12</strong></p>
              <p>Warnings: <strong>0</strong></p>
              <p>Errors: <strong>0</strong></p>
              <p>Fatal results: <strong>0</strong></p>
              <p>Execution errors: <strong>13</strong></p>
            </div>
          </div>
          <div className="table-checks-wrapper">
            <div className="table-checks-first-row">
              <p>Validity</p>
            </div>
            <div className="table-checks-second-row">
              <p>Table level checks</p>
            </div>
            <div className="table-checks-third-row">
              <div className="table-checks-left-coloumn">
                <p>area</p>
              </div>
              <div className="table-checks-right-coloumn">
                <div className="drop-details">
                  <img src={drop}></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "profiling-checks-editor" && (
        <div className="profiling-checks-editor">
          <div className="top-checks-editor">
            <div className="checks-status">
              <p>Scheduling status: </p><p>Enabled</p>
            </div>
            <div className="checks-status">
              <p>Scheduling configured at:</p><p>Connection level</p>
            </div>
            <div className="checks-status">
              <p>Effective cron expression: </p><p>0 8 * * *</p>
            </div>
            <div className="checks-status">
              <p>Next execution at:</p><p>Oct, 05 2024 08:00</p>
            </div>
            <div className="checks-status">
              <p>Schedule configuration:</p><p>Profiling</p>
            </div>
          </div>
          <div className="check-editor-wrapper">
            <div className="header-all-checks">
              <p>Data quality check</p>
              <p>Issue severity level</p>
              <p>Rule thresholds</p>
              <div className="all-check-action2">
                <img src={delete2}></img>
                <img src={video}></img>
              </div>
            </div>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <AccordionSummary
                aria-controls="panel2-content"
                id="panel2-header"
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid #e7e7e7',
                  padding: '0px 22px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                  <ExpandMoreIcon
                    sx={{
                      marginRight: '8px',
                      transition: 'transform 0.3s',
                      transform: expanded === 'panel1' ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                  <Typography style={{ fontWeight: 'bold' }}>Volume</Typography>
                </div>
                <div className="all-check-action2" style={{ display: 'flex', gap: '8px' }}>
                  <img src={delete2} alt="delete" />
                  <img src={video} alt="video" />
                </div>
              </AccordionSummary>
              <AccordionDetails style={{ padding: '15px 22px' }}>
                <Typography></Typography>
                <div className="run-all-action-details">
                  <div className="left-action-details">
                    <div className="form-controller">
                      <FormControlLabel
                        control={<Switch checked={checked} onChange={handleChange1} />}
                      />
                    </div>
                    <img src={enable} alt="enable" />
                    <img src={setting1} alt="settings" />
                    <img src={clock} alt="clock" />
                    <img src={runcheck} alt="run check" />
                    <img src={result} alt="result" />
                    <img src={question} alt="question" />

                    <div className="row-count-details">
                      <h3>Minimum row count (empty or too small table)</h3>
                      <p>profile_row_count (Completeness)</p>
                    </div>
                    <img src={question} alt="question" />
                  </div>

                  <div>
                    <Autocomplete
                      value={value}
                      onChange={(event, newValue) => setValue(newValue)}
                      inputValue={inputValue}
                      onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
                      id="controllable-states-demo"
                      options={options}
                      sx={{ width: 200 }}
                      renderInput={(params) => <TextField {...params} label="Alert" />}
                    />
                  </div>
                  <Box sx={{ mt: 1 }}>
                    <Fade in={checked}>
                      <div className="run-check-data">Data.alert</div>
                    </Fade>
                  </Box>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
              <AccordionSummary
                aria-controls="panel2-content"
                id="panel2-header"
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid #e7e7e7',
                  padding: '0px 22px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                  <ExpandMoreIcon
                    sx={{
                      marginRight: '8px',
                      transition: 'transform 0.3s',
                      transform: expanded === 'panel2' ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                  <Typography style={{ fontWeight: 'bold' }}>Timeliness</Typography>
                </div>
                <div className="all-check-action2" style={{ display: 'flex', gap: '8px' }}>
                  <img src={delete2} alt="delete" />
                  <img src={video} alt="video" />
                </div>
              </AccordionSummary>
              <AccordionDetails style={{ padding: '15px 22px' }}>
                <Typography></Typography>
                <div className="run-all-action-details">
                  <div className="left-action-details">
                    <div className="form-controller">
                      <FormControlLabel
                        control={<Switch checked={checked} onChange={handleChange1} />}
                      />
                    </div>
                    <img src={enable} alt="enable" />
                    <img src={setting1} alt="settings" />
                    <img src={clock} alt="clock" />
                    <img src={runcheck} alt="run check" />
                    <img src={result} alt="result" />
                    <img src={question} alt="question" />

                    <div className="row-count-details">
                      <h3>Minimum row count (empty or too small table)</h3>
                      <p>profile_row_count (Completeness)</p>
                    </div>
                    <img src={question} alt="question" />
                  </div>

                  <div>
                    <Autocomplete
                      value={value}
                      onChange={(event, newValue) => setValue(newValue)}
                      inputValue={inputValue}
                      onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
                      id="controllable-states-demo"
                      options={options}
                      sx={{ width: 200 }}
                      renderInput={(params) => <TextField {...params} label="Alert" />}
                    />
                  </div>
                  <Box sx={{ mt: 1 }}>
                    <Fade in={checked}>
                      <div className="run-check-data">Data.alert</div>
                    </Fade>
                  </Box>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
              <AccordionSummary
                aria-controls="panel2-content"
                id="panel2-header"
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid #e7e7e7',
                  padding: '0px 22px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                  <ExpandMoreIcon
                    sx={{
                      marginRight: '8px',
                      transition: 'transform 0.3s',
                      transform: expanded === 'panel3' ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                  <Typography style={{ fontWeight: 'bold' }}>Accuracy</Typography>
                </div>
                <div className="all-check-action2" style={{ display: 'flex', gap: '8px' }}>
                  <img src={delete2} alt="delete" />
                  <img src={video} alt="video" />
                </div>
              </AccordionSummary>
              <AccordionDetails style={{ padding: '15px 22px' }}>
                <Typography></Typography>
                <div className="run-all-action-details">
                  <div className="left-action-details">
                    <div className="form-controller">
                      <FormControlLabel
                        control={<Switch checked={checked} onChange={handleChange1} />}
                      />
                    </div>
                    <img src={enable} alt="enable" />
                    <img src={setting1} alt="settings" />
                    <img src={clock} alt="clock" />
                    <img src={runcheck} alt="run check" />
                    <img src={result} alt="result" />
                    <img src={question} alt="question" />

                    <div className="row-count-details">
                      <h3>Minimum row count (empty or too small table)</h3>
                      <p>profile_row_count (Completeness)</p>
                    </div>
                    <img src={question} alt="question" />
                  </div>

                  <div>
                    <Autocomplete
                      value={value}
                      onChange={(event, newValue) => setValue(newValue)}
                      inputValue={inputValue}
                      onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
                      id="controllable-states-demo"
                      options={options}
                      sx={{ width: 200 }}
                      renderInput={(params) => <TextField {...params} label="Alert" />}
                    />
                  </div>
                  <Box sx={{ mt: 1 }}>
                    <Fade in={checked}>
                      <div className="run-check-data">Data.alert</div>
                    </Fade>
                  </Box>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
              <AccordionSummary
                aria-controls="panel2-content"
                id="panel2-header"
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid #e7e7e7',
                  padding: '0px 22px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                  <ExpandMoreIcon
                    sx={{
                      marginRight: '8px',
                      transition: 'transform 0.3s',
                      transform: expanded === 'panel4' ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                  <Typography style={{ fontWeight: 'bold' }}>Custom SQL</Typography>
                </div>
                <div className="all-check-action2" style={{ display: 'flex', gap: '8px' }}>
                  <img src={delete2} alt="delete" />
                  <img src={video} alt="video" />
                </div>
              </AccordionSummary>
              <AccordionDetails style={{ padding: '15px 22px' }}>
                <Typography></Typography>
                <div className="run-all-action-details">
                  <div className="left-action-details">
                    <div className="form-controller">
                      <FormControlLabel
                        control={<Switch checked={checked} onChange={handleChange1} />}
                      />
                    </div>
                    <img src={enable} alt="enable" />
                    <img src={setting1} alt="settings" />
                    <img src={clock} alt="clock" />
                    <img src={runcheck} alt="run check" />
                    <img src={result} alt="result" />
                    <img src={question} alt="question" />

                    <div className="row-count-details">
                      <h3>Minimum row count (empty or too small table)</h3>
                      <p>profile_row_count (Completeness)</p>
                    </div>
                    <img src={question} alt="question" />
                  </div>

                  <div>
                    <Autocomplete
                      value={value}
                      onChange={(event, newValue) => setValue(newValue)}
                      inputValue={inputValue}
                      onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
                      id="controllable-states-demo"
                      options={options}
                      sx={{ width: 200 }}
                      renderInput={(params) => <TextField {...params} label="Alert" />}
                    />
                  </div>
                  <Box sx={{ mt: 1 }}>
                    <Fade in={checked}>
                      <div className="run-check-data">Data.alert</div>
                    </Fade>
                  </Box>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
              <AccordionSummary
                aria-controls="panel2-content"
                id="panel2-header"
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid #e7e7e7',
                  padding: '0px 22px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                  <ExpandMoreIcon
                    sx={{
                      marginRight: '8px',
                      transition: 'transform 0.3s',
                      transform: expanded === 'panel5' ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                  <Typography style={{ fontWeight: 'bold' }}>Availability</Typography>
                </div>
                <div className="all-check-action2" style={{ display: 'flex', gap: '8px' }}>
                  <img src={delete2} alt="delete" />
                  <img src={video} alt="video" />
                </div>
              </AccordionSummary>
              <AccordionDetails style={{ padding: '15px 22px' }}>
                <Typography></Typography>
                <div className="run-all-action-details">
                  <div className="left-action-details">
                    <div className="form-controller">
                      <FormControlLabel
                        control={<Switch checked={checked} onChange={handleChange1} />}
                      />
                    </div>
                    <img src={enable} alt="enable" />
                    <img src={setting1} alt="settings" />
                    <img src={clock} alt="clock" />
                    <img src={runcheck} alt="run check" />
                    <img src={result} alt="result" />
                    <img src={question} alt="question" />

                    <div className="row-count-details">
                      <h3>Minimum row count (empty or too small table)</h3>
                      <p>profile_row_count (Completeness)</p>
                    </div>
                    <img src={question} alt="question" />
                  </div>

                  <div>
                    <Autocomplete
                      value={value}
                      onChange={(event, newValue) => setValue(newValue)}
                      inputValue={inputValue}
                      onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
                      id="controllable-states-demo"
                      options={options}
                      sx={{ width: 200 }}
                      renderInput={(params) => <TextField {...params} label="Alert" />}
                    />
                  </div>
                  <Box sx={{ mt: 1 }}>
                    <Fade in={checked}>
                      <div className="run-check-data">Data.alert</div>
                    </Fade>
                  </Box>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
              <AccordionSummary
                aria-controls="panel2-content"
                id="panel2-header"
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid #e7e7e7',
                  padding: '0px 22px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                  <ExpandMoreIcon
                    sx={{
                      marginRight: '8px',
                      transition: 'transform 0.3s',
                      transform: expanded === 'panel6' ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                  <Typography style={{ fontWeight: 'bold' }}>Schema</Typography>
                </div>
                <div className="all-check-action2" style={{ display: 'flex', gap: '8px' }}>
                  <img src={delete2} alt="delete" />
                  <img src={video} alt="video" />
                </div>
              </AccordionSummary>
              <AccordionDetails style={{ padding: '15px 22px' }}>
                <Typography></Typography>
                <div className="run-all-action-details">
                  <div className="left-action-details">
                    <div className="form-controller">
                      <FormControlLabel
                        control={<Switch checked={checked} onChange={handleChange1} />}
                      />
                    </div>
                    <img src={enable} alt="enable" />
                    <img src={setting1} alt="settings" />
                    <img src={clock} alt="clock" />
                    <img src={runcheck} alt="run check" />
                    <img src={result} alt="result" />
                    <img src={question} alt="question" />

                    <div className="row-count-details">
                      <h3>Minimum row count (empty or too small table)</h3>
                      <p>profile_row_count (Completeness)</p>
                    </div>
                    <img src={question} alt="question" />
                  </div>

                  <div>
                    <Autocomplete
                      value={value}
                      onChange={(event, newValue) => setValue(newValue)}
                      inputValue={inputValue}
                      onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
                      id="controllable-states-demo"
                      options={options}
                      sx={{ width: 200 }}
                      renderInput={(params) => <TextField {...params} label="Alert" />}
                    />
                  </div>
                  <Box sx={{ mt: 1 }}>
                    <Fade in={checked}>
                      <div className="run-check-data">Data.alert</div>
                    </Fade>
                  </Box>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
              <AccordionSummary
                aria-controls="panel2-content"
                id="panel2-header"
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid #e7e7e7',
                  padding: '0px 22px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                  <ExpandMoreIcon
                    sx={{
                      marginRight: '8px',
                      transition: 'transform 0.3s',
                      transform: expanded === 'panel7' ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                  <Typography style={{ fontWeight: 'bold' }}>Uniqueness</Typography>
                </div>
                <div className="all-check-action2" style={{ display: 'flex', gap: '8px' }}>
                  <img src={delete2} alt="delete" />
                  <img src={video} alt="video" />
                </div>
              </AccordionSummary>
              <AccordionDetails style={{ padding: '15px 22px' }}>
                <Typography></Typography>
                <div className="run-all-action-details">
                  <div className="left-action-details">
                    <div className="form-controller">
                      <FormControlLabel
                        control={<Switch checked={checked} onChange={handleChange1} />}
                      />
                    </div>
                    <img src={enable} alt="enable" />
                    <img src={setting1} alt="settings" />
                    <img src={clock} alt="clock" />
                    <img src={runcheck} alt="run check" />
                    <img src={result} alt="result" />
                    <img src={question} alt="question" />

                    <div className="row-count-details">
                      <h3>Minimum row count (empty or too small table)</h3>
                      <p>profile_row_count (Completeness)</p>
                    </div>
                    <img src={question} alt="question" />
                  </div>

                  <div>
                    <Autocomplete
                      value={value}
                      onChange={(event, newValue) => setValue(newValue)}
                      inputValue={inputValue}
                      onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
                      id="controllable-states-demo"
                      options={options}
                      sx={{ width: 200 }}
                      renderInput={(params) => <TextField {...params} label="Alert" />}
                    />
                  </div>
                  <Box sx={{ mt: 1 }}>
                    <Fade in={checked}>
                      <div className="run-check-data">Data.alert</div>
                    </Fade>
                  </Box>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      )}
    </div>
  );
}

const data = [
  {
    dimensions: "Mixed",
    columnName: "area",
    detectedDataType: "Mixed data type",
    importedDataType: "CHARACTER VARYING",
    length: 225,
    scale: "",
    nullsPercent: "0.00%",
    distinctCount: "7"
  },
  {
    dimensions: "STRING",
    columnName: "company",
    detectedDataType: "STRING",
    importedDataType: "CHARACTER VARYING",
    length: 255,
    scale: "",
    nullsPercent: "0.00%",
    distinctCount: "4"
  },
];

export default ProfilingTable;
