
import React from 'react';
const uniqid = require('uniqid');
function ObjectivesPercentageReport(props) {
    const renderObjectives = (values)=>{
        let content = []
        values.map((values,v) => {
                content.push(
                    <>
                        <tr  key={ uniqid() }>
                            <td className={ rowBg(v) } key={ uniqid() } >{ values['Objectives'] }</td>
                            <td className={ rowBg(v) } key={ uniqid() } >{ values['OBJ_class'] }</td>
                            <td className={ rowBg(v) } key={ uniqid() } >{ values['Scenario'] }</td>
                            <td className={ rowBg(v) } key={ uniqid() } >{ values['Scenario Status'] }</td>
                        
                        </tr>
                    </>
                )
            })

        return content
    }

    const renderGroups = (groups)=>{
        let content = []
            groups.map((group, grp) => {
            // if(grp !== 0){
                
                content.push(
                    <>
                    <tr  key={ uniqid() }>
                        <td className={ rowBg(grp) } key={ uniqid() } rowSpan={ group['groups_precentage'][0]['values'].length + 1}>{ group['group'] }</td>
                        
                        <td className={ rowBg(grp)+' text-centered' } key={ uniqid() } rowSpan={ group['groups_precentage'][0]['values'].length + 1 }>{ group['groups_precentage'][0]['percentage'] }</td>
                    
                    </tr>
                    { renderObjectives(group['groups_precentage'][0]['values']) }
                    </>
                )
            // }
            
            })

        return content
    }
    const renderAreaPercentage = (ap, count)=>{
        let content = []
            ap.map((areaPerc, apKey) => {
                // if(apKey !== 0){
                    content.push(
                        <>
                            <tr  key={ uniqid() }>
                                
                                <td className={ rowBg(apKey)+' text-centered' } key={ uniqid() } rowSpan={ count+5 }>{ areaPerc['percentage'] }</td> 
                                
                                
                            </tr>
                            { renderGroups(areaPerc['groups'], areaPerc['percentage']) }
                            {/* { renderGrouppercentage(areaPerc['percentage'], areaPerc['groups'].length) } */}
                        </>
                    )
                // }
            })

        return content
    }
    const renderRows  =(areas) =>{
        let content = []

        areas.map((area, key) => {
            content.push(
                <>
                <tr  key={ uniqid() }>
                    <td className={ rowBg(key) } key={ uniqid() } rowSpan={ (key === 0) ? area['count'] +5 : area['count'] }>{ area['area'] }</td>                    
                        {/* <td className={ rowBg(key) } key={ uniqid() } rowSpan={ area['area_percentage'][0]['groups'].length +1 }>{ area['area_percentage'][0]['percentage'] }</td> */}
                </tr>
                {
                    renderAreaPercentage(area['area_percentage'], area['count'])
                }
                </>
            )
        })

        return content
    }
    const rowBg = (key) => {
        return (key % 2 == 0) ? 'light' : 'light';
    }
    
    return (
        <table border="1">
            <thead>
                <tr>
                    <th>Area</th>
                    <th>Area Percentage</th>
                    <th>Group</th>
                    <th>Group Percentage</th>
                    <th>Objectives</th>
                    <th>Objective Class</th>
                    <th>Scenario</th>
                    <th>Scenario Status</th>
                </tr>
            </thead>
            <tbody>
                { renderRows(props.data) }
            </tbody>
        </table>
    );
}

export default ObjectivesPercentageReport;