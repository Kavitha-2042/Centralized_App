import React, { useEffect} from 'react'
import { useAppDispatch, useAppState } from '../Redux/Hooks'
import { initialize } from '../Redux/Slice/userSlice'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Header = () => {

    const dispatch = useAppDispatch()
    const auth = useAppState((state)=>{
        return state.user.auth
    })

    useEffect(()=>{
      axios.get('/user/status')
      .then((statusResponse)=>{
        dispatch(initialize({ user: statusResponse.data.user, auth: statusResponse.data.auth}))
      })
      .catch(err=>console.log(err))
    },[dispatch, auth])

  return (
    <div>
        <div className='flex justify-between bg-blue-900 p-4 text-white text-xl'>
      <Link to='/' className='flex '>Home</Link>
      
      {
        auth?
        <div className='flex justify-between space-x-4'>
          
        </div>
        :
        <div className='flex justify-between space-x-4'>
        <Link to='/signup'>Signup</Link>
        <Link to='/signin'>Signin</Link>
        </div>
      }
      
    </div>
    </div>
  )
}

export default Header