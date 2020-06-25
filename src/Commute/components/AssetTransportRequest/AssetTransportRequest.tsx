import React from 'react'
import { observer, inject } from 'mobx-react'
import { observable, action } from 'mobx'

import moment from 'moment'

import { Typo20DarkBlueGreyHKGrotestBold as FormHeadingText } from '../../styleGuides/StyleGuides'
import { Form, FormDashboard } from '../../styledComponents/styleComponents'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { withHeader } from '../../Hocs/withHeader'
import { InputField } from '../Common/components/InputField'
import { DateAndTime } from '../Common/components/DateTime'
import { FlexibleDateTime } from '../Common/components/FlexibleDateTime'
import { Button } from '../Common/components/Button'
import { DisplayDropDown } from '../Common/components/DisplayDropDown'
import { DisplayListOfElements } from '../Common/components/DisplayListOfElements'

import {
   CheckBox,
   FlexibleTimings,
   FlexibleTimingsLabel
} from '../RideRequest/styledComponents'
import strings from '../../i18n/strings.json'
import { CommuteStore } from "../../stores/CommuteStore/index"
const assetType = {
   listTitle: 'ASSET TYPE',
   listItems: [
      {
         key: 'Electronics',
         text: 'Electronics',
         value: 'Electronics'
      },
      {
         key: 'Bags',
         text: 'Bags',
         value: 'Bags'
      },
      {
         key: 'Others',
         text: 'Others',
         value: 'Others'
      }
   ],
   placeholder: 'Select Asset Type'
}
const assetSensitivity = {
   listTitle: 'ASSET SENSITIVITY',
   listItems: [
      {
         key: 'Normal',
         text: 'Normal',
         value: 'Normal'
      },
      {
         key: 'Sensitive',
         text: 'Sensitive',
         value: 'Sensitive'
      },
      {
         key: 'Highly Sensitive',
         text: 'Highly Sensitive',
         value: 'Highly_Sensitive'
      }
   ],
   placeholder: 'Select Asset Sensitivity'
}
interface InjectedProps extends RouteComponentProps{

}
interface AssetTransportRequestProps extends InjectedProps{
   commuteStore:CommuteStore,
}
@inject('commuteStore')
@observer
class AssetTransportRequest extends React.Component<AssetTransportRequestProps> {
   @observable isCheckedFlexibleTimings
   @observable displayError
   @observable from
   @observable to
   @observable details
   @observable dateTime
   @observable startDateTime
   @observable endDateTime
   @observable assets
   @observable assetType
   @observable assetSensitivity
   constructor(props) {
      super(props)
      this.init()
   }
   @action.bound
   init() {
      this.isCheckedFlexibleTimings= false
      this.displayError = false
      this.from = ''
      this.to = ''
      this.dateTime = new Date()
      this.startDateTime = ''
      this.endDateTime = ''
      this.assets = 0
      this.assetType = ''
      this.assetSensitivity = ''
      this.details = ''
   }
   onClickFlexibleTimings = () => {
      this.isCheckedFlexibleTimings = !this.isCheckedFlexibleTimings
   }
   onChangeRequestFrom = event => {
      this.from = event.target.value
      this.displayError = false
   }
   onChangeRequestTo = event => {
      this.to = event.target.value
      this.displayError = false
   }
   onChangeTime = time => {
      this.dateTime = moment(time).format('YYYY-MM-DD HH:mm:ss')
   }
   onChangeFromTime = time => {
      this.startDateTime = moment(time).format('YYYY-MM-DD HH:mm:ss')
   }
   onChangeToTime = time => {
      this.endDateTime = moment(time).format('YYYY-MM-DD HH:mm:ss')
   }
   onChangeNoOfAssets = (count:number) => {
      this.assets = count
   }
   onChangeAssetType = (value:string) => {
      this.assetType = value
   }
   onChangeAssetSensitivity = (value:string) => {
      this.assetSensitivity = value
   }
   onChangeWhomToDeliver = event => {
      this.details = event.target.value
   }
   onSubmitRequest = () => {
      this.displayError = true

      let formDetails = [
         this.from,
         this.to,
         this.assets,
         this.assetType,
         this.assetSensitivity,
         this.details
      ]

      let count = 0
      formDetails.forEach(eachDetail => {
         if (eachDetail.length === 0 || eachDetail === 0) {
            count++
         }
      })
      if (!this.isCheckedFlexibleTimings) {
         if (count === 0 && this.dateTime.length !== 0) {
            const assetRequestData = {
               origin: this.from,
               destination: this.to,
               flexible_with_time: false,
               datetime: this.dateTime,
               start_datetime: null,
               end_datetime: null,
               assets_quantity: this.assets,
               asset_type: this.assetType.toUpperCase(),
               asset_sensitivity: this.assetSensitivity.toUpperCase(),
               whom_to_deliver: this.details
            }
            this.postAssetTransportRequest(assetRequestData)
         }
      } else {
         if (
            count === 0 &&
            this.startDateTime.length !== 0 &&
            this.endDateTime.length !== 0
         ) {
            const assetRequestData = {
               origin: this.from,
               destination: this.to,
               flexible_with_time: true,
               datetime: null,
               start_datetime: this.startDateTime,
               end_datetime: this.endDateTime,
               assets_quantity: this.assets,
               asset_type: this.assetType.toUpperCase(),
               asset_sensitivity: this.assetSensitivity.toUpperCase(),
               whom_to_deliver: this.details
            }
            this.postAssetTransportRequest(assetRequestData)
         }
      }
   }
   getInjectedProps=()=>this.props as AssetTransportRequestProps
   async postAssetTransportRequest(assetRequestData) {
      const {
         commuteStore: { postAssetTransportRequest,getAssetTrasportRequestAPIStatus }
      } = this.getInjectedProps()
      await postAssetTransportRequest(assetRequestData)
      if(getAssetTrasportRequestAPIStatus===200){
         alert('Submitted Succesfully')
         this.init()
      this.displayError = false
      }
      
      
   }
   render() {
      const {
         from,
         to,
         details,
         assets,
         dateTime,
         isCheckedFlexibleTimings,
         onClickFlexibleTimings,
         onSubmitRequest,
         onChangeRequestFrom,
         onChangeRequestTo,
         displayError,
         onChangeTime,
         onChangeFromTime,
         onChangeToTime,
         onChangeNoOfAssets,
         onChangeAssetType,
         onChangeAssetSensitivity,
         onChangeWhomToDeliver
      } = this

      return (
         <FormDashboard>
            <Form>
               <FormHeadingText>
                  {strings.text.assetTranportRequest}
               </FormHeadingText>
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
                     startDate={dateTime}
                     label={strings.label.dateAndTime}
                     onChangeTime={onChangeTime}
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
                  listData={{ title: strings.text.noOfAssets }}
                  onChange={onChangeNoOfAssets}
                  displayError={displayError}
                  intial={assets}
               />
               <DisplayDropDown
                  data={assetType}
                  onChange={onChangeAssetType}
                  displayError={displayError}
               />
               <DisplayDropDown
                  data={assetSensitivity}
                  onChange={onChangeAssetSensitivity}
                  displayError={displayError}
               />
               <InputField
                  placeholderText={strings.placeholderText.nameMobileNumber}
                  type={strings.type.text}
                  label={strings.label.whomToDeliver}
                  onChange={onChangeWhomToDeliver}
                  displayError={displayError}
                  value={details}
               />
               <Button
                  buttonText={strings.text.request}
                  onClickFunction={onSubmitRequest}
               />
            </Form>
         </FormDashboard>
      )
   }
}
export default withRouter(withHeader(AssetTransportRequest))