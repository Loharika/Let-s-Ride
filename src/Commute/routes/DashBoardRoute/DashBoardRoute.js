
import React from 'react';
import {observable,action} from 'mobx';
import {observer,inject} from 'mobx-react';
import {withRouter} from 'react-router-dom';
import {DashBoard} from '../../components/DashBoard.js';


@inject('commuteStore')
@observer
class DashBoardRoute extends React.Component{
    @observable navigateTo;
    constructor(){
        super();
        this.navigateTo='homePage';
        
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
   
    render(){
        return (
            <DashBoard />
            );
    }
}
export default withRouter(DashBoardRoute);