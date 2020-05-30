import React from 'react';
import {observer} from 'mobx-react';

import strings from '../../i18n/strings.json';
import {RequestDetailsTable,TableCellLeftAligned,TableCellAlignedCenter,TableHeader,TableRow,StatusButton
} from './styledComponents.js';


@observer
class ShowRideRequests extends React.Component{
    render(){
        const {renderPageRequests,tableHeaders,getRequests}=this.props;
        const rideRequests=renderPageRequests(getRequests(strings.text.ride.toLowerCase()));
        return (
            <React.Fragment>
                    <RequestDetailsTable>
                      <TableRow>
                      {tableHeaders.map(eachOne=>{return <TableHeader>{eachOne}</TableHeader>})}
                      </TableRow>
                      {Object.values(rideRequests).map(request=>{
                      return <TableRow>
                                <TableCellLeftAligned>{request.from}</TableCellLeftAligned>
                                <TableCellLeftAligned>{request.to}</TableCellLeftAligned>
                                <TableCellLeftAligned>
                                    {request['startTime']!==undefined?
                                    <span>From:{request.startTime.slice(0,21)} <br/>To:{request.endTime.slice(0,21)}</span>:
                                    (request.date.slice(0,21))}
                                </TableCellLeftAligned>
                                <TableCellAlignedCenter>{request.noOfSeats}</TableCellAlignedCenter>
                                <TableCellAlignedCenter>{request.noOfLuggages}</TableCellAlignedCenter>
                                <TableCellLeftAligned>
                                {request.status==='Confirmed'?request.acceptedPersonDetails:(request.status==='Pending'?'Not Confirmed':'Expired')}
                                </TableCellLeftAligned>
                                <TableCellLeftAligned><StatusButton status={request.status}>{request.status.toUpperCase()}</StatusButton></TableCellLeftAligned>
                              </TableRow>})}
                    </RequestDetailsTable>
            </React.Fragment>
            
            )
    }
}
export {ShowRideRequests};