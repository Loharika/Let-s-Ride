import React from 'react';
import {observer,inject} from 'mobx-react';
import {observable,action} from 'mobx'
import {Header} from './Header/Header.js';

import {RideRequestRoute} from '../routes/RideRequestRoute/RideRequestRoute.js';

import {AssetTransportRequestRoute} from '../routes/AssetTransportRequestRoute/AssetTransportRequestRoute.js';
import 'react-toastify/dist/ReactToastify.css';

import { toast } from 'react-toastify';
import { css } from 'glamor';

import {UserProfile} from '../../Authentication/components/UserProfile';

import {ShowMyRequestsRoute} from '../routes/ShowMyRequestsRoute/ShowMyRequestsRoute.js';
import {ShareRideRoute} from '../routes/ShareRideRoute/ShareRideRoute.js';

toast.configure();

@observer
class DashBoard extends React.Component{
     @observable navigateTo;
    constructor(){
        super();
        this.navigateTo='homePage';
        
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
            case 'homePage':{
                this.navigateTo='homePage';
                break;
            }
            case 'rideRequest':{
                this.navigateTo='rideRequest';
                break;
            }
            case 'assetTranportRequest':{
                this.navigateTo='assetTranportRequest';
                break;
            }
            case 'shareRide':{
                this.navigateTo='shareRide';
                break;
            }
            case 'shareAssetTransport':{
                this.navigateTo='shareAssetTransport';
                break;
            }
        }
    }
    renderPage=()=>{
        const {navigateTo}=this;
        switch(navigateTo){
            case 'rideRequest':{
                return <RideRequestRoute />;
            }
            case 'assetTranportRequest':{
                return <AssetTransportRequestRoute />;
            }
            case 'userProfile':{
                return <UserProfile />;
            }
            case 'homePage':{
                return <ShowMyRequestsRoute />
            }
            case 'shareRide':{
                return <ShareRideRoute />
            }
        }
    }
    render(){
        return (
            <div className='flex flex-col' key={Math.random()}>
                    <Header key={this.navigateTo} onClickUserProfile={this.onClick} 
                    navigatePageTo={this.navigatePageTo}/>
                    {this.renderPage()}
                    
            </div>
            );
    }
}
export {DashBoard};

// <RideRequest />