import { lineHeight } from '@mui/system';
import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import MomentLocaleUtils, {
  formatDate,
  parseDate
} from "react-day-picker/moment";

export default class MyForm extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      
    };
  }
  
  render() {
    const FORMAT = 'YYYY-MM-DD';
    const { selectedDay } = this.state;
    return (
        
                <DayPickerInput
                onDayChange={this.props.handleDayChange}
                format="YYYY-MM-DD"
                formatDate={formatDate}
                parseDate={parseDate}
                dayPickerProps={{
                    locale: "it",
                    localeUtils: MomentLocaleUtils
                }}
                value={this.props.selectedDay}
                name={this.props.name}
                
                />
            
    );
  }
}