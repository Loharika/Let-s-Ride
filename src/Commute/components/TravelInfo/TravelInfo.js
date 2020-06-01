
import React from 'react';
import {observable,action} from 'mobx';
import {observer} from 'mobx-react';

import {Typo20DarkBlueGreyHKGrotestBold as FormHeadingText} from '../../../Common/styleGuides/StyleGuides.js';
import {Form,FormDashboard} from '../../../Common/styledComponents/styleComponents.js';
import {InputField} from '../../../Common/components/InputField.js';
import {DateAndTime} from '../../../Common/components/DateTime.js';
import {Button} from '../../../Common/components/Button.js';
import {DisplayListOfElements} from '../../../Common/components/DisplayListOfElements.js';
import {FlexibleDateTime} from '../../../Common/components/FlexibleDateTime.js';
import {DisplayDropDown} from '../../../Common/components/DisplayDropDown.js';
import {CheckBox,FlexibleTimings,FlexibleTimingsLabel} from './styledComponents.js';


import strings from '../../i18n/strings.json';

@observer
class TravelInfo extends React.Component{
    @observable isCheckedFlexibleTimings;
    @observable displayError;
    @observable from;
    @observable to;
    @observable dateTime;
    @observable startDateTime;
    @observable endDateTime;
    @observable travelMedium;
    @observable assetsQuantity;
    constructor(props){
        super(props);
        this.init();
    }
    @action.bound
    init(){
        this.isCheckedFlexibleTimings=false;
        this.displayError=false;
        this.from='';
        this.to='';
        this.dateTime='';
        this.startDateTime='';
        this.endDateTime='';
        this.travelMedium='';
        this.assetsQuantity=0;
    }
    onClickFlexibleTimings=()=>{
        this.isCheckedFlexibleTimings=!this.isCheckedFlexibleTimings;
    }
    onChangeFrom=(event)=>{
        this.from=event.target.value;
        this.displayError=false;
    }
    onChangeTo=(event)=>{
        this.to=event.target.value;
        this.displayError=false;
    }
    onChangeDateTime=(time)=>{
        this.dateTime=time;
    }
    onChangeFromTime=(time)=>{
        this.startDateTime=time;
    }
    onChangeToTime=(time)=>{
        this.endDateTime=time;
    }
    onChangeAssetsQuantity=(assetsQuantity)=>{
        this.assetsQuantity=assetsQuantity;
    }
    onChangeTravelMedium=(travelMedium)=>{
        this.travelMedium=travelMedium;
    }
    onSubmitRequest=()=>{
        this.displayError=true;
        const {shareTravelInfo}=this.props;
        let formDetails=[this.from,this.to,this.dateTime,this.assetsQuantity,this.travelMedium];
        let count=0;
        formDetails.forEach(eachDetail=>{
            if(eachDetail.length===0 || eachDetail===0){
                count++;
            }
        });
        if(!this.isCheckedFlexibleTimings){
            if(count===0 && this.dateTime.length!==0){
                alert("Submitted Succesfully");
                this.displayError=false;
                const travelInfoData={
                    from:this.from,
                    to:this.to,
                    isFlexible:false,
                    dateTime:this.dateTime,
                    travelMedium:this.travelMedium,
                    assetsQuantity:this.assetsQuantity,
                };
               
                this.init();
                shareTravelInfo(travelInfoData);
            }
        }
        else{
            if(count===0 && this.startDateTime.length!==0 && this.endDateTime.length!==0){
                alert("Submitted Succesfully");
                this.displayError=false;
                const travelInfoData={
                    from:this.from,
                    to:this.to,
                    isFlexible:true,
                    startDateTime:this.startDateTime,
                    endDateTime:this.endDateTime,
                    travelMedium:this.travelMedium,
                    assetsQuantity:this.assetsQuantity,
                }
                this.init();
                shareTravelInfo(travelInfoData);
            }
        }
    }
    render(){
        const travelMediums={
            listTitle:'TRAVEL MEDIUM',
            listItems:[{key:'BUS',text:'Bus',value:'Bus'},
            {key:'Car',text:'Car',value:'Car'},{key:'Taxi',text:'Taxi',value:'Taxi'},],
            placeholder:'Select Travel Medium'
        };
        const {from,to,displayError,isCheckedFlexibleTimings,
        dateTime,assetsQuantity,
        onChangeFrom,onChangeTo,
        onChangeFromTime,
        onChangeToTime,startDateTime,
        endDateTime,onChangeDateTime,
        onClickFlexibleTimings,
        onChangeAssetsQuantity,
        onSubmitRequest,
        onChangeTravelMedium
        }=this;
        return(
            <FormDashboard>
                <Form>
            <FormHeadingText>{strings.text.travelInfo}</FormHeadingText>
                  <InputField placeholderText={strings.placeholderText.ex} 
                            type={strings.type.text} 
                            label={strings.label.from} 
                            onChange={onChangeFrom} 
                            value={from}
                            displayError={displayError}/>
                  <InputField placeholderText={strings.placeholderText.ex} 
                      type={strings.type.text} 
                      label={strings.label.to} 
                      onChange={onChangeTo} 
                      value={to}
                      displayError={displayError}/>
                  {isCheckedFlexibleTimings?
                    <FlexibleDateTime onChangeFromTime={onChangeFromTime} 
                    onChangeToTime={onChangeToTime} startDateTime={startDateTime} 
                    endDateTime={endDateTime}  displayError={displayError} />:
                    <DateAndTime label={strings.label.dateAndTime} onChangeTime={onChangeDateTime} 
                    dateAndTime={dateTime}  displayError={displayError}/>}
                  <FlexibleTimings>
                    <CheckBox type={strings.type.checkbox} onClick={onClickFlexibleTimings} /><FlexibleTimingsLabel >{strings.label.flexibleTimings}</FlexibleTimingsLabel>
                  </FlexibleTimings>
                  <DisplayListOfElements listData={{title:strings.text.assetsQuantity}} onChange={onChangeAssetsQuantity}
                  displayError={displayError} intial={assetsQuantity}/>
                  <DisplayDropDown data={travelMediums} onChange={onChangeTravelMedium} displayError={displayError} displayError={displayError}/>
                  <Button buttonText={strings.text.shareText} onClickFunction={onSubmitRequest}/>
           </Form>
            </FormDashboard>
            
            );
    }
}
export {TravelInfo};
