import React from 'react';

function PasswordField(props){
    
    const {onChangePassword,password}=props;
    return (
        <input value={password} onChange={onChangePassword}  type="password" placeholder='Password'/>
        )
}
export {PasswordField};
