
import React from 'react';
const uniqid = require('uniqid');
function ObjectivesPercentageReport(props) {
    
    const rowBg = (key) => {
        return (key % 2 == 0) ? 'light' : 'light';
    }
    
    const renderRows = (data) => {
        let content = []
        data.map((row,apKey) => {
            content.push(
                <tr>
                    <td className={ rowBg(apKey)+' text-centered' }>{ row['Area'] }</td>
                    <td className={ rowBg(apKey)+' text-centered' }>{ row['Area_Percentage'] }</td>
                    <td className={ rowBg(apKey)+' text-centered' }>{ row['Group'] }</td>
                    <td className={ rowBg(apKey)+' text-centered' }>{ row['Group_Percentage'] }</td>
                    <td className={ rowBg(apKey)+' text-centered' }>{ row['Objectives'] }</td>
                    <td className={ rowBg(apKey)+' text-centered' }>{ row['OBJ_class'] }</td>
                    <td className={ rowBg(apKey)+' text-centered' }>{ row['Scenario'] }</td>
                    <td className={ rowBg(apKey)+' text-centered' }>{ row['Scenario Status'] }</td>
                    
                </tr>
            )
        })
        return content
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