import React from 'react';
const uniqid = require('uniqid');
function FormulaTable(props){


    return(
        <div className='col-md-5'>
            <table border='1' className='mb-3'>
                <tbody>
                    <tr key={ uniqid() }>
                        <td key={ uniqid() } style={{width:'68%'}}>Planned Scenarios [Cycle 2]</td>
                        <td className='dark' key={ uniqid() } style={{width:'68%'}}>{ props.scTarget }</td>
                    </tr>
                    <tr key={ uniqid() }>
                        <td key={ uniqid() }>Planned Transactions/Test Case</td>
                        <td className='light' key={ uniqid() }>{ props.tcTarget }</td>
                    </tr>
                </tbody>
            </table>

            <table border='1' className='mb-5'>
                <tbody>
                    <tr key={ uniqid() }>
                        <td className='light' key={ uniqid() }><b>Estimated Progress Figures [Run#1]</b></td>
                        <td className='light text-right' key={ uniqid() }></td>
                    </tr>
                    <tr key={ uniqid() }>
                        <td className='dark'key={ uniqid() } style={{width:'68%'}}>60% Planned for Run #1</td>
                        <td className='dark text-right' key={ uniqid() }>{ props.tcTarget * 0.6 }</td>
                    </tr>
                    <tr key={ uniqid() }>
                        <td className='light' key={ uniqid() }>Execution % for Expected Run#1 TC</td>
                        <td className='light text-right' key={ uniqid() }>{ Math.ceil( (props.total / (props.tcTarget * 0.6)) *100 ) }%</td>
                    </tr>
                    <tr key={ uniqid() }>
                        <td className='dark' key={ uniqid() }>Pass % for Expected Run#1 TC</td>
                        <td className='dark text-right' key={ uniqid() }>{ Math.ceil( ( props.passed / ( props.tcTarget * 0.6) ) *100)}%</td>
                    </tr>
                    <tr key={ uniqid() }>
                        <td className='light' key={ uniqid() }>Pass % for Executed TC in Run#1</td>
                        <td className='light text-right' key={ uniqid() }>{ Math.ceil((props.passed / props.total) *100) }%</td>
                    </tr>
                    <tr key={ uniqid() }>
                        <td className='dark' key={ uniqid() }>&nbsp;</td>
                        <td className='dark text-right' key={ uniqid() }>&nbsp;</td>
                    </tr>
                    <tr key={ uniqid() }>
                        <td className='light' key={ uniqid() }><b>Totals [Cycle 2]</b></td>
                        <td className='light text-right' key={ uniqid() }></td>
                    </tr>
                    <tr key={ uniqid() }>
                        <td className='dark' key={ uniqid() }>Pass Rate Total</td>
                        <td className='dark text-right' key={ uniqid() }>{ (props.passed / props.tcTarget).toFixed(2)*100 }%</td>
                    </tr>
                    <tr key={ uniqid() }>
                        <td className='light' key={ uniqid() }>Execution % for Run#1</td>
                        <td className='light text-right' key={ uniqid() }>{ Math.ceil( (props.total / props.tcTarget) *100) }%</td>
                    </tr>
                </tbody>
                
            </table>
        </div>
    )
}

export default FormulaTable