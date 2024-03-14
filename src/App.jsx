import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Feed from './components/Feed';
import Search from './components/Search';
import Videos from './components/Videos';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Feed></Feed>}></Route>
        <Route path='/search/:searchID' element={<Search></Search>}></Route>
        <Route path='/video/:videoId' element={<Videos></Videos>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
