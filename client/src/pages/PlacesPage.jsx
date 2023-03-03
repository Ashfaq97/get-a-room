import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import AccountNav from '../components/AccountNav';

function PlacesPage() {

    const [places, setPlaces] = useState([]);

    useEffect(() => {
        axios.get('/user-places').then(
            ({data}) => setPlaces(data)
        )
    }, [])

    console.log(places);
    
  return (
    <div>
        <AccountNav />

        <div className='text-center'>
            <Link className='bg-primary inline-flex text-white py-2 px-6 rounded-full' to={'/account/places/new'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Add new place
            </Link>
        </div>

        <div className='mt-4'>
            {places.length > 0 && places.map(place => (
                <Link to={'/account/places/' + place._id} className='flex my-4 cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl'>
                    <div className='flex w-32 h-32 bg-gray-300 grow rounded-xl shrink-0'>
                        {place.photos.length > 0 && (
                            <img className='w-full h-full rounded-xl' src={'http://localhost:3000/uploads/' + place.photos[0]} alt="" />
                        )}
                    </div>
                    <div className='grow-0 shrink'>
                        <h2 className='text-xl'>{place.title}</h2>
                        <p className='text-sm mt-2'>{place.description}</p>
                    </div>
                    
                </Link>
            ))}

        </div>
        
    </div>
  )
}

export default PlacesPage