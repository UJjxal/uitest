import { Input, Select } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import {
	MDBBtn,
	MDBCard, MDBCol,
	MDBIcon, MDBInput,
	MDBModal,
	MDBModalBody,
	MDBModalFooter, MDBRow,
	MDBTable, MDBTableBody,
	MDBTableHead
} from 'mdbreact';
import React, { useEffect, useState } from 'react';
import { CONTEXT } from "../../../../../config";

const { Option } = Select;
const InputGroup = Input.Group;
const inputGroup = {
	padding: "1px 5px",
	marginLeft: "13px",
	},
	inputLabel = {
	width: "40%",
	background: "rgb(32, 56, 100)",
	color: "#fff",
	fontWeight: "bold",
	textAlign: "center",
	height: "32px",
	padding: "4px 8px",
	margin: "0",
	},
	select = {
	width: "55%",
	},
	pdL50 = {
	paddingLeft: "13%", //"50px"
	},
	inputLabelWidth = {
	width: "50%",
	background: "rgb(32, 56, 100)",
	color: "#fff",
	fontWeight: "bold",
	textAlign: "center",
	height: "32px",
	padding: "4px 8px",
	margin: "0",
	},
	inputGroupR = {
	padding: "1px 5px",
	marginLeft: "17%",
	};
const ProviderDrugCreateNew = (props) => {
	
	const [reachData, setReachData] = useState(null);
	const ndc = props.ndc;
    useEffect(() => {
        DrugData();
	}, []);

    const tableValues = (row, index) =>{
		// console.log("Recvd row", row);
		let property = "";
		let valueArray = [];
		for (property in row){
			// console.log("row with prop", row[prop]);
			if(property.toUpperCase() === "ACTIVE"){
				valueArray.push(<MDBInput
						style={{ height: '1.2rem', width: '1.2rem' }}
						
						containerClass="mb-4"
					/>)
			}else{
			valueArray.push(row[property]);
			}
		}
		return valueArray;
	}
	const DrugData = async () => {
		const result = await axios(`${CONTEXT}/Clinical/RWE/IntDrugCreateNew.json`);
		setReachData(result.data);
	};

	const setCancel = () => {
		props.toggleDrug2();
	};

	return (
		<MDBModal isOpen={props.segment2} toggle={() => setCancel()} className="cascading-modal mt-5" size="fluid">
			<div className="modal-header primary-color white-text mb-0">
				<h4 className="title">
					<MDBIcon icon="dice-d6 fa-2x" /> Intervention Drugs
				</h4>
				<button type="button" className="close" onClick={() => setCancel()}>
					<span aria-hidden="true">??</span>
				</button>
			</div>
			<MDBModalBody className="pt-0">
				<MDBRow className="mt-1">
					<MDBCol className="p-0">
						<MDBCard className="text-center pt-1 pb-2 pr-2 border-0">
                    <MDBTable mdbTableScroll scrollY="true" className="border" border="1"> 
<MDBTableHead style={inputLabelWidth}>
<tr>
<th style={{ textAlign:'center',verticalAlign:'middle',lineHeight:'normal' }}>Drug Name</th>
<th style={{textAlign:'center',verticalAlign:'middle',lineHeight:'normal' }}>Condition</th>
<th style={{ textAlign:'center',verticalAlign:'middle',lineHeight:'normal' }}>Dose Value</th>
<th style={{ textAlign:'center',verticalAlign:'middle',lineHeight:'normal' }}>Dose Unit</th>
<th style={{ textAlign:'center',verticalAlign:'middle',lineHeight:'normal' }}>Frequency</th>
<th style={{ textAlign:'center',verticalAlign:'middle',lineHeight:'normal' }}>Cycle Duration(In Days)</th>
</tr>
</MDBTableHead>

                    <MDBTableBody>
                    {reachData?reachData.rows.map((row, index)=>{
					 						return(<tr >
												{tableValues(row, index).map(val=>(
                                                <td contentEditable='true'>{val}</td>                                                
                                                ))}
                                                
                                                </tr>)}
                    ):<div className="loader">Loading...</div>}
                    </MDBTableBody>
                    </MDBTable>
						</MDBCard>
						<a style={{
"text-decoration": "underline",
textAlign: 'end',
cursor: 'pointer',
color: 'blue',
marginLeft :'1130px'
}}>Add new row
</a>
					</MDBCol>
				</MDBRow>
				
				</MDBModalBody>
			<MDBModalFooter>
				<MDBBtn small color="primary" onClick={() => setCancel()}>
					OK
				</MDBBtn>
				
			</MDBModalFooter>
		</MDBModal>
	);
}
export default ProviderDrugCreateNew;
