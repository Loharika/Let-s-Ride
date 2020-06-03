import React from 'react'
import { observer, inject } from 'mobx-react'
import { observable, action } from 'mobx'



import { CommuteDashboardDisplay, AllRequests,
    
    MatchingResultsSelector,
    MyRequestsSelector,
    SharedDetailsSelector,
    Selectors,
    
} from './styledComponents.js'

import {MyRequests} from '../MyRequests';
import {MatchingResults} from '../MatchingResults';

import strings from '../../i18n/strings.json'

@inject('commuteStore','authStore')
@observer
class DashBoard extends React.Component {
    @observable selector;
   constructor(){
       super();
       this.selector='matchingResults';
   }
   
   @action.bound
   onClickSelector(selector){
       const {doNetWorkCallsForMatchingRequests,doNetWorkCallsForMyRequests}=this.props;
       this.selector=selector;
       switch(this.selector){
           case 'myRequests':{
               doNetWorkCallsForMyRequests();
               return ;
           }
           case 'matchingResults':{
               doNetWorkCallsForMatchingRequests();
               return ;
           }
           case 'sharedDetails':{
               
           }
       }
   }
   renderPage = () => {
              const {
                 limit,
                 onChangeFilter,
                 onChangeSortBy,
                 onChangePageNumber,
                 pageNumber,
                 displayRequestType,
                 getRequests,
                 totalNumberOfPages,
                 doNetWorkCallsForMyRequests,
                 onClickRequestType,
                 addRequestButton,
                 rideRequestTableHeaders,
                 assetRequestTableHeaders
              } = this.props

              const {
                 doNetWorkCallsForMatchingRequests,
                 onChangeMatchingRequestsFilter,
                 getMatchingRequests
              } = this.props

            const {commuteStore: {getMatchingRequestAPIStatus,getMatchingRequestAPIError}} = this.props
             const {commuteStore:{getMyRideRequestAPIStatus,getMyRideRequestAPIError,getMyAssetRequestAPIStatus,getMyAssetRequestAPIError}}=this.props;
            
            switch(this.selector){
                case 'myRequests':{
                    return (
                  <MyRequests
                    
                     doNetWorkCallsForMyRequests={doNetWorkCallsForMyRequests}
                     
                     getMyRideRequestAPIStatus={getMyRideRequestAPIStatus}
                     getMyRideRequestAPIError={getMyRideRequestAPIError}
                     getMyAssetRequestAPIStatus={getMyAssetRequestAPIStatus}
                     getMyAssetRequestAPIError={getMyAssetRequestAPIError}
                     
                     getRequests={getRequests}
                     totalNumberOfPages={totalNumberOfPages}
                     onChangePageNumber={onChangePageNumber}
                     onClickRequestType={onClickRequestType}
                     onChangeSortBy={onChangeSortBy}
                     onChangeFilter={onChangeFilter}
                     limit={limit}
                     pageNumber={pageNumber}
                     displayRequestType={displayRequestType}
                     rideRequestTableHeaders={rideRequestTableHeaders}
                     assetRequestTableHeaders={assetRequestTableHeaders}
                     addRequestButton={addRequestButton}
                  />
                  )}
                  case 'matchingResults':{
                      return <MatchingResults
                       
                      doNetWorkCallsForMatchingRequests={doNetWorkCallsForMatchingRequests}
                      
                      
                      />;
                  }
                  case 'sharedDetails':{
                      return <div>Shared Details</div>;
                  }
                  
            }
            
         }
   
   render() {
     
      return (

            <CommuteDashboardDisplay key={Math.random()}>
                <Selectors>
                
                    <MatchingResultsSelector onClick={()=>this.onClickSelector('matchingResults')} isSelected={this.selector==='matchingResults'?true:false}>
                        Matching Results
                    </MatchingResultsSelector >
                    <MyRequestsSelector onClick={()=>this.onClickSelector('myRequests')} isSelected={this.selector==='myRequests'?true:false}>
                        My  Requests
                    </MyRequestsSelector>
                    <SharedDetailsSelector onClick={()=>this.onClickSelector('sharedDetails')} isSelected={this.selector==='sharedDetails'?true:false}>
                        Shared Details
                    </SharedDetailsSelector>
                </Selectors>
               {this.renderPage()}
            </CommuteDashboardDisplay>
      )
   }
}
export {DashBoard};

//<AllRequests>
                  /*<MatchingRequests
                     getMatchingRequests={getMatchingRequests}
                     onChangeMatchingRequestsFilter={
                    onChangeMatchingRequestsFilter
                     }
                     getMatchingRequestAPIStatus={getMatchingRequestAPIStatus}
                     getMatchingRequestAPIError={getMatchingRequestAPIError}
                     doNetworkCalls={doNetWorkCallsForMatchingRequests}
                  />*/
                  