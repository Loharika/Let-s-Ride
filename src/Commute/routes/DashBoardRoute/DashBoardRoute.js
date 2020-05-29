
import React from 'react';
import {observable,action} from 'mobx';
import {observer,inject} from 'mobx-react';
import {withRouter} from 'react-router-dom';
import {DashBoard} from '../../components/DashBoard.js';


@inject('commuteStore','authStore')
@observer
class DashBoardRoute extends React.Component{
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
   onClickSignOutButton=()=>{
       const {authStore:{userSignOut}}=this.props;
       userSignOut();
   }
    render(){
        const {onClickSignOutButton}=this;
        return (
            <DashBoard onClickSignOutButton={onClickSignOutButton}/>
            );
    }
}
export default withRouter(DashBoardRoute);