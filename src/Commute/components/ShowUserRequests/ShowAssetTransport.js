import React from 'react';
import {observer} from 'mobx-react';


import {NoOfRequests,RequestHeader,FilterAndSort,Sort,Filter,RequestDetailsTable,TableCellLeftAligned,TableCellAlignedCenter,TableHeader,TableRow,
    PaginationBar,PreviousPage,NextPage,Button,TurnPages,PageNumber
} from './styledComponents.js';

@observer
class ShowAssetTransport extends React.Component{
    render(){
        const {onChangePageNumber,onChangeFilter,onChangeSortBy,renderPageRequests,limit,pageNumber,tableHeaders,getRequests}=this.props;
        const rideRequests=renderPageRequests(getRequests('asset'));
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
                      {tableHeaders.map(eachOne=>{return <TableHeader>{eachOne}</TableHeader>})}
                      </TableRow>
                      {Object.values(rideRequests).map(request=>{
                      return <TableRow>
                                <TableCellLeftAligned>{request.from}</TableCellLeftAligned>
                                <TableCellLeftAligned>{request.to}</TableCellLeftAligned>
                                <TableCellLeftAligned>{request.date}</TableCellLeftAligned>
                                <TableCellAlignedCenter>{request.noOfSeats}</TableCellAlignedCenter>
                                <TableCellAlignedCenter>{request.assetType}</TableCellAlignedCenter>
                                <TableCellAlignedCenter>{request.assetSentivity}</TableCellAlignedCenter>
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
export {ShowAssetTransport};