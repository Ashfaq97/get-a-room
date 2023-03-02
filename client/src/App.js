
import './App.css';
import HomePage from './pages/HomePage';
import { Route, Routes } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import PageLayout from './components/PageLayout';
import RegisterPage from './pages/RegisterPage';
import axios from 'axios';
import { UserContextProvider } from './UserContext';
import AccountPage from './pages/AccountPage';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<PageLayout />} >
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/account/:subpage?" element={<AccountPage/>} />
          <Route path="/account/:subpage/:action" element={<AccountPage/>} />             
        </Route>
      </Routes>
    </UserContextProvider>
    
  );
}

export default App;
