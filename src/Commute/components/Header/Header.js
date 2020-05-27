import React from 'react';
import {LogoImage} from '../../../Common/components';
import {RiderRequestsInfo} from './RiderRequestsInfo.js';
import {RiderShareInfo} from './RiderShareInfo.js';
import {UserProfileIcon} from './UserProfileIcon.js';
import {HeaderStyle,RiderInfo,LogoImageContainer} from './styledComponents.js';
function Header(props){
    return (
        <HeaderStyle>
        <LogoImageContainer >
            <LogoImage />
        </LogoImageContainer>
            <RiderInfo>
                <RiderRequestsInfo/>
                <RiderShareInfo />
                <UserProfileIcon onClickUserProfile={props.onClickUserProfile}/>
            </RiderInfo>
        </HeaderStyle>
        );
}
export {Header};