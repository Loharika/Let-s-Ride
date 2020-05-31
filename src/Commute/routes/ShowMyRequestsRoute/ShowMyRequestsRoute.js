
import React from 'react';
import {observable,action} from 'mobx';
import {observer,inject} from 'mobx-react';
import {withRouter} from 'react-router-dom';

import {ShowMyRequests} from '../../components/ShowUserRequests/ShowMyRequests.js';

import strings from '../../i18n/strings.json';

@inject('commuteStore','authStore')
@observer
class ShowMyRequestsRoute extends React.Component{
    @observable pageNumber;
    @observable filter;
    @observable sortBy;
    @observable displayRequestType;
    constructor(){
        super();
        this.limit=4;
        this.rideRequestTableHeaders=['FROM','TO','DATE AND TIME','NUMBER OF PEOPLE','LUGGAGE QUANTITY','ACCEPTED PERSON DETAILS','STATUS'];
        this.assetRequestTableHeaders=['FROM','TO','DATE AND TIME','NUMBER OF PEOPLE','ASSET TYPE','ASSET SENSITIVITY','ACCEPTED PERSON DETAILS','STATUS'];
        this.init();
        this.displayRequestType=strings.requestType.ride;
    }
    @action.bound
    init(){
        this.pageNumber=1;
        this.filter='SELECT'; //ACTIVE EXPIRED
        this.sortBy='SELECT'; //DATE TIME
    }
    @action.bound
    getRequests(requestType){
        const {commuteStore:{allRequestData}
        }=this.props;
        switch(requestType){
            case 'ride':{
                return allRequestData.filter(request=>request.hasOwnProperty('noOfLuggages'));
            }
            case 'asset':{
                return allRequestData.filter(request=>request.hasOwnProperty('assetType'));
            }
        }
       
        
    }
     onClickRequestType=(requestType)=>{
        const {init}=this;
        init();
        this.displayRequestType=requestType;
    }
    
    onChangePageNumber=(event,data)=>{
        this.pageNumber=data.activePage;
    }

    @action.bound
    onChangeSortBy(event){
        this.sortBy=event;
        
    }
    @action.bound
    onChangeFilter(event){
        this.filter=event;
    }
    filterRequests=(requests)=>{
        switch(this.filter){
            case 'SELECT':{
                return requests;
            }
            case 'ACTIVE':{
                return requests.filter(request=>request.status==='Confirmed' || request.status==='Pending');
            }
            case 'EXPIRE':{
                return requests.filter(request=>request.status==='Expire');
            }
        }
    }
    sortByTime=(requests)=>{
                let date=new Date().toString().slice(0,16);
                return (requests.slice().sort((a, b)=>{
                    if(a.date!==undefined && b.date!==undefined){
                        let aTime=a.date.slice(16,34);
                        let bTime=b.date.slice(16,34);
                        return new Date(date+aTime)-new Date(date+bTime);
                    }
                    else if(a.date===undefined && b.date===undefined){
                        let aTime=a.startTime.slice(16,34);
                        let bTime=b.startTime.slice(16,34);
                        return new Date(date+aTime)-new Date(date+bTime);
                    }
                    else if(a.date===undefined && b.date!==undefined){
                        let aTime=a.startTime.slice(16,34);
                        let bTime=b.date.slice(16,34);
                        return new Date(date+aTime)-new Date(date+bTime);
                    }
                    else{
                        let aTime=a.date.slice(16,34);
                        let bTime=b.startTime.slice(16,34);
                        return new Date(date+aTime)-new Date(date+bTime);
                    }
                }));
    }
    sortByDate=(requests)=>{
        return requests.slice().sort((a, b)=>{
                     if(a.date!==undefined && b.date!==undefined){
                        return new Date(a.date.slice(0,15))-new Date(b.date.slice(0,15));
                     }
                     else if(a.date===undefined && b.date===undefined){
                        return new Date(a.startTime.slice(0,15))-new Date(b.startTime.slice(0,15));
                     }
                     else if(a.date===undefined && b.date!==undefined){
                        return new Date(a.startTime.slice(0,15))-new Date(b.date.slice(0,15));
                     }
                     else{
                         return new Date(a.date.slice(0,15))-new Date(b.startTime.slice(0,15));
                     }
                });
    }
    sortedRequests=(requests)=>{
        switch(this.sortBy){
            case 'SELECT':{
                return requests;
            }
            case 'DATE':{
                    return this.sortByDate(requests);
                 
            }
            case 'TIME':{
                return this.sortByTime(requests);
                
            }
            
        }
    }
    renderPageRequests=(requests)=>{
        let startIndex=(this.pageNumber-1)*this.limit;
        let lastIndex=(this.pageNumber*this.limit)-1;
        let requestsInPage=requests.filter((request,index)=>(index>=startIndex && index<=lastIndex));
        let filteredRequests=this.filterRequests(requestsInPage);
        let sortedRequests=this.sortedRequests(filteredRequests);
       return sortedRequests;
    }
    @action.bound
    addRequestButton(requestType){
        const {navigatePageTo}=this.props;
        navigatePageTo(requestType==='ride'?'rideRequest':'assetTranportRequest');
    }
    render(){
        const {commuteStore:{allRequestData},doNetWorkCalls,getAPIError,getAPIStatus}=this.props;
        const {getRequests,onChangePageNumber,onChangeFilter,onChangeSortBy,renderPageRequests,
        limit,pageNumber,rideRequestTableHeaders,assetRequestTableHeaders,init,displayRequestType,onClickRequestType,
            addRequestButton
        }=this;
        return (
            <ShowMyRequests 
            key={Math.random()+displayRequestType}
            limit={limit}
            init={init}
            rideRequestTableHeaders={rideRequestTableHeaders}
            assetRequestTableHeaders={assetRequestTableHeaders}
            pageNumber={pageNumber}
            requests={allRequestData} 
            getRequests={getRequests}
            onChangePageNumber={onChangePageNumber}
            onChangeFilter={onChangeFilter}
            onChangeSortBy={onChangeSortBy}
            renderPageRequests={renderPageRequests}
            displayRequestType={displayRequestType}
            onClickRequestType={onClickRequestType}
            addRequestButton={addRequestButton}
            doNetWorkCalls={doNetWorkCalls} 
            getAPIError={getAPIError} 
            getAPIStatus={getAPIStatus}
            />
            );
    }
}
export {ShowMyRequestsRoute};