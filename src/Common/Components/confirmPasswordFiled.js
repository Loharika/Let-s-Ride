import React from 'react';

function ConfirmPasswordField(props){
    
    const {onChangeConfirmPassword,password}=props;
    return (
        <input value={password} onChange={onChangeConfirmPassword}  type="password" placeholder='Confirm Password'/>
        )
}
export {ConfirmPasswordField};
