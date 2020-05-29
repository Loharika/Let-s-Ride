import {observable,action,computed} from 'mobx';
import {bindPromiseWithOnSuccess} from '@ib/mobx-promise';
import {API_INITIAL} from '@ib/api-constants';
import rideRequestsData from '../../fixtures/rideRequests.fixture.json';
import assetsRequestData from '../../fixtures/assetRequests.fixture.json';
import allRequestData from '../../fixtures/allRequests.fixture.json';

class CommuteStore {
    @observable getRequestAPIStatus;
    @observable getRequestAPIError;
    @observable getRequestResponse;
    @observable requests;
    commuteService
    constructor(commuteService){
        this.commuteService=commuteService;
        this.rideRequests=rideRequestsData;
        this.assetsRequests=assetsRequestData;
        this.allRequestData=allRequestData;
        this.intialiseRequestAPI();
    }
    @action.bound
    intialiseRequestAPI(){
        this.getRequestAPIStatus=API_INITIAL;
        this.getRequestAPIError=null;
        this.getRequestAPIResponse='';
    }
    @action.bound
    postRideRequest(){
        
        let rideRequestPromise=this.commuteService.postRideRequest({name:'rideRequest',id:'Ride'});
        // return bindPromiseWithOnSuccess(rideRequestPromise).
        // to(this.setGetRequestAPIStatus,this.setGetRequestAPIRResponse).
        // catch(this.setGetRequestAPIError);
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