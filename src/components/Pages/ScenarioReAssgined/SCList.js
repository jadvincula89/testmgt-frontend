import React from 'react';
import Checkbox from '../../General/Checkbox';
import BasicBtn from '../../General/Buttons/BasicBtn';
const uniqid = require("uniqid");
function SCList (props){
    const rowBg = (key) => {
        return (key % 2 == 0) ? 'dark' : 'light';
    }
    const displayAdditionalDetails = (tc_id) => {
        let content = [];
        if(props.details.length >= 1){
            props.details.map((detail) => {
                if(detail.tc_id === tc_id){
                    content.push(<div key={uniqid()}> <b>PhyDay:</b> { detail.phyDay }</div>)
                    content.push(<div key={uniqid()}> <b>VirDay:</b> { detail.virDay }</div>)
                    content.push(<div key={uniqid()}> <b>Prerequisite:</b> { detail.preq }</div>)
                    content.push(<div key={uniqid()}> <b>Tester:</b> { detail.tester }</div>)
                    content.push(<div key={uniqid()}> <b>Remarks:</b> { detail.remarks }</div>)
                }
            })
        }
        
        return content
    }
    const listing = (data) => {
        let content = []

        data.map((item, key) => {
            let isSelected = (props.selectedItem.includes(item.tc_id)) ? true : false
            content.push(
                <tr key={uniqid()}>
                    <td className={ rowBg(key) } key={uniqid()}>{ item.Assigned_Test_Case }</td>
                    <td className={ rowBg(key) } key={uniqid()}>{ item.tc_title }</td>
                    <td className={ rowBg(key) } key={uniqid()}>{ item.Assigned_TCStatus }</td>
                    <td className={ rowBg(key) } key={uniqid()}>{ item.te_planPhyDay }</td>
                    <td className={ rowBg(key) } key={uniqid()}>{ item.te_planVirDay }</td>
                    <td className={ rowBg(key) } key={uniqid()}>{ item.Current_Tester }</td>
                    <td className={ rowBg(key) } key={uniqid()}>{ item.te_execDate }</td>
                    <td className={ rowBg(key) } key={uniqid()}>{ item.tc_pretc_Id }</td>
                    <td className={ rowBg(key) } key={uniqid()}><Checkbox isCheck={true} value={ key+'-'+item.tc_id } changeValue={ props.selectItems } isSelected={ isSelected }/></td>
                    <td className={ rowBg(key)+" td-hover" } key={uniqid()} onClick={ () => { props.update(item.tc_id) } }>{ (isSelected) ? displayAdditionalDetails(item.tc_id) : '' }</td>
                </tr>
            )
        })
        return content
    }

    return(
        <>
            <table border="1" className='mt-5'>
                <thead>
                <tr key={uniqid()}>
                    <th key={uniqid()}>Test Case ID</th>
                    <th key={uniqid()}>Test Case Title</th>
                    <th key={uniqid()}>Status</th>
                    <th key={uniqid()}>Physical Day</th>
                    <th key={uniqid()}>Virtual Day</th>
                    <th key={uniqid()}>Assigned Tester</th>
                    <th key={uniqid()}>Execution Time</th>
                    <th key={uniqid()}>Prerequisite</th>
                    <th key={uniqid()}>Select</th>
                    <th key={uniqid()}>Details</th>
                </tr>
                </thead>
                <tbody>
                { listing(props.data) }
                </tbody>
            </table>
            <BasicBtn title="Update" additionalStyle='right' onClick={ () => { props.duplicate() } }/>
        </>
    )

}

export default SCList