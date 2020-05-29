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
        const {limit,getRideRequests,getAssetRequests,renderPageRideRequests,onChangePageNumber,onChangeFilter,onChangeSortBy,pageNumber}=this.props;
    
        switch(this.displayRequestType){
            case 'ride':{
                return <ShowRideRequests limit={limit}
                pageNumber={pageNumber}
                rideRequests={getRideRequests()}
                renderPageRideRequests={renderPageRideRequests}
                onChangePageNumber={onChangePageNumber}
                onChangeFilter={onChangeFilter}
                onChangeSortBy={onChangeSortBy}
                renderPageRideRequests={renderPageRideRequests}
                
                />;
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


