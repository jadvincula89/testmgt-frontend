
const DateFormatService = {
    formatDate : function(day){
        if(day){
            var daymonth = ("0" + (day.getMonth() + 1)).slice(-2); 
            var dayday = day.getDate();
            var dayyear = day.getFullYear();

            const today = new Date(day.toLocaleString());
            var month = (parseInt(today.getMonth()+1)<= 9) ? "0"+parseInt(today.getMonth()+1) : parseInt(today.getMonth()+1);
            var day = (today.getDate() <= 9) ? "0"+today.getDate() : today.getDate();
            let date = today.getFullYear()+"-"+month+"-"+day;

            return date;
            
        }
    }
}

export default DateFormatService;