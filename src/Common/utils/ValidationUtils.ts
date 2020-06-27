export function validateUserName(userName){
    if(userName.length!==0){
        if(userName==='harika'){
            return {
                showErrorMessage:false,
                errorMessage:''
            }
        }
        return {
            showErrorMessage:true,
            errorMessage:'invalid username'
        }
        
    }
    else{
        return {
            showErrorMessage:true,
            errorMessage:'Required'
        }

    }
}