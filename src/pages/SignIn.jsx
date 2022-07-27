import React from 'react'
import SignInForm from '../components/SignInForm'
import SignUpForm from '../components/SignUpForm';
import { useStateContext } from '../contexts/ContextProvider';
import { useState } from "react";

function SignIn() {

    const { isRegistered } = useStateContext();

    if(isRegistered){
        return (
            <div>
                <SignInForm />
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