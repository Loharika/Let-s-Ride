import {observable,action} from 'mobx';
import {bindPromiseWithOnSuccess} from '@ib/mobx-promise';
import {API_INITIAL} from '@ib/api-constants';
const assetType={listTitle:'ASSET TYPE',
            listItems:[{
                        key: 'Parcel',
                        text: 'Parcel',
                        value: 'Parcel',
                      },
                      {
                        key: 'Bags',
                        text: 'Bags',
                        value: 'Bags',
                      },
                      {
                        key: 'Others',
                        text: 'Others',
                        value: 'Others',
                      },],
            placeholder:'Select Asset Type'
        };
        const assetSensitivity={listTitle:'ASSET SENSITIVITY',
            listItems:[{
                        key: 'Normal',
                        text: 'Normal',
                        value: 'Normal',
                      },
                      {
                        key: 'Sensitive',
                        text: 'Sensitive',
                        value: 'Sensitive',
                      },
                      {
                        key: 'Very Sensitive',
                        text: 'Very Sensitive',
                        value: 'Very Sensitive',
                      },],
            placeholder:'Select Asset Sensitivity',
        };

class CommuteStore {
    @observable getAPIStatus;
    @observable getAPIError;
    @observable getRequestAPIResponse;
    @observable getMyRequestsAPIResponse;
    @observable requests;
    @observable allRequestData;
    commuteService
    constructor(commuteService){
        this.assetType=assetType;
        this.assetSensitivity=assetSensitivity;
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
        // calling init before going to post to clear API STATUS
        let rideRequestPromise=this.commuteService.rideRequestAPI(rideRequest);
         return bindPromiseWithOnSuccess(rideRequestPromise).
         to(this.setGetAPIStatus,this.setGetRequestAPIRResponse).
         catch(this.setGetAPIError);
    }
    @action.bound
    postAssetTransportRequest(rideRequest){
        this.init();
        // calling init before going to post to clear API STATUS
        let assetRequestPromise=this.commuteService.assetTransportRequestAPI(rideRequest);
        return bindPromiseWithOnSuccess(assetRequestPromise).
        to(this.setGetAPIStatus,this.setGetRequestAPIRResponse).
        catch(this.setGetAPIError);
    }
    @action.bound
    getMyRequests(details){
        this.init();
        // calling init before going to post to clear API STATUS
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