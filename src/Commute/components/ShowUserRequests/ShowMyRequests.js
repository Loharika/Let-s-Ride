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
        const {init}=this.props;
        init();
        this.displayRequestType=requestType;
    }
    
    displayRequestPage=()=>{
        const {limit,
        getRequests,
        renderPageRequests,
        onChangePageNumber,
        onChangeFilter,
        onChangeSortBy,
        rideRequestTableHeaders,
        assetRequestTableHeaders,
        pageNumber}=this.props;
    
        switch(this.displayRequestType){
            case 'ride':{
                return <ShowRideRequests 
                limit={limit}
                pageNumber={pageNumber}
                getRequests={getRequests}
                renderPageRequests={renderPageRequests}
                onChangePageNumber={onChangePageNumber}
                onChangeFilter={onChangeFilter}
                onChangeSortBy={onChangeSortBy}
                tableHeaders={rideRequestTableHeaders}
                />;
            }
            case 'asset':{
                return <ShowAssetTransport 
                limit={limit}
                pageNumber={pageNumber}
                getRequests={getRequests}
                renderPageRequests={renderPageRequests}
                onChangePageNumber={onChangePageNumber}
                onChangeFilter={onChangeFilter}
                onChangeSortBy={onChangeSortBy}
                tableHeaders={assetRequestTableHeaders}
                />;
            }
        }
    }
    render(){
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


