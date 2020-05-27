import React from 'react';
import {observable,action} from 'mobx';
import {observer} from 'mobx-react';
import {FiChevronDown,FiChevronUp} from 'react-icons/fi';

import strings from '../../i18n/strings';
import {RequestButton as ShareButton,RequestsDropdown as ShareInfoDropDown,RiderRequestsView,ButtonText,Request as Share} from './styledComponents.js';



@observer
class RiderShareInfo extends React.Component{
    @observable isShareInfoView;
    constructor(){
        super();
        this.isShareInfoView=false;
    }
    @action.bound
    onClickShare(){
        this.isShareInfoView=!this.isShareInfoView;
    }
    render(){
        return (
        <ShareInfoDropDown>
          <ShareButton onClick={this.onClickShare}><ButtonText>{strings.share}</ButtonText>{this.isShareInfoView?<FiChevronDown />:<FiChevronUp />}</ShareButton>
          <RiderRequestsView isRequestsView={this.isShareInfoView}>
            <ShareButton><Share>{strings.ride}</Share></ShareButton>
            <ShareButton><Share>{strings.travelInfo}</Share></ShareButton>
          </RiderRequestsView>
        </ShareInfoDropDown> 
        )
    }
    
}
export {RiderShareInfo};