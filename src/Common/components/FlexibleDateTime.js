import React from 'react';
import {observer} from 'mobx-react';
import {DateAndTime} from './DateTime.js';
import {FlexibleDateAndTimeStyle}  from '../styledComponents/styleComponents.js';
import strings from '../i18n/strings.json';

@observer
class FlexibleDateTime extends React.Component{
    constructor(){
        super();
    }
    render(){
        const {onChangeFromTime,onChangeToTime
            
        }=this.props;
        return (
            <FlexibleDateAndTimeStyle>
                <DateAndTime label={strings.from} onChangeTime={onChangeFromTime} />
                <DateAndTime label={strings.to} onChangeTime={onChangeToTime} />
            </FlexibleDateAndTimeStyle>
            );
    }
}
export {FlexibleDateTime};