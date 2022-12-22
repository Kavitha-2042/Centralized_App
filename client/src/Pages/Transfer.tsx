import { TextField } from '@mui/material'
import React from 'react'
import Header from '../Components/Header'

const Transfer = () => {
  return (
    <div>
        <Header/>
        <div>
            <TextField
            name='address'
            placeholder='Enter address here...'
            type=""
            />
        </div>
    </div>
  )
}

export default Transfer