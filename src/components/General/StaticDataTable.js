import React from 'react';
const uniqid = require('uniqid');
function StaticDataTable( props ) {
    const cardContent = (data,k) => {
        let content = [];

        Object.keys(data).forEach(function(k) {
            // content.push(<td key={uniqid()}><b>{ ( k !== 'td_id' && data[k] !== "" ) ? k+': ' : "" }</b>{ ( k !== 'td_id' && data[k] !== "" ) ? data[k] : "" }</td>)
            if( 
                k !== 'td_id' && data[k] !== "" && data[k] !== null &&
                k !== 'td_srcrow' &&
                k !== 'td_status' && 
                k !== 'td_spr_scenario'
            ){
                content.push(
                    // console.log(data[k])
                    <tr key={uniqid()}>
                        <td className='dark' key={uniqid()}>{ data['Scenario ID'] }</td>
                        <td className='dark' key={uniqid()}>{ k }</td>
                        <td className='dark' key={uniqid()}><pre>{ data[k] }</pre></td>
                    </tr>
                )
            }
            
        })

        return content;
    }

    const cardData = (data) =>{
        let content = [];
        data.map((i,key)=>{
            content.push(
                cardContent(data)
            )
        });
        return content;
    }

    const cardDataTbl = (data) => {
        return(
            <table className='sub-tbl' border="1">
                <thead>
                    <tr>
                        <th key={ uniqid() }>TS-Ref</th>
                        <th key={ uniqid() }>Attribute</th>
                        <th key={ uniqid() }>Attribute Value</th>
                    </tr>
                </thead>
                <tbody>
                    { cardContent(data[0]) }
                </tbody>
            </table>
        )
    }
    return(
        <table className='sub-tbl' border="1">
            <thead>
                <tr>
                    <th key={ uniqid() }>TS-Ref</th>
                    <th key={ uniqid() }>Attribute</th>
                    <th key={ uniqid() }>Attribute Value</th>
                </tr>
            </thead>
            <tbody>
                { cardContent(props.data) }
            </tbody>
        </table>
    )

}
export default StaticDataTable