import {action} from 'mobx';
import {create} from 'apisauce';

import {networkCallWithApisauce} from '../../../utils/APIUtils';
import {apiMethods} from '../../../constants/APIConstants';

import {endPoints} from '../endPoints';

class CommuteService{
    rideRequestApi;
    assetTransportRequestApi;
    myRequestsApi;
    constructor(){
         this.rideRequestApi=create({
            baseURL:'https://9ba0cd3ggi.execute-api.ap-south-1.amazonaws.com/',
         });
         this.assetTransportRequestApi=create({
            baseURL:'__',
         });
        this.myRequestsApi=create({
            baseURL:'__',
         });    
    }
    @action
    rideRequestAPI(requestData){
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
    assetTransportRequestAPI(requestData){
        console.log(requestData);
        //assetTransportRequest
        
        return networkCallWithApisauce(
            this.assetTransportRequestApi,
            '__',
            {},
            apiMethods.post
            );
    }
    @action.bound
    myRequestsAPI(details){
        console.log(details);
        //myRequests
        
        return networkCallWithApisauce(
            this.myRequestsApi,
            '__',
            {},
            apiMethods.get
            );
    }
    
}
export {CommuteService};