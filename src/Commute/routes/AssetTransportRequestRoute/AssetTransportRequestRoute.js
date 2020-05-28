import React from 'react';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import {AssetTransportRequest} from '../../components/AssetTransportRequest';

@observer
class AssetTransportRequestRoute extends React.Component{
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
    constructor(){
        super();
        this.isCheckedFlexibleTimings=false;
        this.displayError=false;
        this.from='';
        this.to='';
        this.dateTime=new Date();
        this.startDateTime='';
        this.endDateTime='';
        this.assets=0;
        this.assetType='None';
        this.assetSensitivity='Normal';
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
        this.displayError=!this.displayError;
        console.log(this.from)
        console.log(this.to)
        console.log(this.dateTime)
        console.log(this.startDateTime)
        console.log(this.endDateTime)
        console.log(this.assets)
        console.log(this.assetType)
        console.log(this.assetSensitivity)
        console.log(this.details)
    }
    render(){
        
        const {from,to,details,dateTime,startDateTime,endDateTime,
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
            onChangeWhomToDeliver
        }=this;
        return (
            <AssetTransportRequest
            from={from}
            to={to}
            details={details}
            displayError={displayError}
            isCheckedFlexibleTimings={isCheckedFlexibleTimings}
            onClickFlexibleTimings={onClickFlexibleTimings}
            onSubmitRequest={onSubmitRequest}
            onChangeRequestFrom={onChangeRequestFrom}
            onChangeRequestTo={onChangeRequestTo}
            onChangeTime={onChangeTime}
            onChangeFromTime={onChangeFromTime}
            onChangeToTime={onChangeToTime}
            onChangeNoOfAssets={onChangeNoOfAssets}
            onChangeAssetType={onChangeAssetType}
            onChangeAssetSensitivity={onChangeAssetSensitivity}
            onChangeWhomToDeliver={onChangeWhomToDeliver}
            dateTime={dateTime}
            startDateTime={startDateTime}
            endDateTime={endDateTime}
            />
            )
    }
}
export {AssetTransportRequestRoute}