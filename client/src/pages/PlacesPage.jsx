import React, {useState} from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Perks from '../components/Perks';
import axios from 'axios';

function PlacesPage() {
    const {action} = useParams();
    const [title,setTitle] = useState('');
    const [address,setAddress] = useState('');
    const [addedPhotos,setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description,setDescription] = useState('');
    const [perks,setPerks] = useState([]);
    const [extraInfo,setExtraInfo] = useState('');
    const [leaseStart,setLeaseStart] = useState(null);
    const [leaseEnd,setLeaseEnd] = useState(null);
    const [nearestSchool,setNearestSchool] = useState('');
    const [price,setPrice] = useState(100);

    function inputHeader(text) {
        return (
          <h2 className="text-2xl mt-4">{text}</h2>
        );
    }
    
    function inputDescription(text) {
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        );
    }
    
    function preInput(header,description) {
        return (
            <>
            {inputHeader(header)}
            {inputDescription(description)}
            </>
        );
    }

    async function addPhotoByLink(ev) {
        ev.preventDefault();
        const {data: filename} = await axios.post('/upload-by-link', {link: photoLink})
        setAddedPhotos(prev => {
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
        setAddedPhotos(prev => {
            return [...prev, ...filenames]
        })
        //setPhotoLink('');
    }

  return (
    <div>
        {action !== 'new' && (
            <div className='text-center'>
            <Link className='bg-primary inline-flex text-white py-2 px-6 rounded-full' to={'/account/places/new'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Add new place
            </Link>
        </div>
        )}
        {action === 'new' && (
            <div>
                <form>
                    {preInput('Title', 'Title for your place. should be short and catchy as in advertisement')}
                    <input 
                        type="text" 
                        value={title} 
                        onChange={ev => setTitle(ev.target.value)} 
                        placeholder='title'/>

                    {inputHeader('Address')}
                    <input 
                        type="text" 
                        value={address} 
                        onChange={ev => setAddress(ev.target.value)} 
                        placeholder='address'/>

                    {preInput('Photos', 'more = better')}
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
                            <div>
                                <img className='rounded-2xl' src={'http://localhost:3000/uploads/' + link} alt="" />
                            </div>
                        ))}
                        <label className='border cursor-pointer flex items-center justify-center gap-2 bg-transparent rounded-2xl p-2 text-2xl text-gray-500'>
                            <input type='file' multiple className="hidden" onChange={uploadPhoto} />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                            </svg>

                            Upload
                        </label>
                    </div>

                    {inputHeader('Description')}
                    <textarea 
                        value={description} 
                        onChange={ev => setDescription(ev.target.value)} ></textarea>

                    {preInput('Perks', 'select all the perks for this place')}
                    <Perks 
                        selected={perks} 
                        onChange={setPerks} />

                    {preInput('Extra Info', 'house rules, etc')}
                    <textarea 
                        value={extraInfo} 
                        onChange={ev => setExtraInfo(ev.target.value)} ></textarea>

                    {preInput('Nearest School', 'nearest school to this place')}
                    <input 
                        type="text" 
                        value={nearestSchool} 
                        onChange={ev => setNearestSchool(ev.target.value)} 
                        placeholder='Stanford University'/>

                    {inputHeader('Lease start & end dates')}
                
                    <div className='grid gap-2 sm:grid-cols-3'>
                        <div>
                            {inputDescription('lease starts on...')}
                            <input 
                                value={leaseStart} 
                                onChange={ev => setLeaseStart(ev.target.value)} 
                                className='mt-1 text-gray-400 border p-2 rounded-2xl' 
                                type="date" 
                                name="leaseStart" />
                        </div>
                        <div>
                            {inputDescription('lease ends on...')}
                            <input 
                                value={leaseEnd} 
                                onChange={ev => setLeaseEnd(ev.target.value)} 
                                className='mt-1 text-gray-400 border p-2 rounded-2xl' 
                                type="date" 
                                name="leaseEnd" />
                        </div>
                    </div>

                    <button className='primary my-4'>Save</button>                    

                </form>

            </div>
        )}
        
    </div>
  )
}

export default PlacesPage