import React from 'react';
import {observable,action} from 'mobx';
import {observer} from 'mobx-react';
import {FiChevronDown,FiChevronUp} from 'react-icons/fi';

import strings from '../../i18n/strings';

import {RequestButton,RequestsDropdown,RiderRequestsView,ButtonText,Request} from './styledComponents.js';


@observer
class RiderRequestsInfo extends React.Component{
    @observable isRequestsView;
    constructor(){
        super();
        this.isRequestsView=false;
    }
    @action.bound
    onClickRequest(){
        this.isRequestsView=!this.isRequestsView;
    }
    render(){
        const {navigatePageTo}=this.props;
        return (
        <RequestsDropdown>
          <RequestButton onClick={this.onClickRequest}>
          <ButtonText>{strings.text.requests}</ButtonText>{this.isRequestsView?<FiChevronDown />:<FiChevronUp />}
          </RequestButton>
          <RiderRequestsView isRequestsView={this.isRequestsView}>
            <RequestButton onClick={()=>navigatePageTo('rideRequest')}><Request>{strings.text.ride}</Request></RequestButton>
            <RequestButton onClick={()=>navigatePageTo('assetTranportRequest')}><Request>{strings.text.assetTranport}</Request></RequestButton>
          </RiderRequestsView>
        </RequestsDropdown> 
        )
    }
    
}
export {RiderRequestsInfo};