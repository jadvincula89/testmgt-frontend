const uniqid = require('uniqid');

const DynamicDataService = {
    getUniqueValue: function(data) {
        
        let result = [];
        if(data.length >= 1){
            data.map((item)=>{
                item.dynamic_data.map((ddata)=>{
                    if(result.includes(ddata.attr) === false){
                        result.push(ddata.attr)
                    }
                });
            });
        }

        return result
        
    },renderFilterAttrOptions: function(data) {
        let content = []
        
        /**
         * Sort alphabetically
         */
        data.sort();
        
        data.map((item) => {
            content.push(
                <option key={ uniqid() } value={ item }>{ item }</option>
            )
        })

        return content
    },search: function(data,value, attr) {
        
        console.log('value: '+value)
        console.log('attr: '+attr)
        let results = []
       
        data.map(( items ) => {
            items.dynamic_data.map((item) => {
                if( value !== '' && attr !== '' ){
                   
                    if( item.value === value && item.attr === attr ){
                       
                        if(results.includes(items) === false){ results.push( items ) } 
                    }
                }else if( value !== '' && attr === '' ){
                    
                    if( item.value === value ){
                        if(results.includes(items) === false){ results.push( items ) } 
                    }
                }else if( value === '' && attr !== '' ){
                   
                    if( item.attr === attr ){
                        if(results.includes(items) === false){ results.push( items ) } 
                    }
                }
            })
        })
        console.log(results)
        return results
    },getUniqueAttr:function(data) {
        let result = [];
        if(data.length >= 1)
            data.map((item)=>{
                if(result.includes(item.attr) === false){
                    result.push(item.attr)
                }
            })

        return result
        
    }

}
export default DynamicDataService;