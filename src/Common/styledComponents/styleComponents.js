import styled from '@emotion/styled'

export const Star = styled.sup`
   color: red;
`
export const FormDashboard = styled.div`
   width: 100vw;
   display: flex;
   justify-content: center;
   align-items: center;
   background-color: #fafafa;
   min-height: 420px;
`

export const Form = styled.div`
   width: 460px;

   align-self: center;
   display: flex;
   flex-direction: column;
   align-items: center;
   padding: 20px 20px;
   box-shadow: 0 4px 40px 0 rgba(23, 31, 70, 0.16);
   margin: 5% 0%;
   border-radius: 2px;
   background-color: white;
`
export const NoOfListItems = styled.div`
   display: flex;
   margin-right: auto;
   align-items: center;
   padding: 10px 0px;
`
export const ListItemsDisplay = styled.div`
   display: flex;
   margin-left: 15px;
`
export const ListItemsCount = styled.div`
   border: 1px solid lightgrey;
   padding: 8px 10px;
`
export const ChangeNoOfSeats = styled.span`
   border: 2px solid lightgrey;
   padding: 8px 10px;
`
export const ChangeNoOfListItems = styled.button`
   border: 1px solid lightgrey;
   padding: 8px 10px;
`
export const DateAndTimeStyle = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   padding: 10px 0px;
   width: 100%;
   flex-grow: 1;
   margin-right: auto;
`
export const DataAndTimeDisplay = styled.div`
   border: 1px solid lightgrey;
   padding: 2px;
   font-size: 13px;
   margin: 8px 0px;
   min-width: 100%;
   display: flex;
   justify-content: start;
   align-items: center;
   margin-right: auto;
   flex-shrink: 1;
`

export const Dropdown = styled.div`
   position: relative;
   display: flex;
   flex-grow: none;
   padding: 10px 0px;
   width: 100%;
   flex-direction: column;
`
export const DropdownList = styled.select`
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: center;
   color: black;
   position: relative;
   width: 100%;
   padding: 8px 0px;
`
export const DropdownListOption = styled.option`
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: center;
   color: #7e858e;
   position: relative;
   width: 100%;
   padding: 5px 0px;
`
export const ButtonStyle = styled.button`
   width: 100%;
   height: 40px;
   border-radius: 4px;
   background-color: #0b69ff;
   color: white;
   margin: 3px;
   padding: 3px;
`
export const FlexibleDateAndTimeStyle = styled.div`
   width: 100%;
   display: flex;
   justify-content: space-between;
   padding: 10px 0px;
`

export const InputTag = styled.input`
   width: 100%;
   border-radius: 2px;
   padding: 3px 2px;
   height: 30px;
   margin-top: 2px;
   flex-grow: 1;
   border: ${props => (props.isError ? '1px solid red' : '1px solid #d7dfe9')};
`

export const ErrorStyle = styled.div`
   width: 100%;
   color: ${props => (props.isError ? 'red' : 'white')};
   font-size: 9px;
   padding: 0px;
   margin: 0px;
`
export const InputFieldWithLabel = styled.div`
   width: 100%;
`
export const ErrorSymbol = styled.span`
   color: red;
   position: absolute;
   right: 10px;
   top: 10px;
   display: ${props => (props.isError ? 'flex' : 'none')};
`
export const InputFiledWithError = styled.div`
   display: flex;
   position: relative;
   width: 100%;
`
export const Icon = styled.div`
   margin-right: 5px;
`
