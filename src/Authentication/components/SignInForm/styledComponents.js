import styled from '@emotion/styled'
import {
   Logo,
   LogoImageContainer,
   Typo14DarkBlueGreyHKGroteskRegular
} from '../../../Common/styleGuides/StyleGuides.js'

const FormType = styled.form`
   width: 350px;

   height: 500px;
   border-radius: 8px;
   background-color: var(--white);
   display: flex;
   flex-direction: column;
   justify-content: space-around;
   align-items: start;
   box-shadow: 0 4px 40px 0 rgba(23, 31, 70, 0.16);
   padding: 45px;
`
const FormDashBoard = styled.div`
   width: 100vw;
   height: 100vh;
   background-color: ice-blue;
   display: flex;
   flex-wrap: wrap;
   justify-content: center;
   align-items: center;
   background-color: #fafafa;
`
const LogInPageLink = styled.a`
   color: blue;
`

const PasswordAlert = styled.span`
   color: red;
   font-size: 13px;
`
export {
   FormType,
   FormDashBoard,
   LogoImageContainer,
   Logo,
   Typo14DarkBlueGreyHKGroteskRegular as LoginLink,
   LogInPageLink,
   PasswordAlert
}
//536
//687
