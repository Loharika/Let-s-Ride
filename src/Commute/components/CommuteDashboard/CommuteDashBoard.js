import React from 'react';
import {observer} from 'mobx-react';
import {observable,action} from 'mobx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoadingWrapperWithFailure from '../../../components/common/LoadingWrapperWithFailure';
import {UserProfile} from '../../../Authentication/components/UserProfile';

import {ShowMyRequestsRoute} from '../../routes/ShowMyRequestsRoute/ShowMyRequestsRoute.js';
import {RideRequest} from '../RideRequest';
import {AssetTransportRequest} from '../AssetTransportRequest';
import {ShareRide} from '../ShareRide';
import {TravelInfo} from '../TravelInfo';
import {Header} from '../Header/Header.js';
import {CommuteDashboardDisplay} from './styledComponents.js';

import strings from '../../i18n/strings.json';
const homePage=strings.navigatePageTo.homePage;
const rideRequest=strings.navigatePageTo.rideRequest;
const assetTranportRequest=strings.navigatePageTo.assetTranportRequest;
const shareRide=strings.navigatePageTo.shareRide;
const shareTravelInfo=strings.navigatePageTo.shareTravelInfo;
const userProfile=strings.navigatePageTo.userProfile;

toast.configure();

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
    renderPage=()=>{
        const {postAssetTransportRequest,postRideRequest,getAPIError,getAPIStatus,doNetworkCalls}=this.props;
        const {navigateTo}=this;
       
        switch(navigateTo){
            case rideRequest:{
                     return <RideRequest postRideRequest={postRideRequest}/>;
            }
            case assetTranportRequest:{
                return <AssetTransportRequest postAssetTransportRequest={postAssetTransportRequest}/>;
            }
            case userProfile:{
                return <UserProfile />;
            }
            case homePage:{
                return <ShowMyRequestsRoute 
                navigatePageTo={this.navigatePageTo}
                doNetWorkCalls={doNetworkCalls} 
                getAPIError={getAPIError} 
                getAPIStatus={getAPIStatus}
                />;
            }
            case shareRide:{
                return <ShareRide />;
            }
            case shareTravelInfo:{
                return <TravelInfo />;
            }
        }
    }
    @action.bound
    renderDashBoardUI(){
        return (<CommuteDashboardDisplay key={Math.random()}>
                    <Header key={this.navigateTo} onClickUserProfile={this.onClick} 
                    navigatePageTo={this.navigatePageTo}/>
                    {this.renderPage()}
                </CommuteDashboardDisplay>);
    }
    render(){
        const {renderDashBoardUI}=this;
        const {getAPIStatus,getAPIError,doNetworkCalls}=this.props;
        
        return (
            <React.Fragment>
            <CommuteDashboardDisplay key={Math.random()}>
                    <Header key={this.navigateTo} onClickUserProfile={this.onClick} 
                    navigatePageTo={this.navigatePageTo}/>
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
