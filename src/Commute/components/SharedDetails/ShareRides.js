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
class SharedRidesTable extends React.Component {
   constructor(props){
      super(props);
        this.sharedRidesHeaders=['FROM','TO','DATE AND TIME','NO OF SEATS','ASSETS QUANTITY','STATUS'];   
       
   }
   renderSuccessUI = () => {
      const {  getShares } = this.props
      const sharesRides = getShares();
      return (
         <RequestDetailsTable>
            <TableRow key={Math.random()}>
               {this.sharedRidesHeaders.map(eachOne => {
                  return (
                     <TableHeader key={Math.random()}>{eachOne}</TableHeader>
                  )
               })}
            </TableRow>
            {Object.values(sharesRides).map(ride => {
               return (
                  <TableRow key={Math.random()}>
                     <TableCellLeftAligned>{ride.origin}</TableCellLeftAligned>
                     <TableCellLeftAligned>{ride.destination}</TableCellLeftAligned>
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
                        {ride.noOfSeats}
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
         getSharedRidesStatus,
         getSharedRidesError,
         doNetworkCalls
      } = this.props
      return (
         <React.Fragment>
            <LoadingWrapperWithFailure
               key={this.navigateTo}
               apiStatus={getSharedRidesStatus}
               apiError={getSharedRidesError}
               onRetryClick={doNetworkCalls}
               renderSuccessUI={renderSuccessUI}
            />
         </React.Fragment>
      )
   }
}
export { SharedRidesTable }
