import React from 'react';
import { TS_STATUS_FAILED, TS_STATUS_PASSED,TS_STATUS_NOT_APPLICABLE,TS_STATUS_BLOCKED  } from '../../../../shared/constants';
const uniqid = require('uniqid');

function ReviewTableRowValue(props) { 

    const rowBg = (key) => {
        return (key % 2 === 0) ? 'dark' : 'light';
    }
    const validURL=(str) => {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(str);
   }
    const statusCode = (status) => {
        let code = status;
        if(code === TS_STATUS_PASSED){
            return <span className='text-color-green bold'>Passed</span>;
        }else if(code === TS_STATUS_FAILED){
            return <span className='text-color-red bold'>Failed</span>;
        }
        else if(code === TS_STATUS_NOT_APPLICABLE){
            return <span className='text-color-red bold'>Not Applicable</span>;
        }
        else if(code === TS_STATUS_BLOCKED){
            return <span className='text-color-red bold'>Blocked</span>;
        }
        else{
            return ''
        }
    }
    const rowData = (key, item) => {
        return(
            <><tr key={ uniqid()}>
                    <td className={ rowBg(key) } key={ uniqid() }>{ item.ts_stepNum }</td>
                    <td className={ rowBg(key) } key={ uniqid() }>{ item.ts_desc }</td>
                    <td className={ rowBg(key) } key={ uniqid() }>{ item.ts_expectedResult }</td>

                    <td className={ rowBg(key) } key={ uniqid() }>
                    {validURL(item.tse_pot) &&  <a  onClick={() =>window.open(item.tse_pot, "_blank")}
                    href={item.tse_pot}  target="_blank"
                  >
                    Link
                  </a> }
                    </td>

                    <td className={ rowBg(key) } key={ uniqid() }>{ item.actualResult }</td>
                    <td className={ rowBg(key) } key={ uniqid() }>{ statusCode(item.tse_status) }</td>
                </tr>
            </>
        )
    }

    const rows = (items) => {
       
        let content = [];
        if(items.length >= 1){
           
            items.map(( item, key ) =>
                content.push(
                    rowData(key, item)
                )
            )

           
        }

        return content;
    }
    
    return (
        <div className='m-l-f-30'  key={ uniqid() }>
            <table border="1" className='sub-tbl'  key={ uniqid() }>
                <thead  key={ uniqid() }>
                    <tr key={ uniqid() }>
                        <th key={ uniqid() }>Test Step #</th>
                        <th key={ uniqid() }>Test Step Title</th>
                        <th key={ uniqid() }>Expected Result</th>
                        <th key={ uniqid() }>POT Link</th>
                        <th key={ uniqid() }>Actual Result</th>
                        <th key={ uniqid() }>Status</th>
                    </tr>
                </thead>
                <tbody  key={ uniqid() }>
                    { (props.data !== undefined) ? rows(props.data) : <tr></tr> }
                </tbody>
            </table>
        </div>
    )
}
export default ReviewTableRowValue;
