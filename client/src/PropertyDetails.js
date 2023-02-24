import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Rating from './Rating';

export default function PropertyDetails({ property }) {
    const [Feedback, setFeedback]=useState('');
    const localstorage_user = JSON.parse(localStorage.getItem('user'));
    if(localstorage_user != null){
    var userId = localstorage_user.user_id
}
    const [text, setText] = useState('');
    const navigate = useNavigate();
    var x = [];
    var image = []
    if (property != undefined) {
        property.images.forEach(img => {
            image.push(
                <img class="prop" src={img} alt="property images" />)
        });

        property.amenities.forEach(prop => {
            x.push(<li> {prop} </li>)
        });

        const handleForm = (e) => {
            if(userId){
            var check_in = e.target.check_in.value
            var check_out = e.target.check_out.value
            var guests = e.target.guests.value

            if (property.availability === "Not Available") {
                setText("Sorry!! This Property is currently unavailable")
            }
            else if (check_in < property.available_start_date || check_in > property.available_end_date || check_out > property.available_end_date || check_out < property.available_start_date || check_out < check_in) {
                setText("Enter other dates as the property is available over " + property.availability + " days.")
            }
            else {
                var reservation_details = {
                    reservation_id: Date.now().toString(),
                    property_id: property.property_id,
                    user_id: userId,
                    stay_start: check_in,
                    stay_end: check_out,
                    guests: guests
                }

                fetch('http://localhost:9000/reservations?user_id='+userId, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, mode: 'cors', body: JSON.stringify(reservation_details) })
                    .then(res => { return res.json() })
                    .then((data) => {

                    })
                    .catch(console.log)
                setText("Thank you for reserving the property.")

            }
            e.preventDefault();
        }
            else{
                navigate('/login')
            }
        }
        const handleFeedback = (e)=>{
        e.preventDefault()
         setFeedback('Thankyou for submitting the feedback')
        e.target.comments.value=''
        e.target.ratingBtn.value=''
        }
        return (
            <div class="row" >
                <div class="column">
                    {image}
                </div>
                <div class="column" id="italic">
                    <h2>{property.title},{property.state}</h2>
                   
                    <p></p>
                    <div id="amenities">
                        <b ><u>Amenities</u></b>
                        <ul style={{ "list-style": "none" }}>
                            {x}
                        </ul>

                    </div>
                    <p><b><i> <u>DESCRIPTION</u></i></b></p>
                    <p id="desc"><i>{property.description}</i></p>
                    <p><b>Avaliability : </b>{property.availability}</p>
                    <p><b>Rooms : </b>{property.bedrooms}</p>
                    <p><b>Guests : </b>{property.guests}</p>
                    <p><b>Rating : </b>{property.rating}</p>
                    <form onSubmit={handleForm}>
                        <label htmlFor="start">Check-in:</label>
                        <input type="date" id="start" name="check_in"
                            defaultValue="2022-12-01"
                            min="2022-01-01" max="2023-12-31" />
                        <label htmlFor="end">Check-out:</label>
                        <input type="date" id="end" name="check_out"
                            defaultValue="2022-12-01"
                            min="2022-01-01" max="2023-12-31" />
                        <label htmlFor="guests">Guests:</label>
                        <input type="text" id="guests" defaultValue="1" name="guests" />
                        <p>Price Per Night: ${property.nightly_fee}</p>
                        <p>Cleaning Fee: ${property.cleaning_fee}</p>
                        <p>Service Fee: ${property.service_fee}</p>
                        {/* <p>Total Price: ${total_price}</p> */}
                        <button type="submit" class="btn btn-danger">Reserve</button>
                        <p>{text}</p>
                    </form>
                    <form onSubmit={handleFeedback}>
                        <label htmlFor="rating">Rating:</label>

                        <Rating />
                        <label htmlFor="comment">Comments:</label>
                        <br />
                        <textarea name="comments" rows="4" cols="50"></textarea>
                        <br />
                        <button type="submit" class="btn btn-danger">Submit Feedback</button>
                        <p>{Feedback}</p>
                    </form>
                </div>
            </div>

        );
    }
    else {
        return (
            <div>df</div>
        );
    }
}
