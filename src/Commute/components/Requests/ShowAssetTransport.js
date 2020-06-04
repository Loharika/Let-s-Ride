import React from 'react'
import { observer } from 'mobx-react'

import LoadingWrapperWithFailure from '../../../Common/components/common/LoadingWrapperWithFailure'
import {
   RequestDetailsTable,
   TableCellLeftAligned,
   TableCellAlignedCenter,
   TableHeader,
   TableRow,
   StatusButton
} from './styledComponents.js'

@observer
class ShowAssetTransport extends React.Component {
   constructor(){
      this.tableHeaders=['FROM','TO','DATE AND TIME','NO OF PEOPLE','ASSET TYPE','ASSET SENSITIVITY','WHOM TO DELIVER','ACCEPTED PERSON DETAILS','STATUS'];
   }
   renderSuccessUI = () => {
      const {tableHeaders}=this;
      const { getRequests } = this.props
      const assetRequests = getRequests()
      return (
         <RequestDetailsTable>
            <TableRow>
               {tableHeaders.map(eachOne => {
                  return <TableHeader>{eachOne}</TableHeader>
               })}
            </TableRow>
            {Object.values(assetRequests).map(request => {
               return (
                  <TableRow>
                     <TableCellLeftAligned>{request.origin}</TableCellLeftAligned>
                     <TableCellLeftAligned>{request.destination}</TableCellLeftAligned>
                     <TableCellLeftAligned>
                        {request.flexible_with_time ? (
                           <span>
                              From:{request.start_datetime.slice(0, 21)} <br />
                              To:{request.end_datetime.slice(0, 21)}
                           </span>
                        ) : (
                           request.datetime.slice(0, 21)
                        )}
                     </TableCellLeftAligned>
                     <TableCellAlignedCenter>
                        {request.no_of_assets}
                     </TableCellAlignedCenter>
                     <TableCellAlignedCenter>
                        {request.asset_type}
                     </TableCellAlignedCenter>
                     <TableCellAlignedCenter>
                        {request.asset_sensitivity}
                     </TableCellAlignedCenter>
                     <TableCellLeftAligned>
                     {request.asset_to_be_delivered_to}
                     </TableCellLeftAligned>
                     <TableCellLeftAligned>
                        {request.status === 'Confirmed'
                           ? <span>{request.accepted_person.name}<br/>{request.accepted_person.mobile_number}</span>
                           : request.status === 'Pending'
                           ? 'Not Confirmed'
                           : 'Expired'}
                     </TableCellLeftAligned>
                     
                     <TableCellLeftAligned>
                        <StatusButton status={request.status}>
                           {request.status.toUpperCase()}
                        </StatusButton>
                     </TableCellLeftAligned>
                  </TableRow>
               )
            })}
         </RequestDetailsTable>
      )
   }

   render() {
      const { renderSuccessUI } = this
      const {
         getMyAssetRequestAPIStatus,
         getMyAssetRequestAPIError,
         doNetworkCalls
      } = this.props
      return (
         <React.Fragment>
            <LoadingWrapperWithFailure
               key={this.navigateTo}
               apiStatus={getMyAssetRequestAPIStatus}
               apiError={getMyAssetRequestAPIError}
               onRetryClick={doNetworkCalls}
               renderSuccessUI={renderSuccessUI}
            />
         </React.Fragment>
      )
   }
}
export { ShowAssetTransport }

// "asset_requests" : [ {
//     "origin" : "string",
//     "destination" : "string",
//     "datetime" : "string",
//     "flexible_with_time" : true,
//     "start_datetime" : "string",
//     "end_datetime" : "string",
//     "no_of_assets" : 0,
//     "asset_type" : "BAGS",
//     "asset_sensitivity" : "HIGHLY_SENSITIVE",
//     "luggage_quantity" : 0,
//     "asset_to_be_delivered_to" : "string",
//     "accepted_person" : {
//       "name" : "string",
//       "mobile_number" : "string"
//     },
//     "status" : "CONFIRM"
//  } ],
//  "total_no_of_assets_requests" : 0