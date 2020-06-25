import React,{Component} from 'react'
import {Header} from '../../components/Header'
function withHeader<T>(WrappedComponent: React.ComponentType<T>){
   return class extends React.Component<T>{
      render() {
         const props=this.props as T;
         return (
            <React.Fragment>
               <Header {...props} />
               <WrappedComponent {...props} />
            </React.Fragment>
         )
      }
   }
}

export default withHeader
