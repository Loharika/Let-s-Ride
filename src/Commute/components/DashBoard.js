import React from 'react';
import {observer,inject} from 'mobx-react';
import {Header} from './Header/Header.js';
import {RideRequest} from './RideRequest/RideRequest.js';
import {AssetTransportRequest} from './AssetTransportRequest/AssetTransportRequest.js';
import 'react-toastify/dist/ReactToastify.css';

import { toast } from 'react-toastify';
import { css } from 'glamor';

import {UserProfile} from '../../Authentication/components/UserProfile';

toast.configure();

@inject('authStore')
@observer
class DashBoard extends React.Component{
    constructor(){
        super();
    }
    onClick=()=>{
        toast(
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
            
      });
    }
    render(){
        return (
            <div>
                    <Header onClickUserProfile={this.onClick}/>
                    <AssetTransportRequest />
                    <RideRequest />
                    
            </div>
            );
    }
}
export {DashBoard};

// <RideRequest />