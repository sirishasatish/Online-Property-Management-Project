import { useParams,useNavigate,Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
export default function AddForm() {
    var formTitle = 'Add Property!!';
    var buttonTitle='Add Property!!';
  
    const [property, setProperty] = useState({ "title": "",
            "host_id": "",
            "city": "",
            "state": "",
            "description": "",
            "nightly_fee": "",
            "cleaning_fee": "",
            "service_fee": "",
            "amenities": "",
            "bedrooms": "",
            "bathrooms": "",
            "availability": "",
            "guests": "",
            "images": [],
            "available_start_date": "",
            "available_end_date": "",
            "category": "",
            "rating": ""})
    let { id } = useParams(); 
    // useEffect(() => {
    //     if(id){
    //     fetch('http://localhost:9000/properties?property_id='+id)
    //         .then(res => res.json())
    //         .then((data) => {
    //             setProperty(data)
    //         })
    //         .catch(console.log)
    //     }
    // });

    const navigate = useNavigate();
    const localstorage_user = JSON.parse(localStorage.getItem('user'));

    if (localstorage_user != null) {
        var userId = localstorage_user.user_id
    }
    if(id){
//PUT
formTitle='Edit Property!!'
buttonTitle='Edit Property'
            fetch("http://localhost:9000/properties?property_id=" + id)
            .then((res) => { return res.json()})
            .then((data) => {
                setProperty(data[0]);
                //console.log(new Date(property.checkOut).getMonth() + '/' + new Date(property.checkOut).getDate() + '/' + new Date(property.checkOut).getFullYear());
            }).catch(console.log)
    }
    const handleCancelClick = () => {
        navigate('/host/'+userId)
    }
    const handleAddForm = (e) => {
        if(id){
            e.preventDefault();
            var ame = e.target.amenities.value
            console.log(ame);
        var amenity = ame.split(",")
            let title =  e.target.title.value;
            let host_id = userId;
            let city =  e.target.city.value;
            let state =e.target.state.value;
            let description =  e.target.description.value;
            let nightly_fee =  e.target.nightly_fee.value;
            let cleaning_fee = e.target.cleaning_fee.value;
            let service_fee = e.target.service_fee.value;
            let amenities = amenity;
            let bedrooms = e.target.bedrooms.value;
            let bathrooms = e.target.bathrooms.value;
            let availability = e.target.availability.value;
            let guests = e.target.guests.value;
            let available_start_date =  e.target.available_start_date.value;
            let available_end_date =  e.target.available_end_date.value;
            let category= e.target.category.value;
            let images = ["assets/images/p11.jpeg", "assets/images/p12.jpeg","assets/images/p13.jpeg"]
    
            var property_ = { title,host_id,city,images,state,description,nightly_fee,cleaning_fee,service_fee,amenities, bedrooms,bathrooms,availability,guests,available_start_date,available_end_date,category }
    
            console.log(property_)
            fetch('http://localhost:9000/properties?property_id='+id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(property_)
            }).then((res) => { return res.json()})
            .then((data) => {
                // console.log(data);
                navigate('/host/' + userId);
            })
        }
        else{
            
            e.preventDefault();
            var ame = e.target.amenities.value
        var amenities = ame.split(",")
            var prop_details = {
                property_id: Date.now().toString(),
                title: e.target.title.value,
                host_id: userId,
                city: e.target.city.value,
                state: e.target.state.value,
                description: e.target.description.value,
                nightly_fee: e.target.nightly_fee.value,
                cleaning_fee: e.target.cleaning_fee.value,
                service_fee: e.target.service_fee.value,
                amenities: amenities,
                bedrooms: e.target.bedrooms.value,
                bathrooms: e.target.bathrooms.value,
                availability: e.target.availability.value,
                guests: e.target.guests.value,
                images: ["assets/images/p11.jpeg", "assets/images/p12.jpeg","assets/images/p13.jpeg"],
                available_start_date: e.target.available_start_date.value,
                available_end_date: e.target.available_end_date.value,
                category: e.target.category.value,
                rating: 0
            }
                fetch('http://localhost:9000/properties?user_id='+userId , { method: 'POST',headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}, mode: 'cors', body: JSON.stringify(prop_details) })
                    .then(res => { console.log( res.json()) })
                    .then((data) => {
                        navigate('/host/'+userId)
                    })
                    .catch(console.log)
            }
        
        }
    
        return (
            <div>
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-md-9">
                            <div class="card card-style">
                                <h2 class="card-title text-center">{formTitle}</h2>
                                <div class="card-body py-md-4">
                                    <form onSubmit={handleAddForm}>
                                        <div class="d-flex flex-row align-items-center justify-content-between">

                                            <input type="text" class="form-control" id="title" name="title" defaultValue={property.title} placeholder="Property Title" />&nbsp;
                                            <input type="text" class="form-control" id="city" name="city" defaultValue={property.city} placeholder="City" />&nbsp;
                                            <input type="text" class="form-control" id="state" name="state" defaultValue={property.state} placeholder="State" />

                                        </div>
                                        <div class="form-group">
                                            <input type="text" class="form-control" id="description" name="Description" defaultValue={property.description} placeholder="Description" />
                                        </div>
                                        <div class="d-flex flex-row align-items-center justify-content-between">
                                            <input type="text" class="form-control" id="nightly_fee" name="nightly_fee" defaultValue={property.nightly_fee} placeholder="Price per Night" />&nbsp;
                                            <input type="text" class="form-control" id="service_fee" name="service_fee" defaultValue={property.service_fee} placeholder="Service Fee" />&nbsp;
                                            <input type="text" class="form-control" id="cleaning_fee" name="cleaning_fee" defaultValue={property.cleaning_fee} placeholder="Cleaning Fee" />
                                        </div>

                                        <div class="d-flex flex-row align-items-center justify-content-between">
                                            <input type="text" class="form-control" id="guests" name="guests" defaultValue={property.guests} placeholder="Guests" />&nbsp;
                                            <input type="text" class="form-control" id="bedrooms" name="bedrooms" defaultValue={property.bedrooms} placeholder="Bedrooms" />&nbsp;
                                            <input type="text" class="form-control" id="bathrooms" name="bathrooms" defaultValue={property.bathrooms} placeholder="Bathrooms" />
                                        </div>
                                        <div class="d-flex flex-row align-items-center justify-content-between">
                                            <input type="text" class="form-control" id="availability" name="availability" defaultValue={property.availability} placeholder="Availability" />&nbsp;
                                            <input type="text" class="form-control" id="category" name="category" defaultValue={property.category} placeholder="Category" />&nbsp;
                                            <input type="text" class="form-control" id="amenities" name="amenities" defaultValue={property.amenities} placeholder="Amenities" />

                                        </div>
                                        <div class="d-flex flex-row align-items-center justify-content-between">
                                            <label for="available_start_date" class="form-label">Available Start Date</label>
                                            <input type="date" class="form-control" id="available_start_date" name="available_start_date" defaultValue={property.available_start_date} placeholder="available_start_date" />
                                        </div>

                                        <div class="d-flex flex-row align-items-center justify-content-between">
                                            <label for="available_end_date" class="form-label">Available end Date</label>
                                            <input type="date" class="form-control" id="available_end_date" name="available_end_date" defaultValue={property.available_end_date} placeholder="available_end_date" />
                                        </div>
                                        
                                        <div class="d-flex flex-row align-items-center justify-content-between">

                                            
                                            <button type="submit" class="btn btn-danger">{buttonTitle}</button>
                                            
                                            <button type="submit" class="btn btn-danger" onClick={handleCancelClick} >Cancel</button>

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
        );
    }
    