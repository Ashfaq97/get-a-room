import axios from 'axios';
import React, { useEffect, useState } from 'react'

function HomePage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('/places').then(response => {
      setPlaces(response.data)
    })
  }, [])


  return (
    <div>
      {places.length > 0 && places.map(place => (
        <div>
          {place.title}
        </div>
      ))}
    </div>
    

  )
}

export default HomePage