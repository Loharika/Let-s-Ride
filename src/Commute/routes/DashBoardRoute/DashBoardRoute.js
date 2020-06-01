
import React from 'react';
import {observable,action} from 'mobx';
import {observer,inject} from 'mobx-react';
import {withRouter} from 'react-router-dom';
import {DashBoard} from '../../components/CommuteDashboard';

import strings from '../../i18n/strings.json';

const homePage=strings.navigatePageTo.homePage;
const rideRequest=strings.navigatePageTo.rideRequest;
const assetTranportRequest=strings.navigatePageTo.assetTranportRequest;
const shareRide=strings.navigatePageTo.shareRide;
const shareTravelInfo=strings.navigatePageTo.shareTravelInfo;
const userProfile=strings.navigatePageTo.userProfile;

@inject('commuteStore','authStore')
@observer
class DashBoardRoute extends React.Component{
    @observable displayRequestType;
    @observable filter;
    @observable sortBy;
    @observable pageNumber;
    @observable totalNumberOfPages;
    @observable navigateTo;
    
    @observable matchingRequestsFilter;
    
    constructor(){
        super();
        this.limit=4;
        this.rideRequestTableHeaders=['FROM','TO','DATE AND TIME','NUMBER OF PEOPLE','LUGGAGE QUANTITY','ACCEPTED PERSON DETAILS','STATUS'];
        this.assetRequestTableHeaders=['FROM','TO','DATE AND TIME','NUMBER OF PEOPLE','ASSET TYPE','ASSET SENSITIVITY','ACCEPTED PERSON DETAILS','STATUS'];
        this.navigateTo=strings.navigatePageTo.homePage;
        this.init();
    }
    @action.bound
    init(){
        this.displayRequestType='ride';
        this.filter='SELECT';
        this.sortBy='SELECT';
        this.pageNumber=1;
        this.totalNumberOfPages=0;
        this.matchingRequestsFilter='RIDE'; //ALL RIDE ASSET
    }
    componentDidMount(){
        const {doNetWorkCallsForMyRequests,doNetWorkCallsForMatchingRequests}=this;
        doNetWorkCallsForMyRequests();
        doNetWorkCallsForMatchingRequests();
    }
    @action.bound
    async doNetWorkCallsForMyRequests(){
        const {commuteStore:{getMyRideRequests,getMyAssetRequests}}=this.props;
        const {authStore:{access_token}}=this.props;
        const {displayRequestType,filter,sortBy,limit,pageNumber}=this;
        let offset=(pageNumber-1)*this.limit;
        const dataToGetRequests={
            access_token:access_token,
            filterBy:filter,
            sortBy:sortBy,
            offset:offset,
            limit:limit
        };
        switch(displayRequestType){
            case 'ride':{
                await getMyRideRequests(dataToGetRequests);
                break;
            }
            case 'asset':{
                await getMyAssetRequests(dataToGetRequests);
                break;
            }
        }
    }
    @action.bound
    async doNetWorkCallsForMatchingRequests(){
        const {commuteStore:{getMatchingRideRequests,getMatchingAssetRequests,getAllMatchingRequests}}=this.props;
        const {authStore:{access_token}}=this.props;
        const {matchingRequestsFilter}=this;
        const dataToGetMatchingRequests={
            access_token:access_token,
            filter:matchingRequestsFilter
        }
        switch(matchingRequestsFilter){
            case 'RIDE':{
                await getMatchingRideRequests(dataToGetMatchingRequests);
                break;
            }
            case 'ASSETS':{
                await getMatchingAssetRequests(dataToGetMatchingRequests);
                break;
            }
            case 'ALL':{
                await getAllMatchingRequests(dataToGetMatchingRequests);
                break;
            }
        }
    }
    @action.bound
    getRequests(requestType){
        const {commuteStore:{requests,noOfRequests}
        }=this.props;
        this.totalNumberOfPages=Math.ceil(noOfRequests/this.limit);
        return requests;
    }
    @action.bound
    navigatePageTo(page){
        switch(page){
            case homePage:{
                this.navigateTo=homePage;
                break;
            }
            case rideRequest:{
                this.navigateTo=rideRequest;
                break;
            }
            case assetTranportRequest:{
                this.navigateTo=assetTranportRequest;
                break;
            }
            case shareRide:{
                this.navigateTo=shareRide;
                break;
            }
            case shareTravelInfo:{
                this.navigateTo=shareTravelInfo;
                break;
            }
            case userProfile:{
                this.navigateTo=userProfile;
            }
        }
    }
    onChangePageNumber=(event,data)=>{
        this.pageNumber=data.activePage;
        const {doNetWorkCallsForMyRequests}=this;
        doNetWorkCallsForMyRequests();
    }
    onClickRequestType=(requestType)=>{
        const {init}=this;
        init();
        this.displayRequestType=requestType;
        const {doNetWorkCallsForMyRequests}=this;
        doNetWorkCallsForMyRequests();
    }
    @action.bound
    onChangeSortBy(event){
        this.sortBy=event;
        const {doNetWorkCallsForMyRequests}=this;
        doNetWorkCallsForMyRequests();
    }
    @action.bound
    onChangeFilter(event){
        this.filter=event;
        const {doNetWorkCallsForMyRequests}=this;
        doNetWorkCallsForMyRequests();
    }
    @action.bound
    addRequestButton(requestType){
        const {navigatePageTo}=this;
        navigatePageTo(requestType==='ride'?'rideRequest':'assetTranportRequest');
    }
    @action.bound
    onChangeMatchingRequestsFilter(filterBy){
        this.matchingRequestsFilter=filterBy;
        const {doNetWorkCallsForMatchingRequests}=this;
        doNetWorkCallsForMatchingRequests();
    }
   @action.bound
   onClickSignOutButton=()=>{
       const {authStore:{userSignOut}}=this.props;
       userSignOut();
   }
    render(){
        const {onClickSignOutButton,
        limit,pageNumber,navigateTo,
        displayRequestType,
        onChangePageNumber,
        onClickRequestType,
        rideRequestTableHeaders,
        assetRequestTableHeaders,
        totalNumberOfPages,
        onChangeMatchingRequestsFilter,
            onChangeSortBy,
            onChangeFilter,
            navigatePageTo,
            addRequestButton,
            getRequests
        }=this;
        return (
            <DashBoard 
            limit={limit}
            pageNumber={pageNumber}
            displayRequestType={displayRequestType}
            navigateTo={navigateTo}
            rideRequestTableHeaders={rideRequestTableHeaders}
            assetRequestTableHeaders={assetRequestTableHeaders}
            
            onClickSignOutButton={onClickSignOutButton}
            
            getRequests={getRequests}
            onChangePageNumber={onChangePageNumber}
            onClickRequestType={onClickRequestType}
            onChangeSortBy={onChangeSortBy}
            onChangeFilter={onChangeFilter}
            navigatePageTo={navigatePageTo}
            addRequestButton={addRequestButton}
            totalNumberOfPages={totalNumberOfPages}
            
            onChangeMatchingRequestsFilter={onChangeMatchingRequestsFilter}
            />
            );
    }
}
export default withRouter(DashBoardRoute);