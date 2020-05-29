import React from 'react';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import {RideRequest} from '../../components/RideRequest';

@observer
class RideRequestRoute extends React.Component{
    @observable isCheckedFlexibleTimings;
    @observable displayError;
    @observable from;
    @observable to;
    @observable dateTime;
    @observable startDateTime;
    @observable endDateTime;
    @observable seats;
    @observable luggages;
    constructor(){
        super();
        this.isCheckedFlexibleTimings=false;
        this.displayError=false;
        this.from='';
        this.to='';
        this.dateTime=new Date();
        this.startDateTime=new Date();
        this.endDateTime=new Date();
        this.seats='';
        this.luggages='';
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
    onChangeNoOfSeats=(seats)=>{
            this.seats=seats;
        
    }
    onChangeNoOfLuggages=(luggages)=>{
            this.luggages=luggages;
    }
    onSubmitRequest=()=>{
        this.displayError=!this.displayError;
        let formDetails=[this.from,this.to,this.dateTime,this.seats,this.luggages];
        console.log(formDetails);
        let count=0;
        formDetails.forEach(eachDetail=>{
            if(eachDetail.length===0){
                count++;
            }
        });
        if(!this.isCheckedFlexibleTimings){
            if(count===0 && this.dateTime.length!==0){
                console.log(this.from)
                console.log(this.to)
                console.log(this.dateTime)
                console.log(this.seats)
                console.log(this.luggages)
                this.displayError=false;
            }
        }
        else{
            alert(count+"     "+this.startDateTime.length+"   "+this.endDateTime.length);
            if(count===0 && this.startDateTime.length!==0 && this.endDateTime.length!==0){
                
                console.log(this.from)
                console.log(this.to)
                console.log(this.startDateTime)
                console.log(this.endDateTime)
                console.log(this.seats)
                console.log(this.luggages)
                this.displayError=false;
            }
        }
    }
    render(){
        const {from,to,dateTime,startDateTime,endDateTime,
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
        }=this;
        return (
            <RideRequest
            from={from}
            to={to}
            displayError={displayError}
            isCheckedFlexibleTimings={isCheckedFlexibleTimings}
            onClickFlexibleTimings={onClickFlexibleTimings}
            onSubmitRequest={onSubmitRequest}
            onChangeRequestFrom={onChangeRequestFrom}
            onChangeRequestTo={onChangeRequestTo}
            onChangeTime={onChangeTime}
            onChangeFromTime={onChangeFromTime}
            onChangeToTime={onChangeToTime}
            onChangeNoOfLuggages={onChangeNoOfLuggages}
            onChangeNoOfSeats={onChangeNoOfSeats}
            dateTime={dateTime}
            startDateTime={startDateTime}
            endDateTime={endDateTime}
            />
            )
    }
}
export {RideRequestRoute}