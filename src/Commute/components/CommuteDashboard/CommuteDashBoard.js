import React from 'react';
import {observer,inject} from 'mobx-react';
import {observable,action} from 'mobx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {UserProfile} from '../../../Authentication/components/UserProfile';

import {MatchingRequests} from '../MatchingRequests';
import {ShowMyRequests} from '../ShowUserRequests';
import {RideRequest} from '../RideRequest';
import {AssetTransportRequest} from '../AssetTransportRequest';
import {ShareRide} from '../ShareRide';
import {TravelInfo} from '../TravelInfo';
import {Header} from '../Header/Header.js';
import {CommuteDashboardDisplay,AllRequests} from './styledComponents.js';


import strings from '../../i18n/strings.json';
const homePage=strings.navigatePageTo.homePage;
const rideRequest=strings.navigatePageTo.rideRequest;
const assetTranportRequest=strings.navigatePageTo.assetTranportRequest;
const shareRide=strings.navigatePageTo.shareRide;
const shareTravelInfo=strings.navigatePageTo.shareTravelInfo;
const userProfile=strings.navigatePageTo.userProfile;

toast.configure();

@inject('commuteStore')
@observer
class DashBoard extends React.Component{
     @observable navigateTo;
    constructor(){
        super();
        this.navigateTo=strings.navigatePageTo.homePage;
        
    }
    onClick=()=>{
        const {onClickSignOutButton}=this.props;
        onClickSignOutButton();
        /*toast(
            <UserProfile />
            , {
            position: toast.POSITION.TOP_CENTER,
            autoClose:5000,
            closeButton: true,
            hideProgressBar: true,
            
      });*/
    }
    renderPage=()=>{
        const {limit,onChangeFilter,onChangeSortBy,onChangePageNumber,pageNumber,displayRequestType,
        navigatePageTo,getRequests,totalNumberOfPages,doNetWorkCallsForMyRequests,
        onClickRequestType,addRequestButton,navigateTo,rideRequestTableHeaders,
        assetRequestTableHeaders}=this.props;
        
        const {doNetWorkCallsForMatchingRequests,
        onChangeMatchingRequestsFilter,
        getMatchingRequests}=this.props;
        
        const {commuteStore:{getMyRequestAPIError,
        getMyRequestAPIStatus,
        getMatchingRequestAPIStatus,
        getMatchingRequestAPIError}}=this.props;
        switch(navigateTo){
            case rideRequest:{
                    const {commuteStore:{postRideRequest}}=this.props;
                     return <RideRequest postRideRequest={postRideRequest}/>;
            }
            case assetTranportRequest:{
                const {commuteStore:{postAssetTransportRequest}}=this.props;
                return <AssetTransportRequest postAssetTransportRequest={postAssetTransportRequest}/>;
            }
            case shareRide:{
                const {commuteStore:{shareRideInfo:shareRideInfoDetails}}=this.props;
                return <ShareRide shareRideInfo={shareRideInfoDetails}/>;
            }
            case shareTravelInfo:{
                const {commuteStore:{shareTravelInfo:shareTravelInfoDetails}}=this.props;
                return <TravelInfo shareTravelInfo={shareTravelInfoDetails} />;
            }
            case userProfile:{
                
                return <UserProfile />;
            }
            case homePage:{
                
                return (
                <AllRequests>
                <MatchingRequests 
                getMatchingRequests={getMatchingRequests}
                onChangeMatchingRequestsFilter={onChangeMatchingRequestsFilter}
                getMatchingRequestAPIStatus={getMatchingRequestAPIStatus}
                getMatchingRequestAPIError={getMatchingRequestAPIError}
                doNetworkCalls={doNetWorkCallsForMatchingRequests}
                />
                <ShowMyRequests 
                        navigatePageTo={navigatePageTo}
                        doNetWorkCalls={doNetWorkCallsForMyRequests} 
                        
                        getAPIError={getMyRequestAPIError} 
                        getAPIStatus={getMyRequestAPIStatus}
                        getRequests={getRequests}
                        totalNumberOfPages={totalNumberOfPages}
                        onChangePageNumber={onChangePageNumber}
                        onClickRequestType={onClickRequestType}
                        onChangeSortBy={onChangeSortBy}
                        onChangeFilter={onChangeFilter}
                        
                        limit={limit}
                        pageNumber={pageNumber}
                        displayRequestType={displayRequestType}
                        rideRequestTableHeaders={rideRequestTableHeaders}
                        assetRequestTableHeaders={assetRequestTableHeaders}
                        addRequestButton={addRequestButton}/>

                        </AllRequests>)
            }
            
        }
    }
    @action.bound
    renderDashBoardUI(){
        const {navigatePageTo,navigateTo}=this.props;
        return (<CommuteDashboardDisplay key={Math.random()}>
                    <Header key={navigateTo} onClickUserProfile={this.onClick} 
                    navigatePageTo={navigatePageTo}/>
                    {this.renderPage()}
                </CommuteDashboardDisplay>);
    }
    render(){
        const {navigatePageTo,navigateTo}=this.props;
        return (
            <React.Fragment>
            <CommuteDashboardDisplay key={Math.random()}>
                    <Header key={navigateTo} onClickUserProfile={this.onClick} 
                    navigatePageTo={navigatePageTo}/>
                    {this.renderPage()}
                </CommuteDashboardDisplay>
            </React.Fragment>
            );
    }
}
export {DashBoard};
