import React from 'react';
import { Link } from 'react-router-dom';
import StopTestButton from './StopTestButton';
import ClearCache from './ClearCache';

const PageTitle = (props) => { 
    
    return (
        <div className="crud page-title ">
            <div className='left col-8'><h3><Link to={props.link || '/#'} className='text-color-white'>{ props.title }</Link></h3></div>
            <div className='right col-4'>
            <StopTestButton />
            <ClearCache />
            </div>
        </div>
    )
};

export default PageTitle;