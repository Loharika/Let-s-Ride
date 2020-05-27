import React from 'react';
import {Header} from './Header/Header.js';
import {RideRequest} from './RideRequest/RideRequest.js';
import {AssetTransportRequest} from './AssetTransportRequest/AssetTransportRequest.js';
class DashBoard extends React.Component{
    constructor(){
        super();
    }
    render(){
        return (
            <div>
                    <Header />
                    <AssetTransportRequest />
                    <RideRequest />
                    
            </div>
            );
    }
}
export {DashBoard};

// <RideRequest />