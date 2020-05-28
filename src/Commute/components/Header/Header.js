import React from 'react';
import {observer} from 'mobx-react';
import {LogoImage} from '../../../Common/components';
import {RiderRequestsInfo} from './RiderRequestsInfo.js';
import {RiderShareInfo} from './RiderShareInfo.js';
import {UserProfileIcon} from './UserProfileIcon.js';
import {HeaderStyle,RiderInfo,LogoImageContainer} from './styledComponents.js';

@observer
class Header extends React.Component{
    render(){
    return (
        <HeaderStyle>
        <LogoImageContainer >
            <LogoImage />
        </LogoImageContainer>
            <RiderInfo>
                <RiderRequestsInfo navigatePageTo={this.props.navigatePageTo}/>
                <RiderShareInfo navigatePageTo={this.props.navigatePageTo}/>
                <UserProfileIcon onClickUserProfile={this.props.onClickUserProfile}/>
            </RiderInfo>
        </HeaderStyle>
        );
}
}
export {Header};