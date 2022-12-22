import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './Pages/Home';
import QRcode from './Pages/QRcode';
import SignIn from './Pages/SignIn';
import SignOut from './Pages/SignOut';
import SignUp from './Pages/SignUp';
import Deposit from './Pages/Deposit';
import WithDraw from './Pages/WithDraw';
import Transfer from './Pages/Transfer';


function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signout' element={<SignOut/>}/>
        <Route path='/qrcode' element={<QRcode/>}/>
        <Route path='/deposit' element={<Deposit/>}/>
        <Route path='/withdraw' element={<WithDraw/>}/>
        <Route path='/transfer' element={<Transfer/>}/>

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
