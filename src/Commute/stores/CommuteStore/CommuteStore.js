import {observable,action} from 'mobx';
import {bindPromiseWithOnSuccess} from '@ib/mobx-promise';
import {API_INITIAL} from '@ib/api-constants';

import allRequestData from '../../fixtures/allRequests.fixture.json';

class CommuteStore {
    @observable getAPIStatus;
    @observable getAPIError;
    @observable getRequestAPIResponse;
    @observable getMyRequestsAPIResponse;
    @observable requests;
    @observable allRequestData;
    commuteService
    constructor(commuteService){
        this.commuteService=commuteService;
        this.getMyRequestsAPIResponse='';
        this.allRequestData=[];
        this.init(commuteService);
        
    }
    @action.bound
    init(commuteService){
        this.getAPIStatus=API_INITIAL;
        this.getAPIError=null;
        this.getRequestAPIResponse=commuteService;
        this.getMyRequestsAPIResponse=[];
    }
    @action.bound
    postRideRequest(rideRequest){
        this.init();
        // calling intit before going to post to clear API STATUS
        let rideRequestPromise=this.commuteService.rideRequestAPI(rideRequest);
         return bindPromiseWithOnSuccess(rideRequestPromise).
         to(this.setGetAPIStatus,this.setGetRequestAPIRResponse).
         catch(this.setGetAPIError);
    }
    @action.bound
    postAssetTransportRequest(rideRequest){
        this.init();
        // calling intit before going to post to clear API STATUS
        let assetRequestPromise=this.commuteService.assetTransportRequestAPI(rideRequest);
        return bindPromiseWithOnSuccess(assetRequestPromise).
        to(this.setGetAPIStatus,this.setGetRequestAPIRResponse).
        catch(this.setGetAPIError);
    }
    @action.bound
    getMyRequests(details){
        this.init();
        // calling intit before going to post to clear API STATUS
        let assetRequestPromise=this.commuteService.myRequestsAPI(details);
        return bindPromiseWithOnSuccess(assetRequestPromise).
        to(this.setGetAPIStatus,this.setGetMyRequestAPIRResponse).
        catch(this.setGetAPIError);
    }
    @action.bound
    setGetAPIStatus(apiStatus){
        this.getAPIStatus=apiStatus;
    }
    @action.bound
    setGetAPIError(apiError){
        this.getAPIError=apiError;
    }
    @action.bound
    setGetRequestAPIRResponse(apiResponse){
        this.getRequestAPIResponse=apiResponse;
        console.log(apiResponse);
    }
    @action.bound
    setGetMyRequestAPIRResponse(apiResponse){
        this.getMyRequestsAPIResponse=apiResponse;
        this.allRequestData=apiResponse;
    }
    @action.bound
    clearRequestAPI(){
        this.init();
    }
}
export {CommuteStore};