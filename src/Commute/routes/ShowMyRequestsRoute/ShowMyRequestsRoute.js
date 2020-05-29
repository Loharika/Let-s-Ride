
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
        this.pageNumber=1;
        this.limit=4;
        this.filter='SELECT'; //ACTIVE EXPIRED
        this.sortBy='SELECT'; //DATE TIME
    }
    @action.bound
    doNetWorkCalls(){
        const {commuteStore:{postRideRequest}}=this.props;
        postRideRequest();
    }
    componentDidMount(){
        const {doNetWorkCalls}=this;
        doNetWorkCalls();
    }
    @action.bound
    getRideRequests(){
        const {commuteStore:{allRequestData}}=this.props;
    
        return allRequestData.filter(request=>request.hasOwnProperty('noOfLuggages'));
    }
    @action.bound
    getAssetRequests(){
        const {commuteStore:{allRequestData}}=this.props;
        return allRequestData.filter(request=>request.hasOwnProperty('assetType'));
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
    renderPageRideRequests=()=>{
        const {commuteStore:{allRequestData}}=this.props;
        let startIndex=(this.pageNumber-1)*this.limit;
        let lastIndex=(this.pageNumber*this.limit)-1;
        let requestsInPage=allRequestData.filter((request,index)=>(index>=startIndex && index<=lastIndex));
        let filteredRequests=this.filterRequests(requestsInPage);
        let sortedRequests=this.sortedRequests(filteredRequests);
       return sortedRequests;
    }
    render(){
        const {commuteStore:{allRequestData}}=this.props;
        const totalNumberOfPages=(this.props.commuteStore.allRequestData.length)/this.limit;
        const {getRideRequests,getAssetRequests,onChangePageNumber,onChangeFilter,onChangeSortBy,renderPageRideRequests,limit,pageNumber}=this;
        return (
            <ShowMyRequests 
            limit={limit}
            pageNumber={pageNumber}
            requests={allRequestData} 
            getRideRequests={getRideRequests}
            getAssetRequests={getAssetRequests}
            onChangePageNumber={onChangePageNumber}
            onChangeFilter={onChangeFilter}
            onChangeSortBy={onChangeSortBy}
            renderPageRideRequests={renderPageRideRequests}
            totalNumberOfPages={totalNumberOfPages}
            />
            );
    }
}
export {ShowMyRequestsRoute};