
import './App.css';
import Home from './components/Home';
import { useState, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import Header from './components/Header';
import LoginPage from './components/LoginPage';
import PageLayout from './components/PageLayout';
import RegisterPage from './components/RegisterPage';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000'

function App() {

  // console.log("Hello from App");
  // const [data, setData] = useState("")

  //   useEffect(() => {
  //       fetch('http://localhost:3000')
  //       .then((res) => res.json())
  //       .then((data) => setData(data.message))
  //   }, [])

  //   console.log(data)


  return (

    <Routes>
      <Route path='/' element={<PageLayout />} >
        <Route index element={<Home />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
      </Route>
      
    </Routes>

    
  );
}

export default App;
