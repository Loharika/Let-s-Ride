
import React from 'react';
import {observable,action} from 'mobx';
import {observer,inject} from 'mobx-react';
import {withRouter} from 'react-router-dom';
import {DashBoard} from '../../components/DashBoard.js';


@inject('commuteStore','authStore')
@observer
class DashBoardRoute extends React.Component{
    @action.bound
    async doNetWorkCalls(){
        const {commuteStore:{getMyRequests}}=this.props;
        const {authStore:{authAPIService}}=this.props;
        await getMyRequests(authAPIService);
    }
    componentDidMount(){
        const {doNetWorkCalls}=this;
        doNetWorkCalls();
    }
   @action.bound
   onClickSignOutButton=()=>{
       const {authStore:{userSignOut}}=this.props;
       userSignOut();
   }
    render(){
        const {onClickSignOutButton,doNetWorkCalls}=this;
        const {commuteStore:{getAPIError,getAPIStatus}}=this.props;
     
        return (
            <DashBoard onClickSignOutButton={onClickSignOutButton}
            doNetWorkCalls={doNetWorkCalls} 
            getAPIError={getAPIError} 
            getAPIStatus={getAPIStatus}/>
            );
    }
}
export default withRouter(DashBoardRoute);