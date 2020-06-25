import React, { ReactComponentElement } from 'react'
import { observer, inject } from 'mobx-react'
import {RouteComponentProps,withRouter} from 'react-router-dom'
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import {
   goToRideRequestPage,
   goToAssetRequestPage,
   goToShareRidePage,
   goToTravelInfoPage,
   goToUserProfilePage,
   goToMatchingResultsPage
} from '../../utils/NavigationalUtils'

import { LogoImage } from '../Common/components'

import {
   HeaderStyle,
   RiderInfo,
   LogoImageContainer,
   Shares,
   Requests,
   ProfileAndSignOut,
   UserProfile,
   HomePage
} from './styledComponents'
import { AuthStore } from "../../../Authentication/stores/index"
import { CommuteStore } from "../../stores/CommuteStore/index"

interface HeaderProps extends RouteComponentProps{

 }

interface InjectedProps extends HeaderProps {
  authStore: AuthStore,
  commuteStore:CommuteStore,
}
@inject('authStore', 'commuteStore')
@observer
class Header extends React.Component<HeaderProps>{
   getInjectedProps=()=>this.props as InjectedProps
   onClickRide = () => {
      const { history } = this.getInjectedProps();
      goToRideRequestPage(history)
   }
   onClickAssetRequest = () => {
      const { history } = this.getInjectedProps();
      goToAssetRequestPage(history)
   }
   onClickShareRide = () => {
      const { history } = this.getInjectedProps();
      goToShareRidePage(history)
   }
   onClickTravelInfo = (event, data) => {
      const { history } = this.getInjectedProps();
      goToTravelInfoPage(history)
   }
   onClickUserProfile = () => {
      const { history } = this.getInjectedProps();
      goToUserProfilePage(history)
   }
   onClickSignOut = () => {
      const {
         authStore: { userSignOut }
      } = this.getInjectedProps();
      userSignOut()
   }
   onClickHomeButton = () => {
      const { history } = this.props
      const {
         commuteStore: { onChangeSelectedPage }
      } = this.getInjectedProps();
      onChangeSelectedPage('/home/matched-requests')
      goToMatchingResultsPage(history)
   }
   render() {
      const {
         onClickSignOut,
         onClickUserProfile,
         onClickHomeButton,
         onClickRide,
         onClickAssetRequest,
         onClickShareRide,
         onClickTravelInfo
      } = this
      return (
         <HeaderStyle>
            <LogoImageContainer>
               <LogoImage />
            </LogoImageContainer>
            <RiderInfo>
               <HomePage onClick={onClickHomeButton}>Home</HomePage>
               <Requests>
                  <Dropdown
                     text='Requests'
                     data-testid={'Requests'}
                     closeOnEscape={true}
                  >
                     <Dropdown.Menu>
                        <Dropdown.Item
                           text='Ride'
                           value={'rideRequest'}
                           onClick={onClickRide}
                           data-testid='rideRequest'
                        />
                        <Dropdown.Item
                           text='Asset Transport'
                           value={'assetTranportRequest'}
                           onClick={onClickAssetRequest}
                           data-testid='assetTranportRequest'
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
                           onClick={onClickShareRide}
                           data-testid={'share-ride-button'}
                        />
                        <Dropdown.Item
                           text='Travel Info'
                           value={'shareTravelInfo'}
                           onClick={onClickTravelInfo}
                           data-testid={'share-travelInfo-button'}
                        />
                     </Dropdown.Menu>
                  </Dropdown>
               </Shares>
               <ProfileAndSignOut>
                  <Dropdown
                     closeOnEscape={true}
                     icon={
                        <UserProfile
                           src='https://www.logolynx.com/images/logolynx/b4/b4ef8b89b08d503b37f526bca624c19a.jpeg'
                           alt={'userImage'}
                        />
                     }
                  >
                     <Dropdown.Menu>
                        <Dropdown.Item
                           text='Edit Profile'
                           value={'editProfile'}
                           onClick={onClickUserProfile}
                           data-testid={'user-profile'}
                        />
                        <Dropdown.Item
                           text='Sign Out'
                           value={'signOut'}
                           onClick={onClickSignOut}
                           data-testid={'signout-button'}
                        />
                     </Dropdown.Menu>
                  </Dropdown>
               </ProfileAndSignOut>
            </RiderInfo>
         </HeaderStyle>
      )
   }
}
export default withRouter(Header)
