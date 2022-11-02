
import React, { useState,useEffect } from 'react';
import { Card, Col, Container } from "react-bootstrap";
import {Excel} from '../../../shared/Excel';
import { PostData } from '../../../utils/api/PostData';
import Table from './table2';
import BasicBtn from '../../General/Buttons/BasicBtn';
import { FadeLoader } from 'react-spinners';
const uniqid = require('uniqid');

// import SampleTbl from './sample'; 
function ObjectivesPercentageReport() {
    const [ data,setData ] = useState([]);
    const [ selectedAreaDropdown,setSelectedAreaDropdown ] = useState('');
    const [ selectedGrpDropdown,setSelectedGrpDropdown ] = useState('');
    const [ selectedObjDropdown,setSelectedObjDropdown ] = useState('');
    const [ selectedObjClassDropdown,setSelectedObjClassDropdown ] = useState('');
    const [ selectedStatus,setSetSelectedStatus ] = useState('');
    
    const [ areaDropdown,setAreaDropdown ] = useState([]);
    const [ grpDropdown,setGrpDropdown ] = useState([]);
    const [ objDropdown,setObjDropdown ] = useState([]);
    const [ objClassDropdown,setObjClassDropdown ] = useState([]);
    const [ rawData,setrawData ] = useState([]);
    const [ errMsg,setErrMsg ] = useState([]);
    const [ loading, setLoading]=useState(false);
    useEffect(() => {
       search(true);
    }, []);
    const search = (isInitialCall)=> {
        setLoading(true)
        let payload = {
            'area': selectedAreaDropdown,
            'group':selectedGrpDropdown,
            'objective':selectedObjDropdown,
            'obj_class' : selectedObjClassDropdown,
            'status' : selectedStatus
        }
        PostData('obj-percentage-report', payload, true).then((result) => {
            let responseJSON = result.result;
            if(isInitialCall) { setrawData(responseJSON['raw'])};
            if(selectedObjClassDropdown !== ''){ filterClass(responseJSON['raw']) }else{ setData(responseJSON['raw']) }
            
            if(isInitialCall) { setDropdowns(responseJSON['raw']) };
            
            // if(!isInitialCall && selectedGrpDropdown == '') { setGrpdselect(responseJSON['raw']) };
            // if(!isInitialCall && selectedGrpDropdown != '') { setObjdselect(responseJSON['raw']) };
            setLoading(false)
        });
    }

    const filterClass = (data) =>{
        let content = [];

        data.map((value , key)=>{
            if(value['OBJ_class'] === selectedObjClassDropdown){
                content.push(value)
            }
        })
        setData(content)
    }

    const setObjdselect = (data) => {
        let obj = [];
        data.map((values, key)=>{
            if(!obj.includes(values['Objectives']))
            obj.push(values['Objectives'])
            
        })
        setObjDropdown(obj);
    }
    const setGrpdselect = (data) => {
        let grp = [];
       

        data.map((values, key)=>{
            if(!grp.includes(values['Group']))
            grp.push(values['Group'])
            
        })

        

        setGrpDropdown(grp);
        
    }

    const setDropdowns = (data) => {
        /**Set Area */

        let areas = [];
        let objclass = [];

        data.map((values, key)=>{
            if(!areas.includes(values['Area']))
                areas.push(values['Area'])

            if(!objclass.includes(values['OBJ_class']))
            objclass.push(values['OBJ_class'])
            
        })

        setAreaDropdown(areas)
        setObjClassDropdown(objclass)
    }

    const area= (area) => {
        let content=[]

        area.map((opt) =>{ content.push(<option key={ uniqid() } value={opt}>{opt}</option>)}) 

        return content
    }
    const group= (group) => {
        let content=[]

        group.map((opt) =>{ content.push(<option key={ uniqid() } value={opt}>{opt}</option>)}) 

        return content
    }
    const obj= (data) => {
        let content=[]

        data.map((opt) =>{ content.push(<option key={ uniqid() } value={opt}>{opt}</option>)}) 

        return content
    }
    const selectArea = (e) => {
        let keyword = e.target.value

        const uniqueTags = [];
        rawData
            .filter((obj) => obj.Area == keyword)
            .map((item) => {
                if(!uniqueTags.includes(item.Group)){
                    uniqueTags.push(item.Group);
                }
            
        });
        setSelectedAreaDropdown(keyword)
        setGrpDropdown(uniqueTags)
        setSelectedObjDropdown('')
        setSetSelectedStatus('')
        setSelectedObjClassDropdown('')
        setSelectedGrpDropdown('')
    }
    
    const selectGrp = (e)=>{
        let keyword = e.target.value
        
        const uniqueTags = [];
        rawData
            .filter((obj) => obj.Area == selectedAreaDropdown && obj.Group == keyword)
            .map((item) => {
                if(!uniqueTags.includes(item.Objectives)){
                    uniqueTags.push(item.Objectives);
                }
            
        });
        
        setObjDropdown(uniqueTags)
        setSelectedGrpDropdown(keyword)
        setSelectedObjDropdown('')
    }
    const selectObject = (e)=>{
        let keyword = e.target.value
        setSelectedObjDropdown(keyword)
    }
    const selectObjectClass = (e)=>{
        let keyword = e.target.value
        setSelectedObjClassDropdown(keyword)
    }
    const filterData = ()=>{
        // (selectedAreaDropdown === '') ?  setErrMsg('Please select Area from the dropdown') : setErrMsg('')
        search(false);
    }
    const filterexport = (data) =>{
        let content = [];

        data.map((value , key)=>{
            if(value['OBJ_class'] === selectedObjClassDropdown){
                content.push(value)
            }
        })
        return content
    }
    const ExportToExcel =async ()=> {
        setLoading(true)
        let payload = {
            'area': selectedAreaDropdown,
            'group':selectedGrpDropdown,
            'objective':selectedObjDropdown,
            'obj_class' : selectedObjClassDropdown,
            'status' : selectedStatus
        }
         var datas=await PostData('obj-percentage-report', payload, true).then((response) => {
        
         var date=new Date().getTime();
        
            var fileName = '';  
           
            fileName = 'Objectives_Percentage_Report_'+date; 
            
            var res = (selectedObjClassDropdown !== '') ? filterexport(response.result['raw']) : response.result['raw'] ;

            Excel(res,fileName);
            setLoading(false)
        })   
    }
    const selectStatus = (e) => {
        setSetSelectedStatus(e.target.value)
    }
    // console.log(rawData)
    return (
        <Container fluid>
            <span className="spinner-holder absolute" style={{position:'fixed',zIndex:'999'}}>
                <FadeLoader
                    style={{display: 'block', margin: '0 auto', borderColor: 'red'}}
                    sizeUnit={"px"}
                    size={10}
                    color={'#ca5d41'}
                    loading={loading}
                />
            </span>
            <Card border="secondary" text="dark">
              <Card.Body>
                <div className='error-msg'>{ errMsg }</div>
                <div className='left' style={{marginRight:'15px', lineHeight: '40px'}}>Filter: </div>
                <div className='col-2 left' style={{marginRight:'15px'}}>
                    <select className='form-control' onChange={selectArea} value={selectedAreaDropdown}>
                        <option value='' key={ uniqid() }>Area</option>
                        {area(areaDropdown)}
                    </select>
                </div>
                {/* <div className='col-2 left' style={{marginRight:'15px'}}>
                    <select className='form-control' onChange={selectGrp} value={selectedGrpDropdown}>
                        <option value='' key={ uniqid() }>Groups</option>
                        {group(grpDropdown)}
                    </select>
                </div> */}
                {/* <div className='col-3 left' style={{marginRight:'15px'}}>
                    <select className='form-control' onChange={selectObject} value={selectedObjDropdown}>
                        <option value='' key={ uniqid() }>Objectives</option>
                        {obj(objDropdown)}
                    </select>
                </div> */}

                <div className='col-2 left' style={{marginRight:'15px'}}>
                    <select className='form-control' onChange={selectObjectClass} value={selectedObjClassDropdown}>
                        <option value='' key={ uniqid() }>Objective Class</option>
                        {obj(objClassDropdown)}
                    </select>
                </div>

                <div className='col-2 left' style={{marginRight:'15px'}}>
                    <select className='form-control' onChange={selectStatus} value={selectedStatus}>
                        <option value='' key={ uniqid() }>Status</option>
                        <option value='1' key={ uniqid() }>Active</option>
                        
                    </select>
                </div>


                <button className=' bg-blue text-color-white left' onClick={ filterData }>Filter Data</button>
                <button className=' bg-blue text-color-white right' onClick={() =>ExportToExcel()}>Export to Excel</button>
               


              </Card.Body>

            </Card>
            <Col md={12} className='top-30'>
                {
                    (data.length >= 1) ?
                    <Table
                        data={ data }
                       
                    /> : ''
                }
                {/* {
                    (data.length >= 1) ?
                        <Table
                            data={ data }
                           
                        /> : ''
                    
                        
                } */}
                {/* {
                    <SampleTbl/>
                } */}

            </Col>
        </Container>
    );
}

export default ObjectivesPercentageReport;