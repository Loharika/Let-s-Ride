import React from 'react'
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'
import moment from 'moment'
import { Typo20DarkBlueGreyHKGrotestBold as FormHeadingText } from '../../styleGuides/StyleGuides'
import { Form, FormDashboard } from '../../styledComponents/styleComponents'

import { withRouter, RouteComponentProps } from 'react-router-dom'
import { withHeader } from '../../Hocs/withHeader'

import { InputField } from '../Common/components/InputField'
import { DateAndTime } from '../Common/components/DateTime'
import { Button } from '../Common/components/Button'
import { DisplayListOfElements } from '../Common/components/DisplayListOfElements'
import { FlexibleDateTime } from '../Common/components/FlexibleDateTime'
import { DisplayDropDown } from '../Common/components/DisplayDropDown'
import {
   CheckBox,
   FlexibleTimings,
   FlexibleTimingsLabel
} from './styledComponents'

import strings from '../../i18n/strings.json'
import { CommuteStore } from "../../stores/CommuteStore"
interface InjectedProps extends RouteComponentProps{}
interface TravelInfoProps extends InjectedProps{
   commuteStore:CommuteStore
}
@inject('commuteStore')
@observer
class TravelInfo extends React.Component <TravelInfoProps>{
   @observable isCheckedFlexibleTimings
   @observable displayError
   @observable from
   @observable to
   @observable dateTime
   @observable startDateTime
   @observable endDateTime
   @observable travelMedium
   @observable assetsQuantity
   constructor(props) {
      super(props)
      this.init()
   }
   @action.bound
   init() {
      this.isCheckedFlexibleTimings = false
      this.displayError = false
      this.from = ''
      this.to = ''
      this.dateTime = ''
      this.startDateTime = ''
      this.endDateTime = ''
      this.travelMedium = ''
      this.assetsQuantity = 0
   }
   onClickFlexibleTimings = (event:React.MouseEvent<HTMLInputElement>):void => {
      this.isCheckedFlexibleTimings = !this.isCheckedFlexibleTimings
   }
   onChangeFrom = (event:React.ChangeEvent<HTMLInputElement>):void => {
      this.from = event.target.value
      this.displayError = false
   }
   onChangeTo =  (event:React.ChangeEvent<HTMLInputElement>):void => {
      this.to = event.target.value
      this.displayError = false
   }
   onChangeDateTime =(time:string):void => {
      this.dateTime = moment(time).format('YYYY-MM-DD HH:mm:ss')
   }
   onChangeFromTime = (time:string):void => {
      this.startDateTime = moment(time).format('YYYY-MM-DD HH:mm:ss')
   }
   onChangeToTime = (time:string):void => {
      this.endDateTime = moment(time).format('YYYY-MM-DD HH:mm:ss')
   }
   onChangeAssetsQuantity = (assetsQuantity:number):void => {
      this.assetsQuantity = assetsQuantity
   }
   onChangeTravelMedium = (travelMedium:string):void => {
      this.travelMedium = travelMedium
   }
   onSubmitRequest = (event:React.MouseEvent<HTMLButtonElement>):void => {
      console.log(
         this.from,
         this.to,
         this.dateTime,
         this.assetsQuantity,
         this.travelMedium,
         this.dateTime,
         this.startDateTime,
         this.endDateTime
      )
      this.displayError = true

      let formDetails = [
         this.from,
         this.to,
         this.dateTime,
         this.assetsQuantity,
         this.travelMedium
      ]
      let count = 0
      formDetails.forEach(eachDetail => {
         if (eachDetail.length === 0 || eachDetail === 0) {
            count++
         }
      })
      if (!this.isCheckedFlexibleTimings) {
         if (count === 0 && this.dateTime.length !== 0) {
            this.displayError = false
            const travelInfoData = {
               origin: this.from,
               destination: this.to,
               flexible_with_time: false,
               datetime: this.dateTime,
               start_datetime: null,
               end_datetime: null,
               transport_medium: this.travelMedium,
               assets_quantity: this.assetsQuantity
            }
            this.shareTravelInfo(travelInfoData)
         }
      } else {
         if (
            count === 0 &&
            this.startDateTime.length !== 0 &&
            this.endDateTime.length !== 0
         ) {
            this.displayError = false
            const travelInfoData = {
               origin: this.from,
               destination: this.to,
               flexible_with_time: true,
               datetime: null,
               start_datetime: this.startDateTime,
               end_datetime: this.endDateTime,  
               transport_medium: this.travelMedium,
               assets_quantity: this.assetsQuantity
            }
            this.shareTravelInfo(travelInfoData)
         }
      }
   }
   async shareTravelInfo(travelInfoData) {
      const {
         commuteStore: { shareTravelInfo,getTravelInfoAPIStatus }
      } = this.props
      shareTravelInfo(travelInfoData)
      if(getTravelInfoAPIStatus===200){
         alert('Submitted Succesfully')
         this.init()
         this.displayError = false
      }
   }
   render() {
      const travelMediums = {
         listTitle: 'TRAVEL MEDIUM',
         listItems: [
            { key: 'BUS', text: 'Bus', value: 'BUS' },
            { key: 'TRAIN', text: 'Train', value: 'TRAIN' },
            { key: 'FLIGHT', text: 'Flight', value: 'FLIGHT' }
         ],
         placeholder: 'Select Travel Medium'
      }
      const {
         from,
         to,
         displayError,
         isCheckedFlexibleTimings,
         dateTime,
         assetsQuantity,
         onChangeFrom,
         onChangeTo,
         onChangeFromTime,
         onChangeToTime,
         startDateTime,
         endDateTime,
         onChangeDateTime,
         onClickFlexibleTimings,
         onChangeAssetsQuantity,
         onSubmitRequest,
         onChangeTravelMedium
      } = this
      return (
         <FormDashboard>
            <Form>
               <FormHeadingText>{strings.text.travelInfo}</FormHeadingText>
               <InputField
                  placeholderText={strings.placeholderText.ex}
                  type={strings.type.text}
                  label={strings.label.from}
                  onChange={onChangeFrom}
                  value={from}
                  displayError={displayError}
               />
               <InputField
                  placeholderText={strings.placeholderText.ex}
                  type={strings.type.text}
                  label={strings.label.to}
                  onChange={onChangeTo}
                  value={to}
                  displayError={displayError}
               />
               {isCheckedFlexibleTimings ? (
                  <FlexibleDateTime
                     onChangeFromTime={onChangeFromTime}
                     onChangeToTime={onChangeToTime}
                     displayError={displayError}
                  />
               ) : (
                  <DateAndTime
                     label={strings.label.dateAndTime}
                     onChangeTime={onChangeDateTime}
                     startDate={dateTime}
                     displayError={displayError}
                  />
               )}
               <FlexibleTimings>
                  <CheckBox
                     type={strings.type.checkbox}
                     onClick={onClickFlexibleTimings}
                     data-testid='flexibleTimings'
                  />
                  <FlexibleTimingsLabel>
                     {strings.label.flexibleTimings}
                  </FlexibleTimingsLabel>
               </FlexibleTimings>
               <DisplayListOfElements
                  listData={{ title: strings.text.assetsQuantity }}
                  onChange={onChangeAssetsQuantity}
                  displayError={displayError}
                  intial={assetsQuantity}
               />
               <DisplayDropDown
                  data={travelMediums}
                  onChange={onChangeTravelMedium}
                  displayError={displayError}
               />
               <Button
                  buttonText={strings.text.shareText}
                  onClickFunction={onSubmitRequest}
               />
            </Form>
         </FormDashboard>
      )
   }
}
export default withRouter(withHeader(TravelInfo))