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
            baseURL:'__',
         });
         this.assetTransportRequestApi=create({
            baseURL:'__',
         });
    }
    @action.bound
    postRideRequest(requestData){
        console.log(requestData);
        
        //rideRequest
        // return networkCallWithApisauce(
        //     this.rideRequestApi,
        //     '__',
        //     {},
        //     apiMethods.post
        //     );
    }
    @action.bound
    postAssetTransportRequest(requestData){
        console.log(requestData);
        //assetTransportRequest
        // return networkCallWithApisauce(
        //     this.assetTransportRequestApi,
        //     '__',
        //     {},
        //     apiMethods.post
        //     );
    }
    
}
export {CommuteService};