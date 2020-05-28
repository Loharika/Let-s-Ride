import styled from '@emotion/styled';
import {Typo32DarkBlueGreyRubikRegular,Typo14DarkBlueGreyHKGroteskRegular,Logo,LogoImageContainer} from 
'../../../Common/styleGuides/StyleGuides.js';
const FormType=styled.form`
  width:300px;
  height: 400px;
  border-radius: 8px;
  background-color: var(--white);
  display:flex;
  flex-direction:column;
  justify-content:space-around;
  align-items:start;
  `;
const FormDashBoard=styled.div`
  width: 100vw;
  height: 100vh;
  background-color:ice-blue;
  display:flex;
  flex-wrap:wrap;
  justify-content:center;
  align-items:center;
`;
const LogInPageLink=styled.a`
  color:blue;
`;
const SignUpPageLink=styled.a`
    color:blue;
    `;
const LogInDetailsAlert=styled.span`
    color:red;
    font-size:13px;
`;
export {FormType,FormDashBoard,Typo32DarkBlueGreyRubikRegular as FormHeading,LogoImageContainer,Logo,Typo14DarkBlueGreyHKGroteskRegular as LoginLink,LogInPageLink
  ,SignUpPageLink,LogInDetailsAlert
  
};
//536
//687