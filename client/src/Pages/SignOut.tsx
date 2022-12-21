import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const SignOut = () => {

    const navigate = useNavigate()
    useEffect(()=>{
        localStorage.clear();
        setTimeout(() => {
            navigate('/')
            window.location.reload()
        }, 4000);
        toast.success("Thankyou!", {
            position: toast.POSITION.TOP_CENTER,
            theme: 'light',
            // autoClose: 3000
        })
    })

  return (
    <div>
        <ToastContainer/>
    </div>
  )
}

export default SignOut