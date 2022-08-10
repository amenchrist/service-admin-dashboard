import React from 'react'
import SignInFormPage from '../components/SignInForm-page'
import SignUpForm from '../components/SignUpForm';
import { useStateContext } from '../contexts/ContextProvider';
import { useState } from "react";

function SignIn() {

    const { isRegistered } = useStateContext();

    if(isRegistered){
        return (
            <div>
                <SignInFormPage  />
            </div>
          )
    }else {
        return (
            <div>
                <SignUpForm />
            </div>
          )
    }

}

export default SignIn