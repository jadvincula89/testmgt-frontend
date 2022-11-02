import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import PageTitle from "../../General/PageTitle";
import ReviewRemarksModal from "../../General/Modals/ReviewRemarksModal";
import { SearchOutlined } from "@ant-design/icons";
import TrackerTable from "../../General/TestCaseTracker/sections/TrackerTable";
import { PostData } from "../../../utils/api/PostData";
import { GetData } from "../../../utils/api/GetData";
import BasicBtn from "../../General/Buttons/BasicBtn";
import { Form, Card, Col, Row, Container } from "react-bootstrap";
import Objectivetable from "../../General/TestCaseTracker/sections/Objectivetable";
import ObjectiveResultModal from '../../General/Modals/ObjectiveResultModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../TestCaseTracker/testCase.css';
import {
  ASSIGNED_STATUS,
  BLOCKED_STATUS,
  TS_STATUS_UNKNOWN,OBJECTIVE_COLS,
} from "../../../shared/constants";
const cookies = new Cookies();
const uniqid = require("uniqid");
 
var jsonObj=[];
toast.configure()
function TestObjectives() {
  const [data, setData] = useState([]);

  const notify = (msg) => toast.success(msg, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });

    const notify2 = () => toast.warning("Please select Scenario..", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });

  const [tempdata,setTempData]=useState([]);
  const [deldata,setDeletedData]=useState([]);
  const [scenario,setScenario]=useState({"sc_id":"","sc_title":"","sc_code":""});
  const [result,setDataResult]=useState([{"sc_id":"","sc_title":"","sc_code":""}]);
  const [selectedArea, setAreaValue] = useState("");
  const [selectedClass, setClass] = useState("");
  const [selectedGroup, setGroupValue] = useState("");
  const [selectedObjective, setObjectiveValue] = useState("");
  const [to_id,setObjectId]= useState("");
  const [objectivedata, setObjectives] = useState([]);
  const [objdata, setobjdata] = useState([]);
  const [objclass, setobjclass] = useState([]);
  const [areadata, setArea] = useState([]);
  const [groupdata, setGroup] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [active, setActive] = useState("");
  const [description,setDescription]= useState("");
  const [refresh,setRefresh]= useState("");
  const [status, setStatus] = useState("");
  const [remarks, setRemarks] = useState("");
  const [openModal, setModal] = useState(false);
  const [confirmChangeStatusMsg, setConfirmChangeStatusMsg] = useState("");

  const accessToken = cookies.get("accessToken");
   
  const search = () => {
    const payload = {
      keyword: keyword,
      session: accessToken,
      status: "objective",
    };
    PostData("search", payload, true).then((response) => {
      let responseJSON = response;
 
     setDataResult(responseJSON.result)
     setRefresh(' ');
 
     loadModal();
      
    });
  };
  const loadObjectives=(id)=>{
    const payload = {
      sc_id: id,
      session: accessToken,
    };
    PostData("sc_objective", payload, true).then((response) => {
      setTempData(response.result);
    });
  }
  const selectedScenario=(selectedsc)=>{
    setScenario(selectedsc);
    loadObjectives(selectedsc.sc_id);
    setKeyword(selectedsc.sc_code);
    setRefresh(' ');
  }
 
  const filterGroup = (keyword) => {
    const uniqueTags = [];
    objdata
      .filter((obj) => obj.to_area == keyword   && obj.to_objective_class === selectedClass)
      .map((item) => {
        var findItem = uniqueTags.find((x) => x.to_group === item.to_group);
        if (!findItem) uniqueTags.push(item);
      });
    
  setGroup(uniqueTags);
  
  };
  const filterObjectives = (keyword) => {
    const uniqueTags = [];
    objdata
      .filter((obj) => obj.to_group == keyword && obj.to_objective_class == selectedClass  && obj.to_area == selectedArea  )
      .map((item) => {
        uniqueTags.push(item);
      });

    setObjectives(uniqueTags);


    setObjectId('')
  };
  const changeObjectiveClass=(e)=>{
    const uniqueTags = [];

    objdata.filter((obj) => obj.to_objective_class == e).map((item) => {
      var findItem = uniqueTags.find((x) => x.to_area === item.to_area);
      if (!findItem) uniqueTags.push(item);
    });
    setObjectId('');
    setRefresh('');
    setClass(e);
    setGroupValue('');
    setAreaValue('');
    filterGroup('');
    setObjectives([]);
    setDescription('');
 
 
    setArea(uniqueTags);
  }
  const changeArea = (e) => {
    setAreaValue(e);
    filterGroup(e)
    setObjectives([]);
    setDescription('');
    setRefresh('')
    setObjectId('')
  };
  const changeGroup = (e) => {
    setGroupValue(e);
    setObjectives([]);
    setDescription('');
    setObjectId('')
    filterObjectives(e);
  };
  const changeObjectives = (e) => {
     setObjectId(e);
    objdata.filter((obj) => obj.to_id == e)
    .map((item) => {
      setObjectiveValue(item.to_objectives);
     setDescription(item.to_description)
     setRefresh('refresh');
    });

  };
  const postSave=()=>{
    setObjectId('');
    setRefresh('');
    

    setAreaValue('');
    filterGroup('');
    setObjectives([]);
    setDescription('');
    objectives();
    setObjectives([]);
    setDescription('');
    setObjectId('')
  }
 const saveData=()=>{
   if(scenario.sc_id!==""){
  const payload = {
    sc_id       : scenario.sc_id,
    objective_data : tempdata,
    remove_data: deldata,
};
 
  PostData('save-object', payload, true).then((result) => {
    postSave();
   setTempData([]);
   setDeletedData([]);
   loadObjectives(scenario.sc_id);
  })

  if(deldata.length==0){
    notify( "Objective(s) was added successfully"); 
  }
  if(deldata.length>0){
    notify( "Objective(s) was updated successfully"); 
  }

   }
   else
   notify2(); 
}
 const addData=()=>{
  if(scenario.sc_id!==""){
  var jsonObj =tempdata;

  var key=jsonObj.length;
 var item = {};
 var index= jsonObj.findIndex( (element) => element.to_id === to_id);
 if(index<0){
 item['area']=selectedArea;
 item['group']=selectedGroup;
 item['objective']=selectedObjective;
 item['description']=description;
 item['to_id']=to_id;
 item['key']=key;
 item['remarks']='';
 jsonObj.push(item);


  setTempData(jsonObj);


  setObjectId('');
 }
}
else
notify2(); 


 }
  const objectives = () => {
    GetData("objectives", true).then((result) => {
      let responseJSON = result.data;
    

      setobjdata(responseJSON.result);
    //  filterArea(responseJSON.result);
var data=responseJSON.result;
      const uniqueTags = [];
      data.map((item) => {
        var findItem = uniqueTags.find((x) => x.to_objective_class === item.to_objective_class );
        
        if (!findItem) uniqueTags.push(item);
       
      });
  
      setobjclass(uniqueTags);
      
      /**
       * After Post event here after saving, add error handling / success modal
       */
    });
  };

  const keyPress = (e) => {
    if (e.keyCode == 13) {
       search();
    }
  };
  
  useEffect(() => {
    objectives();
    setTimeout(() => {
      setData(tempdata);
    }, 2000);
  }, [tempdata]);
 const getIndex=(to_id)=>{
  var jsonarray =tempdata;
  return jsonarray.findIndex(obj => obj.to_id === to_id);

 }
const  removeObjectData = (i)=>{


  var jsonarray =tempdata;
   var delarray=deldata;

  let deletedobject=jsonarray.splice(i,1)

  if(deletedobject[0].tso_id!==undefined){
  delarray.push({"tso_id":deletedobject[0].tso_id});
  }

  setTimeout(() => {
    setDeletedData(delarray);
  setTempData(jsonarray)
  filterObjectives(0)
  setRefresh(' ')
}, 1000);

 
}
  const changeRemarksValue = (e) => {
    
     jsonObj =tempdata;
     jsonObj[e.target.id]['remarks'] = e.target.value;
     setTempData(jsonObj);
  };
 

  const setActiveRow = (e) => {
    var key =
      e.target.attributes.getNamedItem("data-id") !== null
        ? e.target.attributes.getNamedItem("data-id").value
        : "";
    setActive(key);
  };
  const rowBg = (key) => {
    return (key % 2 == 0) ? 'dark' : 'light';
}
  const searchKeyword = (e) => {
    setKeyword(e.target.value);
  };
  const loadModal = () => {
    setRefresh('')
    setModal(true);
   
  };
  const closeConfirm = () => {
   
    setModal(false)
}
   
  return (
    <Container fluid>
   
            <ObjectiveResultModal 
                title = {"("+result.length+") match results found" } 
                text = { "" } 
                data={result} 
                close = { closeConfirm }
                isOpen = {  openModal}
                selectedScenario={selectedScenario}
            />
      <Row className="top-30 separator-border">
        <Col xs={12} md={12}>
 
          <div className="col-lg-12 col-sm-12 top-10 mb-10 ">
 
            <PageTitle title="Test Objectives" />
          </div>
        </Col>
      </Row>
      <div className="col-md-12">
        <Row className="top-30">
          <Col md={12}>
            <Card border="secondary" text="dark">
              <Card.Body>
                <Card.Title></Card.Title>

                <div className=" col-lg-3 left">
                  <Form.Group
                    className="mb-3 relative"
                    controlId="formGroupName"
                  >
                    <Form.Label>
                      <b>Scenario</b>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      onChange={searchKeyword}
                      value={ keyword } 
                      placeholder="Search by Scenario Title or Scenario ID"
                      onKeyDown={keyPress}
                    />
                  </Form.Group>
                </div>

                <div className=" col-lg-2 left mt-3">
                  <BasicBtn title="Search"  onClick={() =>search()} />
                </div>
                <div></div>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} className="top-30">
            <Card border="secondary" text="dark">
              <Card.Body>
                <div className="left">
                  <div>
                    <b>Scenario ID: </b>{scenario.sc_code}
                  </div>
                </div>
                <div className="clear"></div>
                <div className="clear"></div>

                <div className="left">
                  <div>
                    <b>Scenario Title: </b>{scenario.sc_title}
                  </div>
                </div>
                <div className="clear"></div>
                <div className="col-sm-1 left mt-2">
                  <div>
                    <b>Objective Class: </b>{" "}{" "}
                   
                
                
                  </div>
              
                </div>
                <div className="col-sm-2 left  m-1 mt-1">
                  <div>
                  <Form.Group className="mb-1 relative">
                    <Form.Select
                      name="class"
                      value={selectedClass}
                      onChange={(e) => changeObjectiveClass(e.target.value)}
                    >
                      <option  >--Select Class--</option>
                      {objclass.map((item, i) => (
                        <option value={item.to_objective_class} key={uniqid()}>
                          {item.to_objective_class}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                
                  </div>
           
                </div>
                <div className="clear"></div>
                <div className="clear"></div>

                <div className="col-sm-1 left mt-2 ">
                  <b>Test Objectives:</b>{" "}
                </div>
                <div className="col-lg-1 left  m-1 mt-2">
                  <Form.Group className="mb-2 relative">
                    <Form.Select
                      name="area"
                      value={selectedArea}
                      onChange={(e) => changeArea(e.target.value)}
                    >
                      <option >--Select Area--</option>
                      {areadata.map((item, i) => (
                        <option value={item.to_area} key={uniqid()}>
                          {item.to_area}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>
                <div className="col-lg-2 left  m-1 mt-2">
                  <Form.Group className="mb-2 relative">
                    <Form.Select
                      value={selectedGroup}
                      onChange={(e) => changeGroup(e.target.value)}
                    >
                      <option>--Select Group--</option>

                      {groupdata.map((item, i) => (
                        <option value={item.to_group} key={uniqid()}>
                          {item.to_group}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>
                <div className="col-lg-2 left m-1 mt-2 ">
                  <Form.Group className="mb-2 relative">
                    <Form.Select
                      value={to_id}
                      onChange={(e) => changeObjectives(e.target.value)}
                    >
                      <option>--Select Objectives--</option>
                      {objectivedata.map((item, i) => (
                        <option value={item.to_id} key={uniqid()}>
                          {item.to_objectives}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>
                <div className=" col-lg-5 left  m-1 mt-2">
                  <Form.Group controlId="formGroupName">
                    <Form.Control type="text" readOnly placeholder="Description" defaultValue={description} />
                  </Form.Group>
                </div>
                <div className="left">
                <BasicBtn title="Add" onClick={() => ( to_id ==='') ? '' : addData()} additionalStyle={ ( to_id ==='') ? "bg-light-gray disabledClick  m-2" :" m-2" } /> 
     
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={12} className='top-30'>
          <Card border="primary" text="dark">
              <Card.Body>
    <Objectivetable 
  data={ data } 
  deldata={deldata}
  remove={removeObjectData}
  changeRemarksValue={changeRemarksValue}
  savedata={saveData}
           />
        </Card.Body>
            </Card>
    </Col>
  
        </Row>
      </div>
    </Container>
  );
}
export default TestObjectives;
