import React from 'react';
import {observable,action} from 'mobx';
import {observer} from 'mobx-react';
import { Pagination,Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import {BsFilter} from 'react-icons/bs';
import {RiAddLine} from 'react-icons/ri';

import {MyRequestsHeader,MyRequestType,MyRequestsDashboard,RequestHeader,NoOfRequests,FilterAndSort,
    Footer,AddRequestButton,Pages,MyRequestsTitle
} from './styledComponents.js';

import LoadingWrapperWithFailure from '../../../components/common/LoadingWrapperWithFailure';
import {UserProfile} from '../../../Authentication/components/UserProfile';

import {ShowRideRequests} from './ShowRideRequests.js';
import {ShowAssetTransport} from './ShowAssetTransport.js';
import {DisplayDropDown} from '../../../Common/components/DisplayDropDown.js';
import strings from '../../i18n/strings.json';


@observer
class ShowMyRequests extends React.Component{
   @observable totalNumberOfPages;
   constructor(props){
       super(props);
       const { getRequests,displayRequestType,limit}=this.props;
       this.totalNumberOfPages=Math.ceil((getRequests(displayRequestType).length)/limit);
   }
    displayRequestPage=()=>{
        
        const {
        getRequests,
        renderPageRequests,
        onChangeFilter,
        onChangeSortBy,
        rideRequestTableHeaders,
        assetRequestTableHeaders,
        displayRequestType
        }=this.props;
        
        switch(displayRequestType){
            case strings.requestType.ride:{
                return <ShowRideRequests 
                getRequests={getRequests}
                renderPageRequests={renderPageRequests}
                onChangeFilter={onChangeFilter}
                onChangeSortBy={onChangeSortBy}
                tableHeaders={rideRequestTableHeaders}
                />;
            }
            case strings.requestType.asset:{
                return <ShowAssetTransport 
                getRequests={getRequests}
                renderPageRequests={renderPageRequests}
                onChangeFilter={onChangeFilter}
                onChangeSortBy={onChangeSortBy}
                tableHeaders={assetRequestTableHeaders}
                />;
            }
        }
    }
    @action.bound
    renderSuccessUI(){
        const {limit,onChangeFilter,onChangeSortBy,onChangePageNumber,pageNumber,displayRequestType}=this.props;
        const {onClickRequestType,addRequestButton}=this.props;
        const filterOptions={
            listTitle:'',
            listItems:[{key:'SELECT',text:'All',value:'SELECT'},{key:'ACTIVE',text:'Active',value:'ACTIVE'},
            {key:'EXPIRE',text:'Expire',value:'EXPIRE'}],
            placeholder:'Filter'
        };
        const sortOptions={
            listTitle:'',
            listItems:[{key:'SELECT',text:'All',value:'SELECT'},{key:'DATE',text:'Date',value:'DATE'},
            {key:'TIME',text:'Time',value:'TIME'}],
            placeholder:'Sort'
        };
            
        return (
        <MyRequestsDashboard key={Math.random()+displayRequestType}>
            <MyRequestsTitle>{strings.text.myRequests}</MyRequestsTitle>
             <MyRequestsHeader>
              <MyRequestType onClick={()=>onClickRequestType(strings.requestType.ride)} isSelected={displayRequestType==='ride'?true:false}>{strings.text.ride.toUpperCase()}</MyRequestType>
              <MyRequestType onClick={()=>onClickRequestType(strings.requestType.asset)} isSelected={displayRequestType==='asset'?true:false}>{strings.text.asset.toUpperCase()}</MyRequestType>
            </MyRequestsHeader>
            <RequestHeader>
                <NoOfRequests>{limit} Request(s)</NoOfRequests>
                 
                <FilterAndSort>
                    
                    <DisplayDropDown
                      data={sortOptions}
                      onChange={onChangeSortBy}
                    />
                    <DisplayDropDown
                      data={filterOptions}
                      onChange={onChangeFilter}
                    /> 
                </FilterAndSort>
                </RequestHeader>
            {this.displayRequestPage()}
            <Footer>
                <AddRequestButton onClick={()=>addRequestButton(displayRequestType)}>
                <RiAddLine />  &nbsp;Add {displayRequestType}
                </AddRequestButton>
                <Pages>
                1 to {this.totalNumberOfPages}
                </Pages>
                <Pagination
                    boundaryRange={0}
                    defaultActivePage={pageNumber}
                    ellipsisItem={null}
                    firstItem={null}
                    lastItem={null}
                    siblingRange={1}
                    totalPages={this.totalNumberOfPages}
                    onPageChange={onChangePageNumber}
                  />
                </Footer>
                
        </MyRequestsDashboard>
            );
    }
    render(){
        const {renderSuccessUI}=this;
        const {getAPIError,getAPIStatus,doNetworkCalls}=this.props;
        return (
            <React.Fragment>
            <LoadingWrapperWithFailure key={this.navigateTo} apiStatus={getAPIStatus} apiError={getAPIError} 
                            onRetryClick={doNetworkCalls} renderSuccessUI={renderSuccessUI} 
                        />
                        </React.Fragment>
            
            );
    }
}
export {ShowMyRequests};


