import {action} from 'mobx';
import {create} from 'apisauce';

import allRequestData from '../../fixtures/allRequests.fixture.json';

class CommuteService{
   
    constructor(){
          
    }
    @action
    rideRequestAPI(requestData){
        console.log(requestData);
        //rideRequest
        return new Promise((resolve)=>{
            resolve('rideRequest')
        })
        
    }
    @action.bound
    assetTransportRequestAPI(requestData){
        console.log(requestData);
        //assetTransportRequest
        return new Promise((resolve)=>{
            resolve("assetTransportRequest")
        })
    }
    @action.bound
    myRequestsAPI(details){
        console.log(details);
        //myRequests
        return new Promise((resolve)=>{
            setTimeout(()=>{
                resolve(allRequestData);
            },3000);
        })
    }
    
}
export {CommuteService};