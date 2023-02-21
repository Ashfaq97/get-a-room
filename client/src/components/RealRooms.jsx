import React from 'react'
import { useState, useEffect } from 'react'

function RealRooms() {
    const [data, setData] = useState("")

    useEffect(() => {
        fetch('http://localhost:3000')
        .then((res) => res.json())
        .then((data) => setData(data))
    }, [])

  return (
    <>
        <h1 className='bg-blue-300'>{data}</h1>
        <h3 className='bg-red-400' >test</h3>
        {/* {data.Items?.map((room) => (
            <>
                <p key={room.id}>{room.noOfOccupants}</p>
                <p>{room.noOfBedrooms}</p>
            </>
        ))} */}
    </>
    
  )
}

export default RealRooms