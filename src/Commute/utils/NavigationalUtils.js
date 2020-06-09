

import {COMMUTE_DASHBOARD_HOME_PAGE,
    COMMUTE_DASHBOARD_RIDE_REQUEST,
    COMMUTE_DASHBOARD_ASSET_REQUEST,
    COMMUTE_DASHBOARD_SHARE_RIDE,
    COMMUTE_DASHBOARD_SHARE_TRAVEL_INFO,
    COMMUTE_DASHBOARD_USERPROFILE
} from '../constants/NavigationalConstants.js';

export const goToRideRequestPage=(history)=>{
    history.push(COMMUTE_DASHBOARD_RIDE_REQUEST);
}
export const goToAssetRequestPage=(history)=>{
    history.push(COMMUTE_DASHBOARD_ASSET_REQUEST);
}
export const goToShareRidePage=(history)=>{
    history.push(COMMUTE_DASHBOARD_SHARE_RIDE);
}
export const goToTravelInfoPage=(history)=>{
    history.push(COMMUTE_DASHBOARD_SHARE_TRAVEL_INFO);
}
export const goToUserProfilePage=(history)=>{
    history.push(COMMUTE_DASHBOARD_USERPROFILE);
}
export const goToHomePage=(history)=>{
    history.push(COMMUTE_DASHBOARD_HOME_PAGE);
}
