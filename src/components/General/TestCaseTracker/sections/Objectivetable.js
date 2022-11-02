
import BasicBtn from '../../Buttons/BasicBtn';
import React, { useRef,useEffect } from 'react';
import { MinusCircleFilled,PlusCircleFilled } from "@ant-design/icons";
const uniqid = require('uniqid');
var isLoading=false;
function Objectivetable(props) { 
    const inputRef = useRef([]); // Javascript
    const itemsRef = useRef([]); // Javascript
    const rowBg = (key) => {
        return (key % 2 == 0) ? 'dark' : 'light';
    }
    const hideMe=()=>{
        isLoading=true;
        props.savedata();
    }
    const rows = (items) => {
       
        let content = [];
        let countData=1;
        isLoading=false;
        if(items.length >= 1){
            for(let x = 1; x <= items.length; x++){ 
                let arrkey = x - 1;
           // items.filter((items) => items.to_id!=='').map(( item, key ) =>
                content.push(
                    <tr key={ uniqid() }>
                    <td  className={ rowBg(arrkey)+ ' hoverable' } >{ items[arrkey].area }</td>
                    <td  className={ rowBg(arrkey)+ ' hoverable' }>{ items[arrkey].group }</td>
                    <td className={ rowBg(arrkey)+ ' hoverable' }>{ items[arrkey].objective }</td>
                    <td  className={ rowBg(arrkey)+ ' hoverable' } >{ items[arrkey].description }</td>
                    <td  className={ rowBg(arrkey)+ ' hoverable' }>
                    <input type="text" 
                     key={ uniqid()} 
                     placeholder="Enter Remarks Here"
                   
                      id={arrkey} 
                      name="value"
                      className='form-control'
                      ref={el => inputRef.current[arrkey] = el} 
                      autoFocus={inputRef.current[arrkey] === document.activeElement} 
                            onFocus={function(e) {
                                var val = e.target.value;
                                e.target.value = '';
                                e.target.value = val;
                            }}
            value={ props.data[arrkey]['value'] }    
            defaultValue={items[arrkey].remarks}
                         onChange={props.changeRemarksValue}
                        />
         
         
                    </td>
                    <td  >
                        <MinusCircleFilled className='remove' onClick={() => props.remove(arrkey)} />
                    </td>
                 </tr>
                )
          //  )
                        }
    
    }

        return content;
    }
   
    return (
      <div xs={12}>
       <table border="1" className='tbl-no-style' >
       <thead>
           <tr key={ uniqid() }>
               <th  key={ uniqid() }>Area</th>
               <th  key={ uniqid() }>Group</th>
               <th  key={ uniqid() }>Objectives</th>
               <th  key={ uniqid() }>Description</th>
               <th  key={ uniqid() }>Remarks</th>
             
           </tr>
       </thead>
       <tbody  key={ uniqid() }>
       { (props.data !== undefined && props.data.length >= 1) ? rows(props.data) : <tr  key={ uniqid() }><td  colSpan="6" className='light'>No data found</td></tr> }
       <tr key={ uniqid() }>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
           <td>
      {  isLoading===false && ( props.data.length >= 1  ||  props.deldata.length >= 1  ) && <BasicBtn title="Save"  onClick={() => {hideMe();}} additionalStyle={" m-2" } />  } 
 

           </td>
        </tr>
     
       </tbody>
   </table>
   </div>


    )
}
export default Objectivetable;
