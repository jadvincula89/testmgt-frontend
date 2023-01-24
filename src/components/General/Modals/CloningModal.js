import {Modal, ModalBody, ModalFooter,MDBModalHeader } from 'mdbreact';
import { CloseCircleTwoTone } from '@ant-design/icons';
import SubmitBtn from '../Buttons/SubmitBtn';
import CancelBtn from '../Buttons/CancelBtn';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
// import { COMPLETED_STATUS, FAILED_STATUS, REJECT_STATUS, BLOCKED_STATUS, DEFECT_STATUS } from '../../../shared/constants';

function CloningModal(props) {

    return(
        <Modal isOpen={props.isOpen} className="cascading-modal" size="lg">
            <MDBModalHeader className='modal-head-succ'>
            Clone Dynamic Data
                <CloseCircleTwoTone twoToneColor="#cca453" className="modal-close" onClick={ props.close }/>
            </MDBModalHeader>
            <ModalBody className="grey-text" >
               
                <div className='top-15'><b>Enter Scenario: </b></div>
                <div className='small-text text-color-red'>{ props.errReason }</div>
                <Autocomplete
     autoComplete= {false}
      disablePortal
      id="combo-box-demo" 
      options={props.optionsdata}
      isOptionEqualToValue={(option, value) => option.sc_id === value.sc_id}
      onChange={(event, value) => props.changeSCID(value.sc_id)}
      getOptionLabel={(option) => option.label}
      sx={{ width: 'auto' }}
      renderInput={(params) => <TextField {...params} label="Scenario" />}
    />


            </ModalBody>
            <ModalFooter>
                <SubmitBtn title="Save" onClick={ props.save } />
                <CancelBtn title="Cancel" onClick={ props.close }/>
            </ModalFooter>

        </Modal>
    )
}
export default CloningModal;
