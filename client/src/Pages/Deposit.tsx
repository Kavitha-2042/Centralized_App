import React from 'react'
import Header from '../Components/Header'

const Deposit = () => {
  return (
    <div>
        <Header/>
        <div className='mt-10 text-center text-2xl'>
            <h1 >Enter amount to Deposit!</h1>
            <input 
            placeholder='Amount(ETH)'
            name='amount'
            type="number"
            step="0.0001"
            className='outline-sky-200 mt-8 text-center p-2 rounded-2xl'
            />
        </div>
        
    </div>
  )
}

export default Deposit