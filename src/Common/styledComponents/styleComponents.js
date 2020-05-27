
import styled from '@emotion/styled';

export const FormDashboard=styled.div`
    width:100vw;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:#fafafa;
`;

export const Form=styled.div`
    width:400px;
    min-height:450px;
    display:flex;
    flex-direction:column;
    align-items:center;
    padding:20px 25px;
    border:1px solid lightgrey;
    box-shadow: 0 4px 40px 0 rgba(23, 31, 70, 0.16);
    margin:2% 0%;
    border-radius:2px;
`;
export const NoOfListItems=styled.div`
  
    display:flex;
    margin-right:auto;
    align-items:center;
    padding:10px 0px;
`;
export const ListItemsDisplay=styled.div`
        display:flex;
`;
export const ListItemsCount=styled.div`
        border:2px solid lightgrey;
        padding:8px 10px;
`;
export const ChangeNoOfSeats=styled.span`
        border:2px solid lightgrey;
        padding:8px 10px;
`;
export const ChangeNoOfListItems=styled.div`
        border:2px solid lightgrey;
        padding:8px 10px;
`;
export const DateAndTimeStyle=styled.div`
    display:flex;
    flex-direction:column;
    margin-right:auto;
    align-items:center;
    padding:10px 0px;
    padding:5px;
    width:100%;
`;
export const DataAndTimeLabel=styled.label`
    width:inherit;
`;
export const DataAndTimeDisplay=styled.input`
    border:1px solid lightgrey;
    padding:2px;
    flex-grow:1;
    width:100%;
    margin:8px 0px;
`;

export const Dropdown=styled.div`
        position: relative;
        display: inline-block;
        flex-grow:none;
        padding:10px 0px;
        width:100%;
`;
export const DropdownList=styled.select`

        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content:center;
         color: black;
         position:relative;
         width:100%;
         padding:8px 0px;
         background-color:white;
         
`;
export const DropdownListOption=styled.option`
    display:flex;
        flex-direction:row;
        align-items:center;
        justify-content:center;
         color: #7e858e;
         position:relative;
         width:100%;
         padding:5px 0px;
`;