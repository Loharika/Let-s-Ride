import styled from '@emotion/styled';
import {Typo18BrightBlueRobotoRegular,Typo14SteelHKGroteSkRegular} from '../../../Common/styleGuides/StyleGuides.js';
export const RiderRequestsView=styled.div`
        display:${props=>props.isRequestsView?'flex':'none'};
        flex-direction:column;
        position: absolute;
        z-index:1;
`;

export const RequestsDropdown=styled.div`
        position: relative;
        display: inline-block;
        flex-grow:none;
        padding:10px;
`;
export const RequestButton=styled.button`
        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content:center;
         color: #7e858e;
         position:relative;
`;
export const HeaderStyle = styled.div`
        height:auto;
        display:flex;
        justify-content:space-between;
        align-items:center;
        flex-wrap:wrap;
     
`;
export const RiderInfo=styled.div`
        display:flex;
        align-items:center;
`;
export const UserProfileIconElement=styled.img`
        width:50px;
        height:50px;
        border-radius:50%;
        margin:5px 30px;
`;
export const LogoImageContainer=styled.div`
       margin:5px 30px;
       
`;
export {Typo18BrightBlueRobotoRegular as ButtonText,Typo14SteelHKGroteSkRegular as Request};