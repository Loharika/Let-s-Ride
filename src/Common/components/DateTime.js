import React from 'react';
import {observer} from 'mobx-react';
import {observable} from 'mobx';
import {DateAndTimeStyle,DataAndTimeLabel,DataAndTimeDisplay} from '../styledComponents/styleComponents.js';

class DateAndTime extends React.Component{
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
export {DateAndTime};