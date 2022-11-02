import { MinusCircleFilled,PlusCircleFilled } from "@ant-design/icons";
import BasicBtn from '../General/Buttons/BasicBtn';
import React, { useRef,useEffect } from 'react';
const uniqid = require('uniqid');
function EditActualResultModal(props) {
    const inputRef = useRef([]); // Javascript
    const itemsRef = useRef([]); // Javascript
    const dynamicOptions = () => {
        var content = [];
        var DynamicDataOptions = props.dynamic_data_attr;
        DynamicDataOptions.map((val, index)=>{
            content.push(
                <option value={ val.value }>{ val.value }</option>
            )
        })
        return content;
    }

    
        
    useEffect(() => {
        let countData = props.count;
        itemsRef.current = itemsRef.current.slice(0, countData);
        inputRef.current = inputRef.current.slice(0, countData);
    }, [props.dynamic_data]);
        

    const row = () =>{
        var content = [];
        let countData = props.count;

        for(let x = 1; x <= countData; x++){
            let arrkey = x - 1;
            content.push(
                
                <tr key={ uniqid() }>
                    <td>{ x }</td>
                    <td>
                        <select id={ x } key={ uniqid() } className='form-control' data-id={arrkey} value={ props.dynamic_data[arrkey]['attr'] } onChange={ props.changeDynamicDataAttr }>
                            <option value="">Select Option</option>
                            { dynamicOptions(props.dynamic_data[arrkey]) }
                        </select>
                    </td>
                    <td>
                        <input type="text" 
                            key={ uniqid() }
                            ref={el => itemsRef.current[arrkey] = el} 
                            autoFocus={itemsRef.current[arrkey] === document.activeElement} 
                            onFocus={function(e) {
                                var val = e.target.value;
                                e.target.value = '';
                                e.target.value = val;
                            }}
                            className='form-control' placeholder='value' onChange={ props.changeDynamicDataValue } value={ props.dynamic_data[arrkey]['value'] } name="value" id={ arrkey }/>
                    </td>
                    <td>
                        <textarea 
                            key={ uniqid() }
                            ref={el => inputRef.current[arrkey] = el} 
                            autoFocus={inputRef.current[arrkey] === document.activeElement} 
                            onFocus={function(e) {
                                var val = e.target.value;
                                e.target.value = '';
                                e.target.value = val;
                            }}
                            className='form-control' placeholder='remarks' onChange={ props.changeDynamicDataValue } value={ props.dynamic_data[arrkey]['remarks'] }  name="remarks" id={ arrkey } />
                    </td>
                    <td>
                        <MinusCircleFilled className='remove' onClick={() => props.remove(arrkey)} />
                    </td>
                </tr>
            )
        }

        return content;
    }
    return (
        <div>
            <table border='0' className='tbl-no-style'>
                <tbody>
                { (props.count >= 1) ? row() : "" }
                </tbody>
            </table>
            <div className='right'>
                <BasicBtn title="Add more Dynamic Data" onClick={ props.add }/> 
            </div>
        </div>
    )
}
export default EditActualResultModal;