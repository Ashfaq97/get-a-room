import React, { useState } from 'react'
import axios from 'axios'

function PhotosUploader({addedPhotos, onChange}) {
    const [photoLink, setPhotoLink] = useState('');

    async function addPhotoByLink(ev) {
        ev.preventDefault();
        const {data: filename} = await axios.post('/upload-by-link', {link: photoLink})
        onChange(prev => {
            return [...prev, filename]
        })
        setPhotoLink('');
    }

    async function uploadPhoto(ev) {
        const files = ev.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
          }
        const response = await axios.post('/upload', data, {
            headers: {
                'Content-type' : 'multipart/form-data'
            }
        })
        const {data: filenames} = response;
        console.log(filenames)
        onChange(prev => {
            return [...prev, ...filenames]
        })
        //setPhotoLink('');
    }

    function removePhoto(filename) {
        onChange([...addedPhotos.filter(photo => photo !== filename)])
    }

  return (
    <>
        <div className='flex gap-2'>
            <input 
                type="text" 
                value={photoLink} 
                onChange={ev => setPhotoLink(ev.target.value)} 
                placeholder='Add using a link...'></input>
            <button onClick={addPhotoByLink} className='bg-gray-200 px-4 rounded-2xl'>Add&nbsp;photo</button>
        </div>
        
        <div className='mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
            {addedPhotos.length > 0 && addedPhotos.map(link => (
                <div className='h-32 flex relative' key={link}>
                    <img className='rounded-2xl w-full object-cover' src={'http://localhost:3000/uploads/' + link} alt="" />
                    <button onClick={() => removePhoto(link)} className='absolute bottom-0 right-0 cursor-pointer p-2 text-white bg-black bg-opacity-50 rounded-xl'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button>
                </div>
            ))}
            <label className='h-32 border cursor-pointer flex items-center justify-center gap-2 bg-transparent rounded-2xl p-2 text-2xl text-gray-500'>
                <input type='file' multiple className="hidden" onChange={uploadPhoto} />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>

                Upload
            </label>
        </div>
    </>
  )
}

export default PhotosUploader