/*global expect*/
/*global jest*/

import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Router, Route, withRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { createMemoryHistory } from 'history'

import { AuthService } from '../../services/AuthService'
import { AuthStore } from '../../stores'
import getUserSignInResponse from '../../fixtures/getUserSignUpResponse.json'

import SignInFormRoute from './SignInFormRoute.js'

const LocationDisplay = withRouter(({ location }) => (
   <div data-testid='location-display'>{location.pathname}</div>
))

describe('SignInRoute Tests', () => {
   let authService
   let authStore

   beforeEach(() => {
      authService = new AuthService()
      authStore = new AuthStore(authService)
   })

   afterEach(() => {
      jest.resetAllMocks()
   })

   it('should render username and password empty error message', () => {
      const { getByText, getByRole } = render(
         <Router history={createMemoryHistory()}>
            <SignInFormRoute authStore={authStore} />
         </Router>
      )
      const signInButton = getByRole('button', { name: 'SIGN UP' })

      fireEvent.click(signInButton)
   })

   it('should render password empty error message', () => {
      const { getByText, getByPlaceholderText, getByRole } = render(
         <Router history={createMemoryHistory()}>
            <SignInFormRoute authStore={authStore} />
         </Router>
      )
      let username = 'test-user'
      let usernameField = getByPlaceholderText('Username')
      let signInButton = getByRole('button', { name: 'SIGN UP' })

      fireEvent.change(usernameField, { target: { value: username } })
      fireEvent.click(signInButton)
   })

   it('should submit sign-in on press enter', () => {
      const { getByLabelText, getByPlaceholderText, getByRole } = render(
         <Router history={createMemoryHistory()}>
            <SignInFormRoute authStore={authStore} />
         </Router>
      )
      const username = 'test-user'
      const password = 'test-password'

      let usernameField = getByPlaceholderText('Username')
      let passwordField = getByPlaceholderText('Password')
      let signInButton = getByRole('button', { name: 'SIGN UP' })

      fireEvent.change(usernameField, { target: { value: username } })
      fireEvent.change(passwordField, { target: { value: password } })
      fireEvent.keyPress(signInButton, { key: 'Enter', code: 'Enter' })
   })

   it('should render signInRoute loading state', async () => {
      const { getByLabelText, getByPlaceholderText, getByRole } = render(
         <Router history={createMemoryHistory()}>
            <SignInFormRoute authStore={authStore} />
         </Router>
      )
      const username = 'test-user'
      const password = 'test-password'

      let usernameField = getByPlaceholderText('Username')
      let passwordField = getByPlaceholderText('Password')
      let signInButton = getByRole('button', { name: 'SIGN UP' })

      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockSignInAPI = jest.fn()
      mockSignInAPI.mockReturnValue(mockLoadingPromise)
      authService.signInAPI = mockSignInAPI

      fireEvent.change(usernameField, { target: { value: username } })
      fireEvent.change(passwordField, { target: { value: password } })
      fireEvent.click(signInButton)

      getByRole('button', { disabled: true })
   })

   it('should render signInRoute success state', async () => {
      const history = createMemoryHistory()
      const route = '/sign-in/'
      history.push(route)

      const { getByRole, queryByRole, getByTestId } = render(
         <Provider authStore={authStore}>
            <Router history={history}>
               <Route path='/sign-in/'>
                  <SignInFormRoute />
               </Route>
               <Route path='/coomute-dashboard'>
                  <LocationDisplay />
               </Route>
            </Router>
         </Provider>
      )
      const signInButton = getByRole('button', { name: 'SIGN UP' })

      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve(getUserSignInResponse)
      })
      const mockSignInAPI = jest.fn()
      mockSignInAPI.mockReturnValue(mockSuccessPromise)
      authService.signInAPI = mockSignInAPI
      fireEvent.click(signInButton)

      waitFor(() => {
         expect(
            queryByRole('button', { name: 'SIGN UP' })
         ).not.toBeInTheDocument()
         expect(getByTestId('location-display')).toHaveTextContent(
            '/commute-dashboard'
         )
      })
   })
   it('should render signInRoute failure state', () => {
      const { getByText, getByRole } = render(
         <Router history={createMemoryHistory()}>
            <SignInFormRoute authStore={authStore} />
         </Router>
      )
      const signInButton = getByRole('button', { name: 'SIGN UP' })

      const mockFailurePromise = new Promise(function(resolve, reject) {
         reject(new Error('error'))
      }).catch(() => {})
      const mockSignInAPI = jest.fn()
      mockSignInAPI.mockReturnValue(mockFailurePromise)
      authService.signInAPI = mockSignInAPI
      fireEvent.click(signInButton)

      waitFor(() => {
         getByText(/server-error/i)
      })
   })
})
