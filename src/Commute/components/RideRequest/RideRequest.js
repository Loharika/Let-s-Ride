import React from 'react';
import {observer} from 'mobx-react';
import {Typo20DarkBlueGreyHKGrotestBold as FormHeadingText} from '../../../Common/styleGuides/StyleGuides.js';
import {Form,FormDashboard} from '../../../Common/styledComponents/styleComponents.js';
import {InputField} from '../../../Common/components/inputField.js';
import {DateAndTime} from '../../../Common/components/DateTime.js';
import {NoOfSeats} from '../../../Common/components/NoOfSeats.js';
import {NoOfLuggages} from '../../../Common/components/NoOfLuggages.js';
import {CheckBox,FlexibleTimings,FlexibleTimingsLabel} from './styledComponents.js';
@observer
class RideRequest extends React.Component{
    onChange=()=>{
        console.log(event.target.value);
    }
    render(){
        return (
            <FormDashboard>
                <Form>
                  <FormHeadingText>RIDE REQUEST</FormHeadingText>
                  <InputField placeholderText={'Ex:'} type={'text'} label={'FROM'} onChange={this.onChange} value={' '}/>
                  <InputField placeholderText={'Ex:'} type={'text'} label={'TO'} onChange={this.onChange} value={' '}/>
                  <DateAndTime />
                  <FlexibleTimings>
                  <CheckBox id="flexibleTimings" type='checkbox' /><FlexibleTimingsLabel htmlFor='flexibleTimings'>Flexible Timings</FlexibleTimingsLabel>
                  </FlexibleTimings>
                  <NoOfSeats />
                  <NoOfLuggages />
                </Form>
            </FormDashboard>
            );
    }
}
export {RideRequest};