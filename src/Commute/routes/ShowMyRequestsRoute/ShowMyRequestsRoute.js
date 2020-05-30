
import React from 'react';
import {observable,action} from 'mobx';
import {observer,inject} from 'mobx-react';
import {withRouter} from 'react-router-dom';

import {ShowMyRequests} from '../../components/ShowUserRequests/ShowMyRequests.js';


@inject('commuteStore')
@observer
class ShowMyRequestsRoute extends React.Component{
    @observable pageNumber;
    @observable filter;
    @observable sortBy;
    constructor(){
        super();
        this.limit=4;
        this.rideRequestTableHeaders=['FROM','TO','DATE AND TIME','NUMBER OF PEOPLE','LUGGAGE QUANTITY','ACCEPTED PERSON DETAILS','STATUS'];
        this.assetRequestTableHeaders=['FROM','TO','DATE AND TIME','NUMBER OF PEOPLE','ASSET TYPE','ASSET SENSITIVITY','ACCEPTED PERSON DETAILS','STATUS'];
        this.init();
    }
    @action.bound
    init(){
        this.pageNumber=1;
        this.filter='SELECT'; //ACTIVE EXPIRED
        this.sortBy='SELECT'; //DATE TIME
    }
    @action.bound
    getRequests(requestType){
        const {commuteStore:{allRequestData}}=this.props;
        switch(requestType){
            case 'ride':{
                return allRequestData.filter(request=>request.hasOwnProperty('noOfLuggages'));
            }
            case 'asset':{
                return allRequestData.filter(request=>request.hasOwnProperty('assetType'));
            }
        }
       
        
    }
    onChangePageNumber=(page)=>{
        let intialPageNumber=this.pageNumber;
        switch(page){
            case 'previousPage':{
                intialPageNumber--;
                if(intialPageNumber>0){
                 this.pageNumber=intialPageNumber;   
                }
                else{
                    this.pageNumber=this.pageNumber
                }
                break;
            }
            case 'nextPage':{
                intialPageNumber++;
                
                let totalNumberOfPages=((this.props.commuteStore.allRequestData.length)/this.limit);
                if(intialPageNumber<=totalNumberOfPages){
                    this.pageNumber=intialPageNumber;
                }
                else{
                    this.pageNumber=this.pageNumber
                }
                break;
            }
        }
    }
    onChangeSortBy=(sortBy)=>{this.sortBy=sortBy;}
    onChangeFilter=(filter)=>{this.filter=filter;}
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
    sortedRequests=(requests)=>{
        switch(this.sortBy){
            case 'SELECT':{
                return requests;
            }
            case 'DATE':{
                 return requests.slice().sort((a, b)=>{
                    return new Date(a.date.slice(0,15))-new Date(b.date.slice(0,15));
                });
            }
            case 'TIME':{
                let date=new Date().toString().slice(0,16);
                return requests.slice().sort((a, b)=>{
                    let aTime=a.date.slice(16,34);
                    let bTime=b.date.slice(16,34);
                    return new Date(date+aTime)-new Date(date+bTime);
                });
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
    render(){
        const {commuteStore:{allRequestData}}=this.props;
        const totalNumberOfPages=(this.props.commuteStore.allRequestData.length)/this.limit;
        const {getRequests,onChangePageNumber,onChangeFilter,onChangeSortBy,renderPageRequests,
        limit,pageNumber,rideRequestTableHeaders,assetRequestTableHeaders,init}=this;
        return (
            <ShowMyRequests 
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
            totalNumberOfPages={totalNumberOfPages}
            />
            );
    }
}
export {ShowMyRequestsRoute};