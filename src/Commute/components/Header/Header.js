
import React from 'react'
import { observer,inject } from 'mobx-react'
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import {FaUserCircle} from 'react-icons/fa';
import { LogoImage } from '../Common/components'

import { Button } from '../Common/components/Button.js'

import { UserProfileIcon } from './UserProfileIcon.js'

import {
   HeaderStyle,
   RiderInfo,
   LogoImageContainer,
   Shares,
   Requests,
   SignOutButton,
   ProfileAndSignOut,
   UserProfile
} from './styledComponents.js'

@inject('authStore')
@observer
class Header extends React.Component {
   onClickRide = (event, data) => {
      const {history}=this.props;
      history.push('/commute-dashboard/ride-request');
   }
   onClickAssetRequest = (event, data) => {
      const {history}=this.props;
      history.push('/commute-dashboard/asset-transport-request');
   }
   onClickShareRide = (event, data) => {
      const {history}=this.props;
      history.push('/commute-dashboard/share-ride');
   }
   onClickTravelInfo = (event, data) => {
      const {history}=this.props;
      history.push('/commute-dashboard/share-travelInfo');
   }
   onClickUserProfile=()=>{
      
      const {history}=this.props;
      history.push('/commute-dashboard/user-profile');
   }
   onClickSignOut=()=>{
      const {authStore:{userSignOut}}=this.props;
      userSignOut();
   }
   render() {
      const {onClickSignOut,onClickUserProfile}=this;
      return (
         <HeaderStyle>
            <LogoImageContainer>
               <LogoImage />
            </LogoImageContainer>
            <RiderInfo>
               <Requests>
                  <Dropdown text='Requests' closeOnEscape={true}>
                     <Dropdown.Menu>
                        <Dropdown.Item
                           text='Ride'
                           value={'rideRequest'}
                           onClick={this.onClickRide}
                        />
                        <Dropdown.Item
                           text='Asset Transport'
                           value={'assetTranportRequest'}
                           onClick={this.onClickAssetRequest}
                        />
                     </Dropdown.Menu>
                  </Dropdown>
               </Requests>
               <Shares>
                  <Dropdown text='Share' closeOnEscape={true}>
                     <Dropdown.Menu>
                        <Dropdown.Item
                           text='Ride'
                           value={'shareRide'}
                           onClick={this.onClickShareRide}
                        />
                        <Dropdown.Item
                           text='Travel Info'
                           value={'shareTravelInfo'}
                           onClick={this.onClickTravelInfo}
                        />
                     </Dropdown.Menu>
                  </Dropdown>
               </Shares>
               <ProfileAndSignOut>
               
               
               <Dropdown closeOnEscape={true} icon={<UserProfile src='https://www.logolynx.com/images/logolynx/b4/b4ef8b89b08d503b37f526bca624c19a.jpeg' alt={'userImage'}/>}>
                     <Dropdown.Menu>
                        <Dropdown.Item
                           text='Edit Profile'
                           value={'editProfile'}
                           onClick={onClickUserProfile}/>
                        <Dropdown.Item
                           text='Sign Out'
                           value={'signOut'}
                           onClick={onClickSignOut}
                        />
                     </Dropdown.Menu>
                  </Dropdown>
               </ProfileAndSignOut>
            </RiderInfo>
         </HeaderStyle>
      )
   }
}
export { Header }

//<FaUserCircle />

//