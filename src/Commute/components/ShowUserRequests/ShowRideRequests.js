import React from 'react';
import {observer} from 'mobx-react';
import {NoOfRequests,RequestHeader,FilterAndSort,Sort,Filter,RequestDetailsTable,TableCellLeftAligned,TableCellAlignedCenter,TableHeader,TableRow} from './styledComponents.js';
@observer
class ShowRideRequests extends React.Component{
    render(){
        // console.log(this.props.rideRequests[0]);
        // console.log(Object.values(this.props.rideRequests));
        const headers=['FROM','TO','DATE AND TIME','NUMBER OF PEOPLE','LUGGAGE QUANTITY','ACCEPTED PERSON DETAILS','STATUS']
        return (
            <div>
                <RequestHeader>
                <NoOfRequests>{this.props.rideRequests.length}  Tasks</NoOfRequests>
                <FilterAndSort>
                    <Sort>Sort</Sort>
                    <Filter>Filter</Filter>
                </FilterAndSort>
                </RequestHeader>
                    <RequestDetailsTable>
                      <TableRow>
                      {headers.map(eachOne=>{return <TableHeader>{eachOne}</TableHeader>})}
                      </TableRow>
                      {Object.values(this.props.rideRequests).map(request=>{
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