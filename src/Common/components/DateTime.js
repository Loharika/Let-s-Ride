

import React from "react";
import {observer} from 'mobx-react';
import {observable} from 'mobx';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {RiCalendarLine} from 'react-icons/ri';

import {DateAndTimeStyle,DataAndTimeDisplay,Star,ErrorStyle} from '../styledComponents/styleComponents.js';
import {Label} from '../styleGuides/StyleGuides.js';

import strings from '../i18n/strings.json';

import { Dropdown,  } from 'semantic-ui-react' 

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
    const {displayError}=this.props;
          const dateTo=[
        {
          key: 'date and time',
          text: 'Select Date and Time',
          value: 'date ans time',
          content: (
            <DatePicker
                  selected={this.startDate}
                  onChange={this.handleChange}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={1}
                  timeCaption="time"
                  dateFormat="MMMM d, yyyy h:mm aa"
                />
          ),
        }];
  
    return (
        <DateAndTimeStyle>
          {/*<Dropdown selection fluid options={dateTo} placeholder='Choose an option' />*/}
          
          <Label>
          {this.props.label}<Star>*</Star>
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
            <ErrorStyle isError={displayError}>Required</ErrorStyle>
        </DateAndTimeStyle >
    );
  }
}
export {DateAndTime};