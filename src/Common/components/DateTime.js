import React,{useState} from 'react';
import {observer} from 'mobx-react';
import {observable} from 'mobx';
import {DateAndTimeStyle,DataAndTimeLabel,DataAndTimeDisplay} from '../styledComponents/styleComponents.js';

import {DatePicker} from 'react-datepicker';
export const DateAndTime=()=>{
           const [startDate, setStartDate] = useState(new Date());
              return (
                
                <DateAndTimeStyle>
                {/*<DatePicker
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="time"
                  dateFormat="MMMM d, yyyy h:mm aa"
                />*/}
            <DataAndTimeLabel>DATE AND TIME : </DataAndTimeLabel>
            <DataAndTimeDisplay type='date' defaultValue="2018-07-22"/>
            </DateAndTimeStyle>
            );
    }
//export {DateAndTime};
/*class DateAndTime extends React.Component{
    constructor(){
        super();
    }
    render(){
        return (
            <DateAndTimeStyle>
            <DataAndTimeLabel>DATE AND TIME : </DataAndTimeLabel>
            <DataAndTimeDisplay type='date' defaultValue="2018-07-22"/>
            </DateAndTimeStyle>
            );
    }
}
export {DateAndTime};*/