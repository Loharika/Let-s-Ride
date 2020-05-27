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
        return (
        <RequestsDropdown>
          <RequestButton onClick={this.onClickRequest}>
          <ButtonText>{strings.requests}</ButtonText>{this.isRequestsView?<FiChevronDown />:<FiChevronUp />}
          </RequestButton>
          <RiderRequestsView isRequestsView={this.isRequestsView}>
            <RequestButton><Request>{strings.ride}</Request></RequestButton>
            <RequestButton><Request>{strings.assetTranport}</Request></RequestButton>
          </RiderRequestsView>
        </RequestsDropdown> 
        )
    }
    
}
export {RiderRequestsInfo};