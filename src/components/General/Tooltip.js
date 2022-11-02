import React from 'react';
import { CaretDownFilled } from '@ant-design/icons';


function Tooltip(props) {
    return(
           
        <div className='tip'>{ props.text }
            <div className='clear'></div>
            <CaretDownFilled className='tip-arrow'/>
        </div>
           
    )
}
export default Tooltip;