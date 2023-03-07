import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';


function PlacePage() {
    const [place, setPlace] = useState(null);
    const [showAllPhotos, setShowAllPhotos] = useState(false);
    const {id} = useParams();

    const emojis = {
        'pets' : 'xyz',
    }

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
                        <div className='gap-4 text-center md:mx-auto lg:mx-auto'>
                            <img src={'http://localhost:3000/uploads/'+photo} alt="" />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

  return (
    <div className='mt-4 lg:mx-auto -mx-8 px-8 py-8 max-w-screen-lg justify-center'>
        <div>
            <h1 className='text-3xl md:text-red-500 lg:text-blue-500 sm:text-violet-500'>{place.title}</h1>

            <div className='flex my-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mt-1 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <a className=' my-2 underline font-semibold text-sm' target="_blank" href={'https://maps.google.com/?q=' + place.address}>{place.address}</a>
            </div>

            <div className='relative'>
                <div className='grid gap-2 grid-cols-[2fr_1fr] md:grid-cols-[2fr_1fr_1fr] lg:grid-cols-[2fr_1fr_1fr] mt-4 rounded-2xl overflow-hidden'>
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

                    <div className='grid'>
                        {place.photos?.[3] && (
                            <img className='aspect-square object-cover' src={'http://localhost:3000/uploads/' + place.photos[3]} alt="" />
                        )}
                        <div className='overflow-hidden'>
                            {place.photos?.[4] && (
                                <img className='aspect-square object-cover relative top-2' src={'http://localhost:3000/uploads/' + place.photos[4]} alt="" />
                            )}
                        </div>
                    </div>

                </div>
                <button onClick={() => setShowAllPhotos(true)} className='absolute opacity-80 bottom-2 right-2 bg-white px-2 py-1 rounded-md text-sm shadow-lg'>Show more photos</button>
            </div>

            <div className='mt-16 mb-8'>
                <h2 className='text-2xl mb-2 font-semibold'>Description</h2>
                {place.description}
            </div>

            <div className='-mx-8 px-8 py-4'>
                <div>
                    <h2 className='font-semibold text-2xl'>Extra Info</h2>
                </div>
                <div className="mb-2 mt-2 text-sm text-gray-700 leading-5 whitespace-pre-wrap">{place.extraInfo}</div>
            </div>

            <div className='-mx-8 py-4 px-8'>
                <div>
                    <h2 className='font-semibold text-2xl'>Perks</h2>
                </div>
                <ul className='mt-4 flex flex-row gap-16'>
                    {place.perks?.length > 0 && place?.perks?.map(perk => (
                        <li className='p-4 border border-primary rounded-xl '>{perk}</li>
                    ))}
                </ul>
            </div>

            

            <div className='flex flex-row'>
                <div className='flex gap-12 mt-4 basis-2/3'>
                    <div className=''>
                        <div>
                            <h2 className='font-semibold text-lg'>Nearest University</h2>
                        </div>
                        <div className='mt-2'>{place.nearestSchool}</div>
                    </div>

                    <div>
                        <h2 className='font-semibold text-lg'>Lease Start</h2>
                        <p className='mt-2'>{place.leaseStart}</p>
                    </div>

                    <div>
                        <h2 className='font-semibold text-lg'>Lease End</h2>
                        <p className='mt-2'>{place.leaseEnd}</p>
                    </div>
                </div>

                <div className='ml-16 basis-1/3 px-4 py-2'>
                    <button className='bg-primary text-white hover:text-black rounded-xl font-semibold text-lg px-6 py-4 '>Contact the owner</button>
                </div>
            </div>
            
        </div> 
    </div>
  )
}

export default PlacePage