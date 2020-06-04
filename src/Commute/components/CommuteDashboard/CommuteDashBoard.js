import React from 'react'
import { observer, inject } from 'mobx-react'
import { observable, action } from 'mobx'

import { CommuteDashboardDisplay,
    MatchingResultsSelector,
    MyRequestsSelector,
    SharedDetailsSelector,
    Selectors,
} from './styledComponents.js';

import {MatchingResults} from '../MatchingResults';
import {Requests} from '../Requests';


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
       const {doNetWorkCallsForMatchingRequests,doNetWorkCallsForRequests}=this.props;
       this.selector=selector;
       switch(this.selector){
           case 'myRequests':{
               doNetWorkCallsForRequests();
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
              const {addRequestButton,
                 doNetWorkCallsForMatchingRequests,
                 doNetWorkCallsForRequests
              } = this.props
                
            const {commuteStore: {getMatchingRequestAPIStatus,getMatchingRequestAPIError,noOfAssetRequests}} = this.props
             const {commuteStore:{getMyRideRequestAPIStatus,getMyRideRequestAPIError,
             getMyAssetRequestAPIStatus,getMyAssetRequestAPIError}}=this.props;
             
            switch(this.selector){
                case 'myRequests':{
                  return <Requests key={Math.random()+'myrequests'}doNetWorkCallsForRequests={doNetWorkCallsForRequests}
                      addRequestButton={addRequestButton}/>;
                }
                  case 'matchingResults':{
                      return <MatchingResults key={Math.random()+'matchingrequests'}
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
      );
   }
}
export {DashBoard};