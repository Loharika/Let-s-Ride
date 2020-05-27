import React from 'react';
import {inject,observer} from 'mobx-react';

import strings from '../../i18n/strings.json';
import {UserImage,UserProfileDashboard,UserProfileView,NameEmailGender,JobDepartment,UserDetail,UserDetailElement} from './styledComponents.js';
import {Label as UserDetailLabel} from '../../../Common/styleGuides/StyleGuides.js';
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
            
            <UserProfileDashboard>
            <UserProfileView>
                <UserImage src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png' alt='user-profile'/>
                <NameEmailGender>
                    <UserDetail><UserDetailLabel>{strings.name}:</UserDetailLabel> <UserDetailElement value={userDetails.name} type='text' onChange={()=>{}}/></UserDetail>
                    <UserDetail><UserDetailLabel>{strings.email}:</UserDetailLabel> <UserDetailElement value={userDetails.email} type='text' onChange={()=>{}}/></UserDetail>
                    <UserDetail><UserDetailLabel>{strings.gender}:</UserDetailLabel> <UserDetailElement value={userDetails.gender} type='text' onChange={()=>{}}/></UserDetail>
                </NameEmailGender>
                <JobDepartment>
                    <UserDetail><UserDetailLabel>{strings.jobRole}:</UserDetailLabel><UserDetailElement value={userDetails.jobRole} type='text' onChange={()=>{}}/></UserDetail>
                    <UserDetail><UserDetailLabel>{strings.department}:</UserDetailLabel> <UserDetailElement value={userDetails.department} type='text' onChange={()=>{}}/></UserDetail>
                </JobDepartment>

                </UserProfileView>
            </UserProfileDashboard>
            )
    }
}
export {UserProfile};

