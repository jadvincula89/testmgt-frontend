import React, { useState, useEffect } from 'react';
import Checkbox from '../../Checkbox';

function Runtest(props) {
    
    return (
        <div className='col-12 centered bg-light-gray runtest-container' >
            <div><Checkbox value="First Run" status={ (props.run_tests === 0 || props.run_tests === "0") ? 1 : 0 } name="first_run" /></div>
            <div><Checkbox value="Resume" status={ (props.run_tests === 1 || props.run_tests === "1")  ? 1 : 0 } name="resume" /></div>
            <div><Checkbox value="Restart" status={ (props.run_tests === 2 || props.run_tests === "2") ? 1 : 0 } name="restart"/></div>
            <div><Checkbox value="Retest" status={ (props.run_tests === 3 || props.run_tests === "3")  ? 1 : 0 } name="retest" /></div>
        </div>
    )
}
export default Runtest;
