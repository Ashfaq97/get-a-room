import React from 'react'
import { post } from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateRoom(props) {
    const initialState = {
        room_id: "",
        total_rent: "",
        number_of_bedrooms: "",
        number_of_current_tenants: "",
        space_available_for: "",
        location: "",
        nearest_school: "",
        rent_per_person: "",
        current_roommates: {

        },
    }

    const [room, setRoom] = useState(initialState);

    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();

        async function postRoom () {
            try {
                const response = await post("/api/v1/rooms", room);
                navigate(`/api/v1/rooms/${response.data.room_id}`)
            } catch (error) {
                console.error(error);
            }
        }

        postRoom();
    }

    function handleChange(event) {
        setRoom({...room, [event.target.name] : event.target.value })
    }

  return (
    <div>CreateRoom</div>
  )
}

export default CreateRoom