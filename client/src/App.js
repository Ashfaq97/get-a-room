
import './App.css';
import Home from './components/HomePage';
import { Route, Routes } from "react-router-dom";
import LoginPage from './components/LoginPage';
import PageLayout from './components/PageLayout';
import RegisterPage from './components/RegisterPage';
import axios from 'axios';
import { UserContextProvider } from './UserContext';
import AccountPage from './components/AccountPage';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<PageLayout />} >
          <Route index element={<Home />} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/account" element={<AccountPage/>} />
        </Route>
      </Routes>
    </UserContextProvider>
    
  );
}

export default App;
