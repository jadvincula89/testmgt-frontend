import {Modal, ModalBody, ModalFooter,MDBModalHeader } from 'mdbreact';
import { CloseCircleTwoTone } from '@ant-design/icons';
import SubmitBtn from '../Buttons/SubmitBtn';
import CancelBtn from '../Buttons/CancelBtn';
const uniqid = require('uniqid');
function TestDataModal(props) {
    const columns = props.sc_test_data['columns'];
    const data = props.sc_test_data['data'];

    const tableData = (columns)=>{
        
        return (
            <table border="1">
            <thead>
                <tr key={ uniqid() }>
                    { cols(columns) }
                </tr>
            </thead>
            <tbody>
                { rows(data) }
            </tbody>
        </table>
        );

    }
    const rowBg = (key) => {
        return (key % 2 == 0) ? 'dark' : 'light';
    }

    const rows = (data) => {
        let content = [];
    //    console.log(data)
        
        data.map((i,key)=>{
           
                content.push(
                    <tr key={ uniqid()}>
                       { rowsTd(i, key) }
                    </tr>
                )
            
        })

        return content;

    }
    const rowsTd = (i, key) =>{
        let content = [];
        columns.map((c,k) => {
            content.push( rowData(i, c, key) )
        })
        return content;
    }
    const pushColumn = (col,key,data) =>{
        return ( col === key ) ? console.log(col) : '';
    }
    const rowData = (data,col, k) => {
        let content = [];
        if(data[col] !== undefined){
            content.push(<td className={ rowBg(k) } key={uniqid()}>{data[col]}</td>)
        }
        // Object.keys(data).forEach(function(key) {
        //    content.push( pushColumn(col,key,data) )
            
        // });
       
        return content;
    }
    const cols = (columns)=>{
        var content = [];

        // Object.keys(columns).forEach(function(key) {
        //     content.push(<th key={uniqid()}>{key}</th>);
        // });
        columns.map((col)=>{
            content.push(<th key={uniqid()}>{col}</th>)
        })

        return content;
    }
   
    return(
        <Modal isOpen={props.isOpen} className="cascading-modal" size="xl">
            <MDBModalHeader className='modal-head-blue'>
                Test Data
                <CloseCircleTwoTone twoToneColor="#4863cf" className="modal-close" onClick={ props.close }/>
            </MDBModalHeader>
            <ModalBody className="grey-text" >
                Please Select (1) Test Data for this scenario.
                <div className='col-md-12 margin-center scroll'>
                { tableData( columns ) }  
                {/* { cardData( data )}   */}
                </div>
            </ModalBody>
            <ModalFooter>
                <SubmitBtn title="Save" onClick={ props.save } name="save"/>
                <CancelBtn title="Cancel" onClick={ props.close }/>
            </ModalFooter>

        </Modal>
    )
}
export default TestDataModal;
