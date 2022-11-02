import React from 'react';
import Checkbox from '../../General/Checkbox';
function ScDetails (props){
   
    return(
        <div className='mt-3'>
            <div  className='mt-1'>
                <b>High Level Scenario :</b> { props.data.hs_title }
            </div>
            <div  className='mt-1 left col-md-6'>
                <b>Scenario ID :</b> { props.data.sc_code }
            </div>
            <div  className='mt-1 left col-md-6'>
                <b>Scenario Status :</b> { props.data.Scenario_status }
            </div>
            <div className='clear'></div>
            <div  className='mt-1 left col-md-6'>
                <b>Scenario Title :</b> { props.data.sc_title }
            </div>
            <div  className='mt-1 left col-md-6'>
                <b>Scenario Test Data :</b> { props.data.Dataset_ID }
            </div>
            <div className='clear'></div>

            <div  className='mt-5 left col-md-12'>
                <b className='left'>Parallel :</b> 
                <span className='left'><Checkbox isCheck={props.parallel} isSelected={props.parallel} changeValue={ props.checkParallel } /></span>
                <div className='clear'></div>
            </div>

        </div>

    )

}

export default ScDetails