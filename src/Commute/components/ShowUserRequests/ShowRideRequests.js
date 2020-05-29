import React from 'react';
import {observer} from 'mobx-react';


import {NoOfRequests,RequestHeader,FilterAndSort,Sort,Filter,RequestDetailsTable,TableCellLeftAligned,TableCellAlignedCenter,TableHeader,TableRow,
    PaginationBar,PreviousPage,NextPage,Button,TurnPages,PageNumber
} from './styledComponents.js';

@observer
class ShowRideRequests extends React.Component{
    render(){
     
        const {onChangePageNumber,onChangeFilter,onChangeSortBy,renderPageRideRequests,limit,pageNumber,totalNumberOfPages}=this.props;
        const rideRequests=renderPageRideRequests();
        const headers=['FROM','TO','DATE AND TIME','NUMBER OF PEOPLE','LUGGAGE QUANTITY','ACCEPTED PERSON DETAILS','STATUS'];
        return (
            <div>
                <RequestHeader>
                <NoOfRequests>{limit} Tasks</NoOfRequests>
                <FilterAndSort>
                    <Sort>
                        <select onChange={()=>onChangeFilter(event.target.value)}>
                            <option value={'SELECT'}>All</option>
                            <option value={'ACTIVE'}>Active</option>
                            <option value={'EXPIRE'}>Expire</option>
                        </select>
                    </Sort>
                    <Filter>
                        <select onChange={()=>onChangeSortBy(event.target.value)}>
                            <option value={'SELECT'}></option>
                            <option value={'DATE'}>Date</option>
                            <option value={'TIME'}>Time</option>
                        </select>
                    </Filter>
                </FilterAndSort>
                </RequestHeader>
                    <RequestDetailsTable>
                      <TableRow>
                      {headers.map(eachOne=>{return <TableHeader>{eachOne}</TableHeader>})}
                      </TableRow>
                      {Object.values(rideRequests).map(request=>{
                      return <TableRow>
                                <TableCellLeftAligned>{request.from}</TableCellLeftAligned>
                                <TableCellLeftAligned>{request.to}</TableCellLeftAligned>
                                <TableCellLeftAligned>{request.date}</TableCellLeftAligned>
                                <TableCellAlignedCenter>{request.noOfSeats}</TableCellAlignedCenter>
                                <TableCellAlignedCenter>{request.noOfLuggages}</TableCellAlignedCenter>
                                <TableCellLeftAligned>{request.acceptedPersonDetails}</TableCellLeftAligned>
                                <TableCellLeftAligned>{request.status}</TableCellLeftAligned>
                              </TableRow>})}
                    </RequestDetailsTable>
                <PaginationBar>
                <Button>
                Add Ride
                </Button>
                
                <TurnPages>
                    <PreviousPage onClick={()=>onChangePageNumber('previousPage')}>
                    Previous
                    </PreviousPage>
                    <PageNumber>
                    {pageNumber}
                    </PageNumber>
                    <NextPage onClick={()=>onChangePageNumber('nextPage')} >
                    Next
                    </NextPage>
                </TurnPages>
                </PaginationBar>
            </div>
            
            )
    }
}
export {ShowRideRequests};

/*
id: "9"

name: "Coby Schroeder MD"

from: "Port Jada"

to: "South Anissa"

noOfSeats: 97

mobileNumber: "687.368.7717 x8376"

date: 1590681119

noOfLuggages: 49
*/