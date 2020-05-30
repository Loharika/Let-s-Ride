import React from 'react';
import {observer} from 'mobx-react';
import { Dropdown } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import {LogoImage} from '../../../Common/components';

import {UserProfileIcon} from './UserProfileIcon.js';

import {HeaderStyle,RiderInfo,LogoImageContainer,Shares,Requests} from './styledComponents.js';

@observer
class Header extends React.Component{
    onClickRide=(event,data)=>{
        const {navigatePageTo}=this.props;
        navigatePageTo(data.value);
    }
    onClickAssetRequest=(event,data)=>{
        const {navigatePageTo}=this.props;
        navigatePageTo(data.value);
    }
    onClickShareRide=(event,data)=>{
        const {navigatePageTo}=this.props;
        navigatePageTo(data.value);
    }
    onClickTravelInfo=(event,data)=>{
        const {navigatePageTo}=this.props;
        navigatePageTo(data.value);
    }
    render(){
    return (
        <HeaderStyle>
        <LogoImageContainer >
            <LogoImage />
        </LogoImageContainer>
            <RiderInfo>
            <Requests>
            <Dropdown text='Requests' closeOnEscape={true} >
                <Dropdown.Menu >
                  <Dropdown.Item text='Ride' value={'rideRequest'} onClick={this.onClickRide}/>
                  <Dropdown.Item text='Asset Transport' value={'assetTranportRequest'} onClick={this.onClickAssetRequest}/>
                </Dropdown.Menu>
              </Dropdown>
            </Requests>
            <Shares>
              <Dropdown text='Share' closeOnEscape={true} >
                <Dropdown.Menu >
                  <Dropdown.Item text='Ride' value={'shareRide'} onClick={this.onClickShareRide}/>
                  <Dropdown.Item text='Travel Info' value={'shareTravelInfo'} onClick={this.onClickTravelInfo}/>
                </Dropdown.Menu>
              </Dropdown>
              </Shares>
                <UserProfileIcon onClickUserProfile={this.props.onClickUserProfile}/>
            </RiderInfo>
        </HeaderStyle>
        );
}
}
export {Header};