import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';


function PlacePage() {
    const [place, setPlace] = useState(null);
    const [showAllPhotos, setShowAllPhotos] = useState(false);
    const {id} = useParams();

    useEffect(() => {
        if(!id) return;

        axios.get('/places/' + id)
            .then(response => {
                setPlace(response.data)
            });
    }, [id]);

    if(!place) return '';

    if(showAllPhotos) {
        return(
            <div className='absolute bg-white inset-0 min-h-screen'>
                <div className='p-24 grid sm:grid-cols-1 gap-4'>
                    <div >
                        <button onClick={() => setShowAllPhotos(false)} className='fixed top-12 left-8 bg-white rounded-full border-black border-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    {place?.photos?.length > 0 && place.photos.map(photo => (
                        <div className='gap-4'>
                            <img src={'http://localhost:3000/uploads/'+photo} alt="" />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

  return (
    <div className='mt-4 bg-gray-100 -mx-8 px-8 py-8'>
        <div>
            <h1 className='text-3xl'>{place.title}</h1>

            <div className='flex my-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mt-1 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <a className=' my-2 underline font-semibold text-sm' target="_blank" href={'https://maps.google.com/?q=' + place.address}>{place.address}</a>
            </div>

            <div className='relative'>
                <div className='grid gap-2 grid-cols-[2fr_1fr] mt-4 rounded-2xl overflow-hidden'>
                    <div>
                        {place.photos?.[0] && (
                            <div>
                                <img className='aspect-square object-cover' src={'http://localhost:3000/uploads/' + place.photos[0]} alt="" />
                            </div>
                        )}
                    </div>

                    <div className='grid'>
                        {place.photos?.[1] && (
                            <img className='aspect-square object-cover' src={'http://localhost:3000/uploads/' + place.photos[1]} alt="" />
                        )}
                        <div className='overflow-hidden'>
                            {place.photos?.[2] && (
                                <img className='aspect-square object-cover relative top-2' src={'http://localhost:3000/uploads/' + place.photos[2]} alt="" />
                            )}
                        </div>
                    </div>

                </div>
                <button onClick={() => setShowAllPhotos(true)} className='absolute opacity-80 bottom-2 right-2 bg-white px-2 py-1 rounded-md text-sm shadow-lg'>Show more photos</button>
            </div>

            <div className='my-16'>
                <h2 className='text-2xl mb-2'>Description</h2>
                {place.description}
            </div>
        </div> 
    </div>
  )
}

export default PlacePage