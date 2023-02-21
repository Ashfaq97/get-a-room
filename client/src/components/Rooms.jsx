import React from 'react'

function Rooms() {
    const sampleData = [
        {
            name : 'room1',
            totalBedrooms : 2,
            currentRoommates: 2,
            totalRoommates : 4
        }, 
        {
            name : 'room2',
            totalBedrooms : 3,
            currentRoommates: 2,
            totalRoommates : 5
        },
        {
            name : 'room3',
            totalBedrooms : 1,
            currentRoommates: 2,
            totalRoommates : 3
        },
        {
            name : 'room4',
            totalBedrooms : 2,
            currentRoommates: 3,
            totalRoommates : 4
        }
    ]

  return (
    <>
        <h2>Rooms</h2>
        {sampleData.map(item => (
            <>
                <h3>{item.name}</h3>
                <p>Number of Bedrooms: {item.totalBedrooms}</p>
            </>
        ))}
    </>
  )
}

export default Rooms