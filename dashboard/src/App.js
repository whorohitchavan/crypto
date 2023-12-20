import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Routes, Route } from 'react-router-dom'
import Login from './components/login'
import Register from './components/register'
import Coin from './routes/Coin'
import Home from './components/home'
import WishList from './components/wishlist'

function App() {


  const [coins, setCoins] = useState([])

  const url = 'https://api.coingecko.com/api/v3/coins/'

  useEffect(() => {
    axios.get(url).then((response) => {
      setCoins(response.data)
      // console.log(response.data[0])
    }).catch((error) => {
      console.log(error)
    })
  }, [])

  return (
    <>
 
      <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/home' element={<Home data={coins}/>}/>
          <Route path='/wishlist' element={<WishList coin={coins}/>}/>
          <Route path='/coin' >
                <Route path=':coinId' element={<Coin />} />
          </Route>
      </Routes>

    </>
  );
  

}


export default App;
