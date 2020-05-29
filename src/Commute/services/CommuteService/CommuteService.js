import {action} from 'mobx';
import {create} from 'apisauce';

import {networkCallWithApisauce} from '../../../utils/APIUtils';
import {apiMethods} from '../../../constants/APIConstants';

import {endPoints} from '../endPoints';

class CommuteService{
    rideRequestApi;
    assetTransportRequestApi;
    constructor(){
         this.rideRequestApi=create({
            baseURL:'https://9ba0cd3ggi.execute-api.ap-south-1.amazonaws.com/',
         });
         this.assetTransportRequestApi=create({
            baseURL:'__',
         });
    }
    @action
    postRideRequest(requestData){
        console.log(requestData);
        
        //rideRequest
        return networkCallWithApisauce(
            this.rideRequestApi,
            'v1/rideRequest/',
            {},
            apiMethods.post
            );
    }
    @action.bound
    postAssetTransportRequest(requestData){
        console.log(requestData);
        //assetTransportRequest
        
        return networkCallWithApisauce(
            this.assetTransportRequestApi,
            '__',
            {},
            apiMethods.post
            );
    }
    
}
export {CommuteService};