import { GetMyRideRequestResponse,GetMyAssetRequestResponse,
    GetMatchingRideRequestResponse,GetMatchingAssetRequestResponse,GetMatchingRequestResponse,
    GetSharedRideRequestResponse,GetSharedTravelInfoResponse ,
    AssetRequestObject,RideRequestObject,MyRequestObject,
    ShareRideRequestObject,ShareTravelInfoRequestObject,SharedDetailsRequestObject, MatchingRequestsRequestObject} from '../../stores/types'
interface CommuteServiceInterface {
    rideRequestAPI  :(requestData:RideRequestObject)=>Promise<{}>

    assetTransportRequestAPI:(requestData:AssetRequestObject)=>Promise<{}>

    shareRideInfoAPI:(details:ShareRideRequestObject)=>Promise<{}>

    shareTravelInfoAPI:(details:ShareTravelInfoRequestObject)=>Promise<{}>

    myRideRequestsAPI:(dataToGetRequests:MyRequestObject)=>Promise<GetMyRideRequestResponse>

    myAssetRequestsAPI:(dataToGetRequests:MyRequestObject)=>Promise<GetMyAssetRequestResponse>

    matchingAllRequestsAPI:(matchingRequestsFilter:string,dataToGetMatchingRequests:MatchingRequestsRequestObject)=>Promise<GetMatchingRequestResponse>

    acceptTheMatchedRequestAPI:(requestId:string)=>Promise<{}>

    sharedRideAPI:(details:SharedDetailsRequestObject)=>Promise<GetSharedRideRequestResponse>

    travelInfoAPI:(details:SharedDetailsRequestObject)=>Promise<GetSharedTravelInfoResponse>
}

export default CommuteServiceInterface