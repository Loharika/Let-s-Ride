import styled from '@emotion/styled'
import { Typo32DarkBlueGreyRubikRegular } from '../../styleGuides/StyleGuides.js'
import colors from '../../../Common/Theme/Colors';

export const MyRequestsHeader = styled.ul`
   list-style-type: none;
   margin: 0;
   padding: 0;
   overflow: hidden;

   border-bottom: 1px solid lightgrey;
`
export const MyRequestType = styled.button`
   float: left;
   display: block;
   color: ${colors.black};
   text-align: center;
   padding: 10px 12px;
   text-decoration: none;
   border-bottom:2px solid  ${props => (props.isSelected===true ? colors.brightBlue: 'none')};
  
`
export const MyRequestsTitle = styled(Typo32DarkBlueGreyRubikRegular)`
   font-size: 20px;
   width: 200px;
`
export const MyRequestsDashboard = styled.div`
   width: 80%;
   min-height: 500px;
   align-self: center;
`
export const RequestHeader = styled.div`
   width: 100%;
   display: flex;
   justify-content: space-between;
`
export const NoOfRequests = styled.span`
   padding: 3px 4px;
   align-self: center;
`
export const FilterAndSort = styled.div`
   display: flex;
`
export const Sort = styled.span`
   padding: 10px 10px;
`
export const Filter = styled.span`
   padding: 10px 10px;
`
export const RequestDetailsTable = styled.tbody`
   font-family: arial, sans-serif;
   border-collapse: collapse;
   width: 100%;
   height: 350px;
`
export const TableHeader = styled.th`
   border: 1px solid #dddddd;
   text-align: left;
   padding: 8px;
`
export const TableCellLeftAligned = styled.td`
   border: 1px solid #dddddd;
   text-align: left;
   padding: 8px;
`
export const TableRow = styled.tr`
   height: 25px;
`
export const TableCellAlignedCenter = styled.td`
   border: 1px solid #dddddd;
   text-align: center;
   padding: 8px;
`
export const Footer = styled.div`
   width: 100%;
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-bottom: auto;
`
export const AddRequestButton = styled.button`
   display: flex;
   padding: 5px 10px;
`

export const PageNumber = styled.div`
   padding: 5px 10px;
`
export const StatusButton = styled.div`
   background-color: ${props =>
      props.status === 'Confirmed'
         ? colors.greenishTeal
         : props.status === 'Pending' 
         ? colors.yellowOrange
         : colors.lightBlueGrey};
   padding: 3px 4px;
   font-weight: 700;
   border-radius: 20px;
   text-align: center;
   color: ${colors.white};
`
export const Pages = styled.div``
/*
export const Card=styled.div`
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 300px;
  margin: auto;
  text-align: center;
  font-family: arial;
  display:flex;
  flex-direction:column;
  align-items:center;
  padding:20px;
    `;
export const ProfileImage=styled.img`
    border-radius:50%;
    
`;
export const Name=styled.div`
    width: 100%;
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: 0.12px;
  color: var(--steel);
  margin:2px;
`;
export const MobileNumber=styled.div`
    color:grey;
`;
export const FlexibleTimings=styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    align-self:start;
`;
export const DateAndTime=styled.div`
  font-size: 13px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
 display:flex;
    justify-content:center;
    align-items:center;
    align-self:start;
`;
export const NoOfSeats=styled.div`
    color:grey;
`;
*/
