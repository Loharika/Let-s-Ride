import React from 'react'
import { observer } from 'mobx-react'
import {FcCheckmark} from 'react-icons/fc';
import {FiPlus} from 'react-icons/fi';
import { API_SUCCESS } from '@ib/api-constants';
import LoadingWrapperWithFailure from '../../../Common/components/common/LoadingWrapperWithFailure';

import {
   RequestDetailsTable,
   TableCellLeftAligned,
   TableCellAlignedCenter,
   TableHeader,
   TableRow,
   StatusButton
} from './styledComponents.js'


//  {
//       "origin": "string",
//       "destination": "string",
//       "datetime": "string",
//       "flexible_with_time": true,
//       "start_datetime": "string",
//       "end_datetime": "string",
//       "no_of_assets": 0,
//       "asset_type": "BAGS",
//       "asset_sensitivity": "HIGHLY_SENSITIVE",
//       "luggage_quantity": 0,
//       "asset_to_be_delivered_to": "string",
//       "accepted_person": {
//        "name": "string",
//        "mobile_number": "string"
//       }
//     }

@observer
class ShowAssetTransport extends React.Component {
   renderSuccessUI = () => {
      const { tableHeaders, getRequests,getAcceptingMatchedRequestAPIStatus } = this.props
      const assetRequests = getRequests();
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
                     <TableCellLeftAligned>
                              { request.requested_by.name}<br/>{request.requested_by.mobile_number}
                        </TableCellLeftAligned>
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
                     <TableCellAlignedCenter>
                        {request.whom_to_deliver}
                     </TableCellAlignedCenter>
                     <TableCellLeftAligned>
                        <StatusButton onClick={request.onClickAddButton}>
                           {getAcceptingMatchedRequestAPIStatus===API_SUCCESS?<FcCheckmark />:<FiPlus />}
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
         getMatchingRequestAPIError,
         getMatchingRequestAPIStatus,
         doNetworkCalls
      } = this.props
      return (
         <React.Fragment>
            <LoadingWrapperWithFailure
               key={Math.random()}
               apiStatus={getMatchingRequestAPIStatus}
               apiError={getMatchingRequestAPIError}
               onRetryClick={doNetworkCalls}
               renderSuccessUI={renderSuccessUI}
            />
         </React.Fragment>
      )
   }
}
export { ShowAssetTransport }
