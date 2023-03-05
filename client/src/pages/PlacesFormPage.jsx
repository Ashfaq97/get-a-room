import React, { useEffect, useState } from 'react'
import Perks from '../components/Perks';
import PhotosUploader from '../components/PhotosUploader';
import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';
import AccountNav from '../components/AccountNav';

function PlacesFormPage() {
    const {id} = useParams();
    const [title,setTitle] = useState('');
    const [addedPhotos,setAddedPhotos] = useState([]);
    const [address,setAddress] = useState('');
    const [description,setDescription] = useState('');
    const [perks,setPerks] = useState([]);
    const [extraInfo,setExtraInfo] = useState('');
    const [leaseStart,setLeaseStart] = useState('');
    const [leaseEnd,setLeaseEnd] = useState('');
    const [nearestSchool,setNearestSchool] = useState('');
    const [price,setPrice] = useState(1000);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if(!id) {
            return;
        } 
        axios.get('/places/' + id).then(response => {
            const {data} = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setExtraInfo(data.extraInfo);
            setNearestSchool(data.nearestSchool);
            setLeaseStart(data.leaseStart);
            setLeaseEnd(data.leaseEnd);
            setPerks(data.perks);
            setPrice(data.price);
        })
    }, [id])

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

    async function savePlace(ev) {
        ev.preventDefault();

        if(id) {
            await axios.put('/places/' + id, {
                id, title, address, addedPhotos, 
                description, perks, extraInfo, 
                nearestSchool, leaseStart, leaseEnd, price
            })
            setRedirect(true);
        } else {
            await axios.post('/places', {
                title, address, addedPhotos, 
                description, perks, extraInfo, 
                nearestSchool, leaseStart, leaseEnd, price
            })
            setRedirect(true);
        }
    }

    if(redirect) {
        return <Navigate to={'/account/places'} />
    }

  return (
    <>
        <AccountNav />
        <div>
                <form onSubmit={savePlace}>
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
                    <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

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

                    {inputHeader('Rent')}
                    <input 
                        type="number" 
                        value={price} 
                        onChange={ev => setPrice(ev.target.value)} 
                        placeholder='$'/>

                    <button className='primary my-4'>Save</button>                    

                </form>

            </div>
    </>
  )
}

export default PlacesFormPage