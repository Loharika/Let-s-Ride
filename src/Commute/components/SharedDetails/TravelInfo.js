import React from 'react'
import { observer } from 'mobx-react'

import strings from '../../i18n/strings.json'
import {
   RequestDetailsTable,
   TableCellLeftAligned,
   TableCellAlignedCenter,
   TableHeader,
   TableRow,
   StatusButton
} from './styledComponents.js'

import LoadingWrapperWithFailure from '../../../Common/components/common/LoadingWrapperWithFailure'

@observer
class TravelInfoTable extends React.Component {
   constructor(props) {
      super(props)
      this.shareTravelInfoHeaders = [
         'FROM',
         'TO',
         'DATE AND TIME',
         'TRAVEL MEDIUM',
         'ASSETS QUANTITY',
         'STATUS'
      ]
   }
   renderSuccessUI = () => {
      const { getTravelDetails } = this.props
      const travelInfo = getTravelDetails()

      return (
         <RequestDetailsTable>
            <TableRow key={Math.random()}>
               {this.shareTravelInfoHeaders.map(eachOne => {
                  return (
                     <TableHeader key={Math.random()}>{eachOne}</TableHeader>
                  )
               })}
            </TableRow>
            {Object.values(travelInfo).map(ride => {
               return (
                  <TableRow key={Math.random()}>
                     <TableCellLeftAligned>{ride.origin}</TableCellLeftAligned>
                     <TableCellLeftAligned>
                        {ride.destination}
                     </TableCellLeftAligned>
                     <TableCellLeftAligned>
                        {ride.flexibleWithTime ? (
                           <span>
                              From:{ride.startDatetime.slice(0, 21)} <br />
                              To:{ride.endDatetime.slice(0, 21)}
                           </span>
                        ) : (
                           ride.dateTime.slice(0, 21)
                        )}
                     </TableCellLeftAligned>
                     <TableCellAlignedCenter>
                        {ride.travelMedium}
                     </TableCellAlignedCenter>
                     <TableCellAlignedCenter>
                        {ride.assetsQuantity}
                     </TableCellAlignedCenter>
                     <TableCellLeftAligned>
                        <StatusButton status={ride.status}>
                           {ride.status.toUpperCase()}
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
         getTravelInfoAPIStatus,
         getTravelInfoAPIError,
         doNetworkCalls
      } = this.props
      return (
         <React.Fragment>
            <LoadingWrapperWithFailure
               key={Math.random()}
               apiStatus={getTravelInfoAPIStatus}
               apiError={getTravelInfoAPIError}
               onRetryClick={doNetworkCalls}
               renderSuccessUI={renderSuccessUI}
            />
         </React.Fragment>
      )
   }
}
export { TravelInfoTable }
