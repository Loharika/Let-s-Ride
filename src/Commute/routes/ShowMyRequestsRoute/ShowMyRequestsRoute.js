
import React from 'react';
import {observable,action} from 'mobx';
import {observer,inject} from 'mobx-react';
import {withRouter} from 'react-router-dom';

import {ShowMyRequests} from '../../components/ShowUserRequests/ShowMyRequests.js';


@inject('commuteStore')
@observer
class ShowMyRequestsRoute extends React.Component{
    constructor(){
        super();
        
    }
    @action.bound
    doNetWorkCalls(){
        const {commuteStore:{postRideRequest}}=this.props;
        postRideRequest();
    }
    componentDidMount(){
        const {doNetWorkCalls}=this;
        doNetWorkCalls();
    }
    @action.bound
    getRideRequests(){
        const {commuteStore:{allRequestData}}=this.props;
        return allRequestData.filter(request=>request.hasOwnProperty('noOfLuggages'));
    }
    @action.bound
    getAssetRequests(){
        const {commuteStore:{allRequestData}}=this.props;
        return allRequestData.filter(request=>request.hasOwnProperty('assetType'));
    }
   
    render(){
        const {commuteStore:{allRequestData}}=this.props;
        const {getRideRequests,getAssetRequests}=this;
        return (
            <ShowMyRequests requests={allRequestData} getRideRequests={getRideRequests} getAssetRequests={getAssetRequests}/>
            );
    }
}
export {ShowMyRequestsRoute};