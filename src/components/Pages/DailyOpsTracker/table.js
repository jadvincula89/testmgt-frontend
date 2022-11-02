import React, { useState } from 'react';

const uniqid = require("uniqid");


function DailyOpsTbl(props) {
    const cols = props.data['cols']
    const rows = props.data['rows']
    const rowBg = (key) => {
        return key % 2 == 0 ? "dark" : "light";
      };

    const renderCounts = (i,rows, r)=>{
        // { rows[r].count.map((col) => (<td key={uniqid()} className={rowBg(i)}>{col}</td>)) } 
        
        let content = [];
        let col = rows[r].count;
        // console.log(col)
        // for(let d=0; d <= cols.length -1; d++){
        //     let date = cols[d];
            
        //     content.push(
        //         (col[d] !== undefined && col[d][date] !== undefined) ? <td key={uniqid()} className={rowBg(i)}>{col[d][date]}</td> : <td key={uniqid()} className={rowBg(i)}>0</td>
        //     )
        // }

        Object.keys(col).forEach(function(c, k) {
            
            content.push(
                <td key={uniqid()} className={rowBg(i)}>{col[c]}</td>
            )
        })
        
        return content;
    }
   
    const renderRows = () => {
        let content = [];
        
            Object.keys(rows).forEach(function(r, i) {
                content.push(
                    // console.log(rows[k].count)
                    <tr key={uniqid()}>
                        <td key={uniqid()} className={rowBg(i)}>{r}</td>
                        {
                            // cols.map((date, c) => {
                                renderCounts(i, rows, r)
                            // })
                        }
                        
                    </tr>
                )
    });
        
        // console.log(content)
        return content;
    }
   
    return (
        <table border="1">
            <thead>
                <tr>
                    <th className='col-2'>Scenario Status</th>
                    { cols.map((col) => (<th key={uniqid()}>{col}</th>)) }
                </tr>
            </thead>
            <tbody>
                
                { renderRows() }
                
            </tbody>
        </table>
    )

}

export default DailyOpsTbl;

