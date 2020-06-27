import styled from '@emotion/styled'
import { Typo14WhiteRubikMedium } from '../../../StyleGuides/Typos'

export const BaseButtonStyle = styled.button`
   background-color: teal;
   padding: 5px;
   border-radius: 5px;
   &:hover {
         background-color: red;
    }
`

export const Text = styled(Typo14WhiteRubikMedium)`
   font-weight: bold;
`
