import {observable,action,computed} from 'mobx';
import {bindPromiseWithOnSuccess} from '@ib/mobx-promise';
import {API_INITIAL} from '@ib/api-constants';

import allRequestData from '../../fixtures/allRequests.fixture.json';

class CommuteStore {
    @observable getRequestAPIStatus;
    @observable getRequestAPIError;
    @observable getRequestResponse;
    @observable requests;
    commuteService
    constructor(commuteService){
        this.commuteService=commuteService;
        this.allRequestData=allRequestData;
        this.intialiseRequestAPI(commuteService);
    }
    @action.bound
    intialiseRequestAPI(commuteService){
        this.getRequestAPIStatus=API_INITIAL;
        this.getRequestAPIError=null;
        this.getRequestAPIResponse=commuteService;
    }
    @action.bound
    postRideRequest(rideRequest){
        
        let rideRequestPromise=this.commuteService.postRideRequest(rideRequest);
         return bindPromiseWithOnSuccess(rideRequestPromise).
         to(this.setGetRequestAPIStatus,this.setGetRequestAPIRResponse).
         catch(this.setGetRequestAPIError);
    }
    @action.bound
    postAssetTransportRequest(){
        let assetRequestPromise=this.commuteService.postAssetTransportRequest({name:'assetRequest',id:'Asset'});
        // return bindPromiseWithOnSuccess(assetRequestPromise).
        // to(this.setGetRequestAPIStatus,this.setGetRequestAPIRResponse).
        // catch(this.setGetRequestAPIError);
    }
    @action.bound
    setGetRequestAPIStatus(apiStatus){
        this.getRequestAPIStatus=apiStatus;
    }
    @action.bound
    setGetRequestAPIError(apiError){
        this.getRequestAPIError=apiError;
    }
    @action.bound
    setGetRequestAPIRResponse(apiResponse){
        this.getRequestAPIResponse=apiResponse;
        
    }
    @action.bound
    clearRequestAPI(){
        this.intialiseRequestAPI();
    }
}
export {CommuteStore};