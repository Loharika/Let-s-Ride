import React from 'react';
import {action,observable} from 'mobx';
import {observer} from 'mobx-react';
import {ShowRideRequests} from './ShowRideRequests.js';
import {ShowAssetTransport} from './ShowAssetTransport.js';

import {MyRequestsHeader,MyRequestType,MyRequestsDashboard} from './styledComponents.js';
import {Typo32DarkBlueGreyRubikRegular as MyRequestsTitle} from '../../../Common/styleGuides/StyleGuides.js';

@observer
class ShowMyRequests extends React.Component{
    @observable displayRequestType;
    constructor(){
        super();
        this.displayRequestType='ride'
    }
    onClickRequestType=(requestType)=>{
        
        this.displayRequestType=requestType;
    }
    
    displayRequestPage=()=>{
        const {getRideRequests,getAssetRequests}=this.props;
        switch(this.displayRequestType){
            case 'ride':{
                return <ShowRideRequests rideRequests={getRideRequests()}/>;
            }
            case 'asset':{
                return <ShowAssetTransport assetRequests={getAssetRequests()}/>;
            }
        }
    }
    @action.bound
    getRequestData(){
        const {requests}=this.props;
        return requests;
    }
    render(){
        const requests=this.getRequestData();
        const {onClickRequestType}=this;
        return (
            <MyRequestsDashboard>
            <MyRequestsTitle>My Requests</MyRequestsTitle>
             <MyRequestsHeader>
              <MyRequestType onClick={()=>onClickRequestType('ride')} >Ride</MyRequestType>
              <MyRequestType onClick={()=>onClickRequestType('asset')}>Asset</MyRequestType>
            </MyRequestsHeader> 
            {this.displayRequestPage()}
            </MyRequestsDashboard>
            );
    }
}
export {ShowMyRequests};
/*
{"id":"1",
"from":"2020-05-28T05:31:01.185Z",
"to":"Isabelle Steuber",
"assetType":"Ball",
"dateTime":1590681013,
"assetSensitivity":"Practical",
"whomToDeliver":"Chloe",
"acceptedPerson":"Violette55",
"status":"status 1",
"noOfAssets":22}

*/
/*
{"id":"10",
"name":"Dr. Madelynn Lehner",
"from":"Rollinfurt",
"to":"North Linda",
"noOfSeats":84,
"mobileNumber":"(402) 512-5071","
date":1590680579,
"noOfLuggages":53}
*/