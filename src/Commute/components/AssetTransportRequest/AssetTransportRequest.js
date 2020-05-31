import React from 'react';
import {observer} from 'mobx-react';
import {observable,action} from 'mobx';
import {Typo20DarkBlueGreyHKGrotestBold as FormHeadingText} from '../../../Common/styleGuides/StyleGuides.js';
import {Form,FormDashboard} from '../../../Common/styledComponents/styleComponents.js';
import {InputField} from '../../../Common/components/InputField.js';
import {DateAndTime} from '../../../Common/components/DateTime.js';
import {FlexibleDateTime} from '../../../Common/components/FlexibleDateTime.js';
import {Button} from '../../../Common/components/Button.js';
import {DisplayDropDown} from '../../../Common/components/DisplayDropDown.js';
import {DisplayListOfElements} from '../../../Common/components/DisplayListOfElements.js';

import {CheckBox,FlexibleTimings,FlexibleTimingsLabel} from '../RideRequest/styledComponents.js';
import strings from '../../i18n/strings.json';
const assetType={listTitle:'ASSET TYPE',
            listItems:[{
                        key: 'Parcel',
                        text: 'Parcel',
                        value: 'Parcel',
                      },
                      {
                        key: 'Bags',
                        text: 'Bags',
                        value: 'Bags',
                      },
                      {
                        key: 'Others',
                        text: 'Others',
                        value: 'Others',
                      },],
            placeholder:'Select Asset Type'
        };
        const assetSensitivity={listTitle:'ASSET SENSITIVITY',
            listItems:[{
                        key: 'Normal',
                        text: 'Normal',
                        value: 'Normal',
                      },
                      {
                        key: 'Sensitive',
                        text: 'Sensitive',
                        value: 'Sensitive',
                      },
                      {
                        key: 'Very Sensitive',
                        text: 'Very Sensitive',
                        value: 'Very Sensitive',
                      },],
            placeholder:'Select Asset Sensitivity',
        };

@observer
class AssetTransportRequest extends React.Component{
    @observable isCheckedFlexibleTimings;
    @observable displayError;
    @observable from;
    @observable to;
    @observable details;
    @observable dateTime;
    @observable startDateTime;
    @observable endDateTime;
    @observable assets;
    @observable assetType;
    @observable assetSensitivity;
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
        this.dateTime=new Date();
        this.startDateTime='';
        this.endDateTime='';
        this.assets='';
        this.assetType='';
        this.assetSensitivity='';
        this.details='';
    }
    onClickFlexibleTimings=()=>{
        this.isCheckedFlexibleTimings=!this.isCheckedFlexibleTimings;
    }
    onChangeRequestFrom=(event)=>{
        this.from=event.target.value;
        this.displayError=false;
    }
    onChangeRequestTo=(event)=>{
        this.to=event.target.value;
        this.displayError=false;
    }
    onChangeTime=(time)=>{
        this.dateTime=time;
    }
    onChangeFromTime=(time)=>{
        this.startDateTime=time;
    }
    onChangeToTime=(time)=>{
        this.endDateTime=time;
    }
    onChangeNoOfAssets=(assets)=>{
        this.assets=assets;
    }
    onChangeAssetType=(assetType)=>{
        this.assetType=assetType;
    }
    onChangeAssetSensitivity=(assetSensitivity)=>{
        this.assetSensitivity=assetSensitivity;
    }
    onChangeWhomToDeliver=(event)=>{
        this.details=event.target.value;
    }
    onSubmitRequest=()=>{
        this.displayError=true;
        const {postAssetTransportRequest}=this.props;
        let formDetails=[this.from,this.to,this.assets,this.assetType,this.assetSensitivity,this.details];
        
        let count=0;
        formDetails.forEach(eachDetail=>{
            if(eachDetail.length===0){
                count++;
            }
        });
        if(!this.isCheckedFlexibleTimings){
            if(count===0 && this.dateTime.length!==0){
                alert("Submitted Succesfully");
                
                const assetRequestData={
                    from:this.from,
                    to:this.to,
                    dateTime:this.dateTime,
                    assets:this.assets,
                    assetType:this.assetType,
                    assetSensitivity:this.assetSensitivity,
                    details:this.details,
                }
                postAssetTransportRequest(assetRequestData);
                console.log(assetRequestData);
                this.init();
                this.displayError=false;
            }
        }
         else{
            if(count===0 && this.startDateTime.length!==0 && this.endDateTime.length!==0){
                alert("Submitted Succesfully");
                
                const assetRequestData={
                    from:this.from,
                    to:this.to,
                    startDateTime:this.startDateTime,
                    endDateTime:this.endDateTime,
                    assets:this.assets,
                    assetType:this.assetType,
                    assetSensitivity:this.assetSensitivity,
                    details:this.details,
                }
                postAssetTransportRequest(assetRequestData);
                console.log(assetRequestData);
                this.init();
                this.displayError=false;
                
            }
        }
    }
    render(){
       const {from,to,details,
            isCheckedFlexibleTimings,
            onClickFlexibleTimings,
            onSubmitRequest,
            onChangeRequestFrom,
            onChangeRequestTo,
            displayError,
            onChangeTime,
            onChangeFromTime,
            onChangeToTime,
            onChangeNoOfAssets,
            onChangeAssetType,
            onChangeAssetSensitivity,
            onChangeWhomToDeliver,
        }=this;
        
        
        return (
            
            <FormDashboard>
                <Form>
                    <FormHeadingText>{strings.text.assetTranportRequest}</FormHeadingText>
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
                    
                    {isCheckedFlexibleTimings?<FlexibleDateTime
                                onChangeFromTime={onChangeFromTime} 
                                onChangeToTime={onChangeToTime}  displayError={displayError} />:
                        <DateAndTime label={strings.label.dateAndTime} onChangeTime={onChangeTime}  displayError={displayError}/>}
                    <FlexibleTimings>
                      <CheckBox  type={strings.type.checkbox} 
                      onClick={onClickFlexibleTimings} />
                      <FlexibleTimingsLabel>{strings.label.flexibleTimings}</FlexibleTimingsLabel>
                    </FlexibleTimings>
                    <DisplayListOfElements listData={{title:strings.text.noOfAssets}} onChange={onChangeNoOfAssets}displayError={displayError} />
                    <DisplayDropDown data={assetType} onChange={onChangeAssetType} displayError={displayError}/>
                    <DisplayDropDown data={assetSensitivity} onChange={onChangeAssetSensitivity} displayError={displayError}/>
                    <InputField placeholderText={strings.placeholderText.nameMobileNumber} 
                                type={strings.type.text} 
                                label={strings.label.whomToDeliver} 
                                onChange={onChangeWhomToDeliver}
                                displayError={displayError}
                                value={details}/>
                    <Button buttonText={strings.text.request} onClickFunction={onSubmitRequest}/>
                </Form>
            </FormDashboard>
            );
    }
}
export {AssetTransportRequest};