import React from 'react';
import {Header} from './Header/Header.js';
import {RideRequest} from './RideRequest/RideRequest.js';

class DashBoard extends React.Component{
    constructor(){
        super();
    }
    render(){
        return (
            <div>
                    <Header />
                    <RideRequest />
            </div>
            );
    }
}
export {DashBoard};

// <RideRequest />