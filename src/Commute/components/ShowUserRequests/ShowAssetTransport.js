import React from 'react';
import {observer} from 'mobx-react';

import LoadingWrapperWithFailure from '../../../components/common/LoadingWrapperWithFailure';

import {RequestDetailsTable,TableCellLeftAligned,TableCellAlignedCenter,TableHeader,TableRow,
    StatusButton
} from './styledComponents.js';

@observer
class ShowAssetTransport extends React.Component{
    renderSuccessUI=()=>{
        const {tableHeaders,getRequests}=this.props;
        const rideRequests=getRequests('asset');
        return (
                    <RequestDetailsTable>
                      <TableRow>
                      {tableHeaders.map(eachOne=>{return <TableHeader>{eachOne}</TableHeader>})}
                      </TableRow>
                      {Object.values(rideRequests).map(request=>{
                      return <TableRow>
                                <TableCellLeftAligned>{request.from}</TableCellLeftAligned>
                                <TableCellLeftAligned>{request.to}</TableCellLeftAligned>
                                <TableCellLeftAligned>
                                {request['startTime']!==undefined?<span>From:{request.startTime.slice(0,21)} <br/>To:{request.endTime.slice(0,21)}</span>:
                                (request.date.slice(0,21))}
                                </TableCellLeftAligned>
                                <TableCellAlignedCenter>{request.noOfSeats}</TableCellAlignedCenter>
                                <TableCellAlignedCenter>{request.assetType}</TableCellAlignedCenter>
                                <TableCellAlignedCenter>{request.assetSentivity}</TableCellAlignedCenter>
                                <TableCellLeftAligned>
                                    {request.status==='Confirmed'?request.acceptedPersonDetails:(request.status==='Pending'?'Not Confirmed':'Expired')}
                                </TableCellLeftAligned>
                                <TableCellLeftAligned><StatusButton status={request.status}>{request.status.toUpperCase()}</StatusButton></TableCellLeftAligned>
                              </TableRow>})}
                    </RequestDetailsTable>
            )
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
            )
 
        
    }
}
export {ShowAssetTransport};