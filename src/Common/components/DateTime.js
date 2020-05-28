

import React from "react";
import {observer} from 'mobx-react';
import {observable} from 'mobx';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {RiCalendarLine} from 'react-icons/ri';
import {DateAndTimeStyle,DataAndTimeDisplay} from '../styledComponents/styleComponents.js';
import {Label} from '../styleGuides/StyleGuides.js';
import strings from '../i18n/strings.json';
@observer
class DateAndTime extends React.Component {
    @observable startDate;
      constructor(){
          super();
          this.startDate= new Date();
      }
    
      handleChange = date => {
        const {onChangeTime}=this.props;
        this.startDate=date;
        onChangeTime(date);
      };
     
  render() {
    return (
        <DateAndTimeStyle>
        <Label>
        {this.props.label}
        </Label>
        <DataAndTimeDisplay>
        <RiCalendarLine />
          <DatePicker
            selected={this.startDate}
            onChange={this.handleChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={1}
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"
          />
          </DataAndTimeDisplay>
      </DateAndTimeStyle >
    );
  }
}
export {DateAndTime};