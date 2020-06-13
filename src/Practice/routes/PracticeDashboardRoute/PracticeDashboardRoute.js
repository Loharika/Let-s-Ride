import React from 'react'
import { observer, inject } from 'mobx-react'
import { action, computed } from 'mobx'
import { getLoadingStatus, ApiFailed } from '@ib/api-utils'

import LoadingWrapperWithFailure from '../../../Common/components/common/LoadingWrapperWithFailure'

@inject('practiceStore')
@observer
class PracticeDashboardRoute extends React.Component {
   componentDidMount() {
      this.doNetworkCalls()
   }
   @action.bound
   async doNetworkCalls() {
      const {
         practiceStore: { getResourceDetails, getResourceItems }
      } = this.props
      await getResourceDetails()
      await getResourceItems()
      const {
         practiceStore: { resourceDetails, resourceItems }
      } = this.props
   }
   @computed
   get loadingStatus() {
      const {
         practiceStore: {
            getResourceDetailsAPIStatus,
            getResourceItemsAPIStatus
         }
      } = this.props
      return getLoadingStatus(
         getResourceDetailsAPIStatus,
         getResourceItemsAPIStatus
      )
   }
   @computed
   get apiFailed() {
      const {
         practiceStore: { getResourceDetailsAPIError, getResourceItemsAPIError }
      } = this.props
      return ApiFailed(getResourceDetailsAPIError, getResourceItemsAPIError)
   }
   @action.bound
   renderSuccessUI() {
      const {
         practiceStore: { resourceDetails, resourceItems }
      } = this.props
      return (
         <div>
            <div className='flex'>
               <div>
                  <h1>{resourceDetails.name}</h1>
                  <div>{resourceDetails.description}</div>
               </div>
               <img src={resourceDetails.imgUrl} className='w-64 h-64' />
            </div>
            <div>
               {resourceItems.map(item => {
                  return <div key={item.name}>{item.name}</div>
               })}
            </div>
         </div>
      )
   }
   render() {
      const {
         practiceStore: { getResourceItemsAPIError }
      } = this.props
      return (
         <LoadingWrapperWithFailure
            apiStatus={this.loadingStatus}
            apiError={getResourceItemsAPIError}
            renderSuccessUI={this.renderSuccessUI}
            onRetryClick={this.doNetworkCalls}
         />
      )
   }
}
export { PracticeDashboardRoute }
