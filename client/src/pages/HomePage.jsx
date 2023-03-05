import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function HomePage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('/places').then(response => {
      setPlaces(response.data)
    })
  }, [])


  return (
    <div className='grid grid-cols-2 mb-2 md:grid-cols-3 lg:grid-cols-4 mt-8 gap-x-6 gap-y-8'>
      {places.length > 0 && places.map(place => (
        <Link to={'/places/' + place._id} >
          <div className='bg-gray-400 mb-2 rounded-xl flex'>
            {place.photos.length > 0 && (
              <img className=' rounded-xl aspect-square object-cover' src={'http://localhost:3000/uploads/' + place.photos[0]} alt='' />
            )}
          </div>

          <h3 className='font-bold'>{place.address}</h3>
          <h2 className='text-sm truncate text-gray-500'>{place.title}</h2>
          <h3 className='mt-1'><span className='font-semibold'>${place.price}</span> per night</h3>
        </Link>
      ))}
    </div>
    

  )
}

export default HomePage