/*global expect*/
/*global jest*/
import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Router, Route, withRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { createMemoryHistory } from 'history'

import { COMMUTE_DASHBOARD_SHARE_RIDE } from '../../constants/NavigationalConstants.js'

import authStore from '../../../Common/stores'

import commuteStore from '../../../Common/stores'
import { ShareRide } from '.'
describe('', () => {
   it('it should check whether the request details are getting posted or not ', () => {
      let history = createMemoryHistory()
      history.push(COMMUTE_DASHBOARD_SHARE_RIDE)
      const {
         getByPlaceholderText,
         getByRole,
         debug,
         getByTestId,
         getByLabelText
      } = render(
         <Provider authStore={authStore} commuteStore={commuteStore}>
            <Router history={history}>
               <Route path={COMMUTE_DASHBOARD_SHARE_RIDE}>
                  <ShareRide
                     onClickFlexibleTimings={() => {}}
                     onSubmitRequest={() => {}}
                  />
               </Route>
            </Router>
         </Provider>
      )
      const testfrom = 'hyderabad'
      const testto = 'kurnool'
      let rideRequestButton = getByRole('button', { name: 'SHARE' })
      let fromElement = getByLabelText('FROM*')
      let toElement = getByLabelText('TO*')
      fireEvent.change(fromElement, { target: { value: testfrom } })
      fireEvent.change(toElement, { target: { value: testto } })
      let dateElement = getByPlaceholderText('Select the date')
      fireEvent.change(dateElement, { target: { value: new Date() } })
      let flexibleTimingsElement = getByTestId('flexibleTimings')
      fireEvent.click(flexibleTimingsElement)
      //  let noOfSeatsElements=getByTestId('no of seats')
      //  let noOfLuggagesElements=getByTestId('no of luggages')
      //  let decrementSeatsElement=getByTestId('decrement-button no of seats');
      //  let incrementSeatsElement=getByTestId('increment-button no of seats');
      //  let decrementLuggagessElement=getByTestId('decrement-button no of luggages');
      //  let incrementLuggagesElement=getByTestId('increment-button no of luggages');
      //  expect(noOfSeatsElements).toHaveTextContent(0);
      //  fireEvent.click(incrementSeatsElement)
      //  expect(noOfSeatsElements).toHaveTextContent(1);
      //  expect(noOfLuggagesElements).toHaveTextContent(0);
      //  fireEvent.click(decrementLuggagessElement)
      //  fireEvent.click(decrementLuggagessElement)
      //  expect(noOfLuggagesElements).toHaveTextContent(0);
      //  fireEvent.click(rideRequestButton);
   })
})
