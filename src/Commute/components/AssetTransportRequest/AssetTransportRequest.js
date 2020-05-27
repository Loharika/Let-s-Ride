import React from 'react';
import {observer} from 'mobx-react';
import {Typo20DarkBlueGreyHKGrotestBold as FormHeadingText} from '../../../Common/styleGuides/StyleGuides.js';
import {Form,FormDashboard} from '../../../Common/styledComponents/styleComponents.js';
import {InputField} from '../../../Common/components/InputField.js';
import {DateAndTime} from '../../../Common/components/DateTime.js';

import {DisplayDropDown} from '../../../Common/components/DisplayDropDown.js';
import {DisplayListOfElements} from '../../../Common/components/DisplayListOfElements.js';
import {CheckBox,FlexibleTimings,FlexibleTimingsLabel} from '../RideRequest/styledComponents.js';
import DatePicker from 'react-datepicker';
@observer
class AssetTransportRequest extends React.Component{
    onChange=()=>{
        console.log(event.target.value);
    }
    
    render(){
        //const [startDate, setStartDate] = useState(new Date());
        const data={
            ListTitle:'ASSET TYPE',
            listItems:['Parcel','Bags','Others']
        };
        const data2={
            ListTitle:'ASSET SENSITIVITY',
            listItems:['Normal','Sensitive','Very Sensitive']
        };
        return (
            
            <FormDashboard>
                <Form>
                  <FormHeadingText>ASSET TRANSPORT REQUEST</FormHeadingText>
                  <InputField placeholderText={'Ex:'} type={'text'} label={'FROM'} onChange={this.onChange} value={' '}/>
                  <InputField placeholderText={'Ex:'} type={'text'} label={'TO'} onChange={this.onChange} value={' '}/>
                  <DateAndTime />
                  <FlexibleTimings>
                  <CheckBox id="flexibleTimings" type='checkbox' /><FlexibleTimingsLabel htmlFor='flexibleTimings'>Flexible Timings</FlexibleTimingsLabel>
                  </FlexibleTimings>
                  <DisplayListOfElements listData={{title:'NO OF ASSETS : '}} />
                  <DisplayDropDown data={data} />
                  <DisplayDropDown data={data2} />
                  <InputField placeholderText={'Name-Mobile Number'} type={'text'} label={'WHOM TO DELIVER'} onChange={this.onChange} value={' '}/>
                </Form>
            </FormDashboard>
            );
    }
}
export {AssetTransportRequest};