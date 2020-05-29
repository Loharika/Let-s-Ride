import React from 'react';
import {observable} from 'mobx';
import {observer,inject} from 'mobx-react';
import {AssetTransportRequest} from '../../components/AssetTransportRequest';

@inject('commuteStore')
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
        const {commuteStore:{postRideRequest}}=this.props;
        this.displayError=!this.displayError;
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
                this.displayError=false;
                const rideRequestData={
                    from:this.from,
                    to:this.to,
                    dateTime:this.dateTime,
                    assets:this.assets,
                    assetType:this.assetType,
                    assetSensitivity:this.assetSensitivity,
                    details:this.details,
                }
                postRideRequest(rideRequestData);
                
            }
        }
        else{
            if(count===0 && this.startDateTime.length!==0 && this.endDateTime.length!==0){
                alert("Submitted Succesfully");
                this.displayError=false;
                const rideRequestData={
                    from:this.from,
                    to:this.to,
                    startDateTime:this.startDateTime,
                    endDateTime:this.endDateTime,
                    assets:this.assets,
                    assetType:this.assetType,
                    assetSensitivity:this.assetSensitivity,
                    details:this.details,
                }
                postRideRequest(rideRequestData);
            }
        }
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