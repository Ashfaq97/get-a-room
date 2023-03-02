import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom';
import { UserContext } from '../UserContext'
import LoginPage from './LoginPage';
import PlacesPage from './PlacesPage';

function AccountPage() {
  const [redirect,setRedirect] = useState(null);
  const {ready, user, setUser} = useContext(UserContext);
  let {subpage} = useParams();
  if(subpage === undefined) {
    subpage = 'profile';
  }

  async function logout() {
    await axios.post('/logout');
    setRedirect('/');
    setUser(null);
  }

  if(!ready) {
    return 'Loading...';
  }

  if(ready && !user && !redirect) {
    return <Navigate to={'/login'} />
  } 

  if(redirect) {
    return <Navigate to={redirect} />
  }

  function linkClasses(type=null) {
    let classes = 'py-2 px-4 inline-flex gap-2 rounded-full';
    if(type === subpage) {
      classes += ' bg-primary text-gray-100'
    } else {
      classes += ' bg-gray-200'
    }
    return classes;
  }

  return (
    <div>
      <nav className='flex w-full justify-center mt-8 gap-4 mb-8'>
        <Link className={linkClasses('profile')} to={'/account'}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>

          My profile 
        </Link>
        <Link className={linkClasses('bookings')} to={'/account/bookings'}> 
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3" />
          </svg>

          My bookings 
        </Link>
        <Link className={linkClasses('places')} to={'/account/places'}> 
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>

          My accommodations 
        </Link>
      </nav>
      {subpage === 'profile' && (
        <div className='text-center max-w-lg mx-auto'>
          Logged in as {user.name} ({user.email}) <br></br>
          <button onClick={logout} className='primary max-w-sm mt-2'>
            Logout
          </button>
        </div>
      )}
      {subpage === 'places' && (
        <div>
          <PlacesPage />
        </div>
      )}
    </div>
  )
}

export default AccountPage