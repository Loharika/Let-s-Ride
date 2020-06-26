import React, { ChangeEvent } from 'react'
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

import {
   CheckBox,
   FlexibleTimings,
   FlexibleTimingsLabel
} from './styledComponents'

import strings from '../../i18n/strings.json'
import { CommuteStore } from "../../stores/CommuteStore"
import { ShareRideObject } from "../../stores/types"
interface InjectedProps extends RouteComponentProps{}
interface ShareRideProps extends InjectedProps{
   commuteStore:CommuteStore
}
@inject('commuteStore')
@observer
class ShareRide extends React.Component<ShareRideProps> {
   @observable isCheckedFlexibleTimings
   @observable displayError
   @observable from
   @observable to
   @observable dateTime
   @observable startDateTime
   @observable endDateTime
   @observable seats
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
      this.seats = 0
      this.assetsQuantity = 0
   }
   onClickFlexibleTimings = (event:React.MouseEvent<HTMLInputElement>):void => {
      this.isCheckedFlexibleTimings = !this.isCheckedFlexibleTimings
   }
   onChangeRequestFrom = (event:React.ChangeEvent<HTMLInputElement>):void => {
      this.from = event.target.value
      this.displayError = false
   }
   onChangeRequestTo = (event:React.ChangeEvent<HTMLInputElement>):void => {
      this.to = event.target.value
      this.displayError = false
   }
   onChangeTime = (time:string):void => {
      this.dateTime = moment(time).format('YYYY-MM-DD HH:mm:ss')
   }
   onChangeFromTime = (time:string):void=> {
      this.startDateTime = moment(time).format('YYYY-MM-DD HH:mm:ss')
   }
   onChangeToTime = (time:string):void => {
      this.endDateTime = moment(time).format('YYYY-MM-DD HH:mm:ss')
   }
   onChangeNoOfSeats = (seats:number) :void=> {
      this.seats = seats
   }
   onChangeNoOfAssetsQuantity = (assetsQuantity:number):void => {
      this.assetsQuantity = assetsQuantity
   }
   onSubmitRequest = (event:ChangeEvent<HTMLButtonElement>):void  => {
      this.displayError = true

      let formDetails = [
         this.from,
         this.to,
         this.dateTime,
         this.seats,
         this.assetsQuantity
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
            const shareRideData = {
               origin: this.from,
               destination: this.to,
               flexible_with_time: false,
               start_datetime: null,
               end_datetime: null,
               datetime: this.dateTime,
               no_of_seats: this.seats,
               assets_quantity: this.assetsQuantity
            }
            this.shareRideInfo(shareRideData)
         }
      } else {
         if (
            count === 0 &&
            this.startDateTime.length !== 0 &&
            this.endDateTime.length !== 0
         ) {
            this.displayError = false
            const shareRideData = {
               origin: this.from,
               destination: this.to,
               flexible_with_time: true,
               datetime: null,
               start_datetime: this.startDateTime,
               end_datetime: this.endDateTime,
               no_of_seats: this.seats,
               assets_quantity: this.assetsQuantity
            }

            this.shareRideInfo(shareRideData)
         }
      }
   }
   getInjectedProps=()=>this.props as ShareRideProps
   async shareRideInfo(shareRideData:ShareRideObject){  
      const {
         commuteStore: { shareRideInfo ,getShareRideAPIStatus}
      } = this.props
      await shareRideInfo(shareRideData)
      if(getShareRideAPIStatus===200){
         alert('Submitted Succesfully')
         this.init()
         this.displayError = false
      }
      
   }
   render() {
      const {
         from,
         to,
         dateTime,
         seats,
         assetsQuantity,
         isCheckedFlexibleTimings,
         onClickFlexibleTimings,
         onSubmitRequest,
         onChangeRequestFrom,
         onChangeRequestTo,
         displayError,
         onChangeTime,
         onChangeFromTime,
         onChangeToTime,
         onChangeNoOfSeats,
         onChangeNoOfAssetsQuantity
      } = this

      return (
         <FormDashboard>
            <Form>
               <FormHeadingText>{strings.text.shareRide}</FormHeadingText>
               <InputField
                  placeholderText={strings.placeholderText.ex}
                  type={strings.type.text}
                  label={strings.label.from}
                  onChange={onChangeRequestFrom}
                  value={from}
                  displayError={displayError}
               />
               <InputField
                  placeholderText={strings.placeholderText.ex}
                  type={strings.type.text}
                  label={strings.label.to}
                  onChange={onChangeRequestTo}
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
                     onChangeTime={onChangeTime}
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
                  listData={{ title: strings.text.noOfSeatsAvailable }}
                  onChange={onChangeNoOfSeats}
                  displayError={displayError}
                  intial={seats}
               />
               <DisplayListOfElements
                  listData={{ title: strings.text.assetsQuantity }}
                  onChange={onChangeNoOfAssetsQuantity}
                  displayError={displayError}
                  intial={assetsQuantity}
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
export default withRouter(withHeader(ShareRide))
