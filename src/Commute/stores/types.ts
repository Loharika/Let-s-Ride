
export interface MyRideRequestObject{
            origin:string,
            destination:string,
            datetime:string,
            start_datetime:string,
            end_datetime:string|null
            no_of_seats:number,
            flexible_with_time:boolean,
            luggage_quantity:number,
            accepted_person:{
                name:string
                mobile_number:string
            },
            status:string
}
export interface MyAssetRequestObject{
            origin:string
            destination:string
            no_of_seats:number,
            flexible_with_time:boolean,
            datetime:string,
            start_datetime:string
            end_datetime:string,
            asset_type:string
            asset_sensitivity:string
            accepted_person:{
                    name:string
                mobile_number:string
            },
            status:string
            whom_to_deliver:string
        }
export interface MatchedRideRequestObject{
            
            origin:string
            destination:string
            no_of_seats:number,
            flexible_with_time:boolean,
            datetime:string,
            start_datetime:string
            end_datetime:string,
            luggage_quantity:number
            ride_request_id:string
            requested_by:{
                name:string
                mobile_number:string
            },
            status:string
}
export interface MatchedAssetRequestObject{
           
            origin:string
            destination:string,
            assets_quantity:number
            flexible_with_time:boolean,
            datetime:string,
            luggage_quantity:number
            start_datetime:string
            end_datetime:string,
            asset_type:string
            asset_sensitivity:string
            whom_to_deliver:string
            asset_request_id:string
            requested_by:{
                name:string
                mobile_number:string
            },
            status:string
}
export interface ShareRideObject{
        origin:string
            destination:string,
            flexible_with_time:boolean,
            datetime:string|null,
            start_datetime:string|null
            end_datetime:string|null,
        no_of_seats:number
        assets_quantity:number
}
export interface ShareTravelInfoObject{
    origin:string
    destination:string,
    flexible_with_time:boolean,
    datetime:string,
    start_datetime:string
    end_datetime:string,
    travel_medium:string
    assets_quantity:number
    status:string
}

export interface GetMyRideRequestResponse {
    ride_requests: Array<MyRideRequestObject>
    total_ride_requests_count: number
  }


export interface GetMyAssetRequestResponse {
    asset_requests: Array<MyAssetRequestObject>
    total_asset_tansport_count: number
  }

export interface GetMatchingRideRequestResponse {
    ride_requests: Array<MatchedRideRequestObject>
    ride_requests_matches_count: number
  }

export interface GetMatchingAssetRequestResponse {
    asset_requests: Array<MatchedAssetRequestObject>
    assets_matches_count: number
  }
export interface GetMatchingRequestResponse{
  asset_requests: Array<MatchedAssetRequestObject>
  ride_requests: Array<MatchedRideRequestObject>
  ride_requests_matches_count: number
  assets_matches_count: number

}
export interface GetSharedRideRequestResponse {
    shared_rides: Array<ShareRideObject>
    count_of_ride_shares: number
  }

  export interface GetSharedTravelInfoResponse {
    shared_travels: Array<ShareTravelInfoObject>
    total_travel_infos_shared: number
  }


export interface AssetRequestObject {
  origin:string
  destination: string,
  flexible_with_time: boolean,
  datetime: null|string,
  start_datetime: string|null,
  end_datetime: string|null,
  assets_quantity: number,
  asset_type: string,
  asset_sensitivity: string,
  whom_to_deliver: string
  }
  export interface RideRequestObject {
    origin:string
    destination: string,
    flexible_with_time: boolean,
    datetime: string|null,
    start_datetime: string|null,
    end_datetime: string |null,
    no_of_seats: number
    luggage_quantity: number  
   }
   export interface ShareRideRequestObject {
    origin:string
    destination: string,
    flexible_with_time: boolean,
    datetime: string,
    start_datetime: string,
    end_datetime: string ,
    no_of_seats: number,
    assets_quantity: number   
  }
  export interface ShareTravelInfoRequestObject{
    origin:string
    destination: string,
    flexible_with_time: boolean,
    datetime: string,
    start_datetime: string,
    end_datetime: string ,
    transport_medium:string,
    assets_quantity:number
  }
  export interface MyRequestObject{
                filterBy: string,
               sortBy: string,
               sortByField: string,
               offset: number,
               limit: number
  }
  export interface MatchingRequestsRequestObject{
    limit:number
    offset:number
  }
  export interface SharedDetailsRequestObject{
    limit:number
    offset:number
    filter: string
  }

  export interface Final{
    requestObject
  }