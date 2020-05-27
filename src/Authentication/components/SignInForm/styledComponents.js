import styled from '@emotion/styled';
import {Typo32DarkBlueGreyRubikRegular,Logo,LogoImageContainer,Typo14DarkBlueGreyHKGroteskRegular} from 
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
const SignUpButton=styled.button`
  width: 100%;
  height: 40px;
  border-radius: 4px;
  background-color: #0b69ff;
  color:white;
  padding:2px 3px;
`;
const LogInPageLink=styled.a`
  color:blue;
`;

const PasswordAlert=styled.span`
    color:red;
    font-size:13px;
`;
export {FormType,FormDashBoard,
SignUpButton,LogoImageContainer,Logo,Typo14DarkBlueGreyHKGroteskRegular as LoginLink,LogInPageLink
,PasswordAlert,
  
};
//536
//687

