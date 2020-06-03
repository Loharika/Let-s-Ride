import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { observer, inject } from 'mobx-react'

const ProtectedRoute = inject('authStore')(
   observer(
      ({ component: Component, authStore, SIGN_IN_PATH, path, ...rest }) => {
         let accessToken = authStore.access_token
         //window.localStorage.setItem('path', path)
         return (
            <Route
               {...rest}
               render={props => {
                  if (accessToken !== undefined) {
                     return <Component />
                  } else {
                     return (
                        <Redirect
                           to={{
                              pathname: '/login-page'
                           }}
                        />
                     )
                  }
               }}
            />
         )
      }
   )
)
export { ProtectedRoute }
