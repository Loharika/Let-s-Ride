import React from 'react'
import { action } from 'mobx'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom'

import { DashBoard } from '../../components/CommuteDashboard'

import { withHeader } from '../../Hocs/withHeader'

@inject('commuteStore')
@observer
class DashBoardRoute extends React.Component {
   componentDidMount() {
      const { doNetWorkCallsForMatchingRequests } = this
      doNetWorkCallsForMatchingRequests()
   }
   @action.bound
   async doNetWorkCallsForRequests() {
      const {
         commuteStore: {
            displayData,
            limit,
            getMyRideRequests,
            getMyAssetRequests
         }
      } = this.props
      const requestType = displayData.myRequests.requestType

      switch (requestType) {
         case 'RIDE': {
            const filter = displayData.myRequests.filter
            const pageNumber = displayData.myRequests.rideRequestPageNumber
            const sortBy = displayData.myRequests.sortBy
            const sortByField = displayData.myRequests.sortByField
            let offset = (pageNumber - 1) * limit
            const dataToGetRequests = {
               filterBy: filter,
               sortBy: sortBy,
               sortByField: sortByField,
               offset: offset,
               limit: limit
            }
            await getMyRideRequests(dataToGetRequests)
            break
         }
         case 'ASSET': {
            const filter = displayData.myRequests.filter
            const pageNumber = displayData.myRequests.assetRequestPageNumber
            const sortBy = displayData.myRequests.sortBy
            const sortByField = displayData.myRequests.sortByField
            let offset = (pageNumber - 1) * limit
            const dataToGetRequests = {
               filterBy: filter,
               sortBy: sortBy,
               sortByField: sortByField,
               offset: offset,
               limit: limit
            }
            await getMyAssetRequests(dataToGetRequests)
            break
         }
      }
   }
   @action.bound
   async doNetWorkCallsForMatchingRequests() {
      const {
         commuteStore: { displayData, limit, getAllMatchingRequests }
      } = this.props
      const requestType = displayData.matchingResults.requestType
      const filter = displayData.matchingResults.filterBy
      const pageNumber =
         requestType === 'RIDE'
            ? displayData.matchingResults.rideRequestPageNumber
            : displayData.matchingResults.assetRequestPageNumber
      const sortBy = displayData.matchingResults.sortBy
      const sortByOrder = displayData.matchingResults.sortBy

      let offset = (pageNumber - 1) * limit
      /*const dataToGetRequests = {
         filterBy: filter,
         sortBy: sortBy,
         sortByOrder:sortByOrder,
         offset: offset,
         limit: limit,
      };
      await getAllMatchingRequests(requestType,dataToGetRequests);*/
      const dataToGetRequests = {
         limit: limit,
         offset: offset
      }
      await getAllMatchingRequests(requestType, dataToGetRequests)
   }
   @action.bound
   addRequestButton(requestType) {
      const { history } = this.props
      switch (requestType) {
         case 'RIDE': {
            history.push('/commute-dashboard/ride-request')
            return
         }
         case 'ASSET': {
            history.push('/commute-dashboard/asset-transport-request')
            return
         }
      }
   }
   @action.bound
   async doNetWorkCallsForSharedDetails() {
      const {
         commuteStore: {
            displayData,
            limit,
            getSharedRides,
            getSharedTravelInfo
         }
      } = this.props
      const shareType = displayData.sharedDetails.shareType
      switch (shareType) {
         case 'RIDE': {
            const filter = displayData.sharedDetails.filter
            const pageNumber = displayData.sharedDetails.sharedRidePageNumber
            let offset = (pageNumber - 1) * limit
            const details = {
               filter: filter,
               limit: limit,
               offset: offset
            }
            await getSharedRides(details)
            break
         }
         case 'TRAVEL INFO': {
            const filter = displayData.sharedDetails.filter
            const pageNumber =
               displayData.sharedDetails.sharedTravelInfoPageNumber
            let offset = (pageNumber - 1) * limit
            const details = {
               filter: filter,
               limit: limit,
               offset: offset
            }
            await getSharedTravelInfo(details)
            break
         }
      }
   }
   render() {
      const {
         doNetWorkCallsForMatchingRequests,
         doNetWorkCallsForRequests,
         doNetWorkCallsForSharedDetails,
         addRequestButton
      } = this
      //
      //
      return (
         <DashBoard
            history={this.props.history}
            doNetWorkCallsForMatchingRequests={
               doNetWorkCallsForMatchingRequests
            }
            doNetWorkCallsForRequests={doNetWorkCallsForRequests}
            doNetWorkCallsForSharedDetails={doNetWorkCallsForSharedDetails}
            addRequestButton={addRequestButton}
         />
      )
   }
}
export default withRouter(withHeader(DashBoardRoute))
