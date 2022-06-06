import React from "react";
import { MDBCol } from "mdbreact";
import { FormControl, InputLabel, Select, MenuItem, TextField } from "@material-ui/core";

const KPIAnalysisDriverSettings = (props) => (
  <>
    <MDBCol className="d-flex flex-column justify-content-between">
      {console.log("DRIVER PROPS", props)}
      <div>
        <h6 className="mb-0 font-weight-bold">Choose Connection</h6>   
            <div id="metrics-section">
              <div>
                <FormControl variant="outlined" style={{marginLeft:"0px"}} className={props.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Available Connections
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={props.selectedConnection}
                    onChange={(e) => props.handleSelectedConnectionChange(e.target.value)}
                    label="Available Connections"
                  >
                    {props.availableConnectionsList.map((avlConnection, i) => (
                      <MenuItem key={i} value={avlConnection}>
                        {avlConnection}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
      </div>

      <div>
        <h6 className="mb-0 font-weight-bold">Choose Group</h6>   
            <div id="metrics-section">
              <div>
                <FormControl variant="outlined" style={{marginLeft:"0px"}} className={props.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Available Groups
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={props.selectedGroup}
                    onChange={(e) => props.handleSelectedGroupChange(e.target.value)}
                    label="Available Groups"
                  >
                    {props.availableGroupsList.map((avlGroup, i) => (
                      <MenuItem key={i} value={avlGroup}>
                        {avlGroup}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
      </div>

      <div>
        <h6 className="mb-0 font-weight-bold">Choose Template</h6>   
            <div id="metrics-section">
              <div>
                <FormControl variant="outlined" style={{marginLeft:"0px"}} className={props.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Available Templates
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={props.selectedTemplate}
                    onChange={(e) => props.handleSelectedTemplateChange(e.target.value)}
                    label="Available Templates"
                  >
                    {props.availableTemplatesList.map((avlTemplate, i) => (
                      <MenuItem key={i} value={avlTemplate}>
                        {avlTemplate}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
      </div>
      
    </MDBCol>
    <MDBCol className="d-flex flex-column justify-content-around align-items-center">
    <div>
        <h6 className="mb-0 font-weight-bold">Global Query</h6>
        <TextField
          id="outlined-multiline-static"
          className={props.control}
          label="Insert Global Query"
          multiline
          rows={4}
          variant="outlined"
          autoComplete="off"
          value={props.globalQuery}
          onChange={e=>props.setGlobalQuery(e.target.value)}
        />
      </div> 
	  <div>
        <h6 className="mb-0 font-weight-bold">Incremental Query</h6>
		<TextField
          id="outlined-multiline-static"
          className={props.control}
          label="Insert Incremental Query"
          multiline
          rows={4}
          variant="outlined"
          autoComplete="off"
          value={props.incrementalQuery}
          onChange={e=>props.setIncrementalQuery(e.target.value)}
        />			
      </div>					
     
    </MDBCol>
  </>
);
export default KPIAnalysisDriverSettings;
