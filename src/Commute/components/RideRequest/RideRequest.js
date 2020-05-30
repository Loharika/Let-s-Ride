import React from 'react';
import {observer} from 'mobx-react';

import {Typo20DarkBlueGreyHKGrotestBold as FormHeadingText} from '../../../Common/styleGuides/StyleGuides.js';
import {Form,FormDashboard} from '../../../Common/styledComponents/styleComponents.js';
import {InputField} from '../../../Common/components/InputField.js';
import {DateAndTime} from '../../../Common/components/DateTime.js';
import {Button} from '../../../Common/components/Button.js';
import {DisplayListOfElements} from '../../../Common/components/DisplayListOfElements.js';
import {FlexibleDateTime} from '../../../Common/components/FlexibleDateTime.js';

import {CheckBox,FlexibleTimings,FlexibleTimingsLabel} from './styledComponents.js';

import strings from '../../i18n/strings.json';

@observer
class RideRequest extends React.Component{
    
    render(){
        const {from,to,
            isCheckedFlexibleTimings,
            onClickFlexibleTimings,
            onSubmitRequest,
            onChangeRequestFrom,
            onChangeRequestTo,
            displayError,
            onChangeTime,
            onChangeFromTime,
            onChangeToTime,
            onChangeNoOfSeats,
            onChangeNoOfLuggages
        }=this.props;
        return (
            <FormDashboard>
                <Form>
                  <FormHeadingText>{strings.text.rideRequest}</FormHeadingText>
                  <InputField placeholderText={strings.placeholderText.ex} 
                            type={strings.type.text} 
                            label={strings.label.from} 
                            onChange={onChangeRequestFrom} 
                            value={from}
                            displayError={displayError}/>
                  <InputField placeholderText={strings.placeholderText.ex} 
                      type={strings.type.text} 
                      label={strings.label.to} 
                      onChange={onChangeRequestTo} 
                      value={to}
                      displayError={displayError}/>
                  {isCheckedFlexibleTimings?
                    <FlexibleDateTime onChangeFromTime={onChangeFromTime} 
                    onChangeToTime={onChangeToTime} displayError={displayError}
                    />:
                    <DateAndTime label={strings.label.dateAndTime} onChangeTime={onChangeTime} displayError={displayError} />}
                  <FlexibleTimings>
                    <CheckBox type={strings.type.checkbox} onClick={onClickFlexibleTimings} /><FlexibleTimingsLabel >{strings.label.flexibleTimings}</FlexibleTimingsLabel>
                  </FlexibleTimings>
                  <DisplayListOfElements listData={{title:strings.text.noOfSeats}} onChange={onChangeNoOfSeats} displayError={displayError}/>
                  <DisplayListOfElements listData={{title:strings.text.noOfLuggages}} onChange={onChangeNoOfLuggages} displayError={displayError}/>
                  <Button buttonText={strings.text.request} onClickFunction={onSubmitRequest}/>
                </Form>
            </FormDashboard>
            );
    }
}
export {RideRequest};