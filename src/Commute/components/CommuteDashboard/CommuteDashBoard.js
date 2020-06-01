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
            className: css({
            backgroundColor:'#d69e2e',
            color:'red',
            width:'auto'
          }),
            position: toast.POSITION.TOP_CENTER,
            autoClose:5000,
            closeButton: true,
            hideProgressBar: true,
            
      });*/
    }
    /* @action.bound
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
    }*/
    renderPage=()=>{
        const {limit,onChangeFilter,onChangeSortBy,onChangePageNumber,pageNumber,displayRequestType,
        navigatePageTo,getRequests,totalNumberOfPages,doNetworkCalls,onChangeMatchingRequestsFilter,
        onClickRequestType,addRequestButton,navigateTo,rideRequestTableHeaders,assetRequestTableHeaders}=this.props;
        const {commuteStore:{getMyRequestAPIError,getMyRequestAPIStatus,postRideRequest,postAssetTransportRequest,shareRideInfo,shareTravelInfo:shareRideInfoDetails,}}=this.props;
        switch(navigateTo){
            case rideRequest:{
                     return <RideRequest postRideRequest={postRideRequest}/>;
            }
            case assetTranportRequest:{
                return <AssetTransportRequest postAssetTransportRequest={postAssetTransportRequest}/>;
            }
            case shareRide:{
                return <ShareRide shareRideInfo={shareRideInfo}/>;
            }
            case shareTravelInfo:{
                return <TravelInfo shareTravelInfo={shareRideInfoDetails} />;
            }
            case userProfile:{
                return <UserProfile />;
            }
            case homePage:{
                
                return (
                <AllRequests>
                <MatchingRequests onChangeMatchingRequestsFilter={onChangeMatchingRequestsFilter} />
                <ShowMyRequests 
                        navigatePageTo={navigatePageTo}
                        doNetWorkCalls={doNetworkCalls} 
                        
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
                {/*<LoadingWrapperWithFailure key={this.navigateTo} apiStatus={getAPIStatus} apiError={getAPIError} 
                            onRetryClick={doNetworkCalls} renderSuccessUI={renderDashBoardUI} 
                        />*/}
            </React.Fragment>
            );
    }
}
export {DashBoard};
