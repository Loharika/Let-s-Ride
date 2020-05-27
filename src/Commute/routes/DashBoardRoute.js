
import React from 'react';
import {withRouter} from 'react-router-dom';
import {DashBoard} from '../components/DashBoard.js';

class DashBoardRoute extends React.Component{
    constructor(){
        super();
        
    }
    render(){
        return (
            <DashBoard />
            );
    }
}
export default withRouter(DashBoardRoute);