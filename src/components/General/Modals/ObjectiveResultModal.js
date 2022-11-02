import {Modal, ModalBody, ModalFooter,MDBModalHeader } from 'mdbreact';
import { CloseCircleTwoTone } from '@ant-design/icons';
import SubmitBtn from '../Buttons/SubmitBtn';
import CancelBtn from '../Buttons/CancelBtn';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
const uniqid = require('uniqid');

function ObjectiveResultModal(props) {
    
    return(
        <>
        <Modal isOpen={props.isOpen} className="cascading-modal" size="lg">
            <MDBModalHeader className='modal-head-gold'>
            {props.title}
                <CloseCircleTwoTone twoToneColor="#cca453" className="modal-close" onClick={ props.close }/>
            </MDBModalHeader>
            <div >
            <ModalBody className="grey-text"  style={{height:"500px",overflowY : "scroll"}} >
       
            <Paper key={ uniqid() }>
        <List key={ uniqid() }>
        {props.data.map((item, i) => (
      <ListItem key={ uniqid() } > 
        <ListItemText  primary={item.sc_title } secondary= {item.sc_code }  key={ uniqid() }   onClick={() => props.selectedScenario(item)}  /> 
        
        
           </ListItem>)
        )}
        </List>
      </Paper>
      
   

            </ModalBody>
            </div> 
            <ModalFooter>
            
                <CancelBtn title="Close" onClick={ props.close }/>
            </ModalFooter>

        </Modal>
        </>
    )
}
export default ObjectiveResultModal;
