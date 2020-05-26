import React from 'react';
import {inject,observer} from 'mobx-react';

import strings from '../../i18n/strings.json';

@inject('authStore')
@observer
class UserProfile extends React.Component{
    constructor(){
       super(); 
    }
    doNetworkCalls(){
        const {authStore:{getUserDetails}}=this.props;   
        getUserDetails();
    }
    componentDidMount(){
        this.doNetworkCalls();
    }
    render(){
        const {authStore:{userDetails}}=this.props;
        
        return (
            
            <React.Fragment>
                <div>{strings.name} : <input value={userDetails.name} type='text' onChange={()=>{}}/></div>
                <div>{strings.email} : <input value={userDetails.email} type='text' onChange={()=>{}}/></div>
                <div>{strings.gender} : <input value={userDetails.gender} type='text' onChange={()=>{}}/></div>
                <div>{strings.jobRole} : <input value={userDetails.jobRole} type='text' onChange={()=>{}}/></div>
                <div>{strings.department} : <input value={userDetails.department} type='text' onChange={()=>{}}/></div>
            </React.Fragment>
            )
    }
}
export {UserProfile};

