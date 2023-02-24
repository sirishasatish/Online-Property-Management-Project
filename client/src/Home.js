import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';

import Navbar from './Navbar'
import Footer from './Footer'
import Sidemenu from './Sidemenu';
import Jumbotron from './Jumbotron';


export default function Home({ page }) {
    const [filterText, setFilterText] = useState('');
    const [props, setProp] = useState([]);
    const [propId, setPropClick] = useState('');
    const [cityFilter, setCityFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    var path;
    let { id } = useParams();
    if (page == "favorites") {
        path = 'http://localhost:9000/users?user_id=' + id;
    }
    else if (page == "reservations") {
        path = 'http://localhost:9000/reservations?user_id=' + id;
    }
    else if (page == "hostpage"){
        path = 'http://localhost:9000/users/host?user_id=' + id;
    }
    else {
        path = 'http://localhost:9000/properties';
    }


    useEffect(() => {
        fetch(path)
            .then(res => res.json())
            .then((data) => {
                setProp(data);
            })
            .catch(console.log)
    });

    if (props != undefined) {
        let propertiesTosend = props;
        return (
            <div>
                <Navbar />
                <Jumbotron
                    filterText={filterText}
                    setFilterText={setFilterText} />
                <div class="row" id="coro">
                    <Sidemenu page={page} props={propertiesTosend} setCategoryFilter={setCategoryFilter} setCityFilter={setCityFilter} />
                    <div class="col-md-9 property-all-listings">
                        <PropertyList
                            categoryFilter={categoryFilter}
                            cityFilter={cityFilter}
                            page={page}
                            props={propertiesTosend}
                            filterText={filterText}
                            propId={propId}
                            setPropClick={setPropClick} />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
    else {
        let propertiesTosend = props;
        <div>
            <Navbar />
            <Jumbotron
                filterText={filterText}
                setFilterText={setFilterText} />
            <div class="row" id="coro">
                <Sidemenu page={page} props={propertiesTosend} setCategoryFilter={setCategoryFilter} setCityFilter={setCityFilter} />
                <div class="col-md-9 property-all-listings">

                </div>
            </div>
            <Footer />
        </div>
    }
}


function Property({ page, prop, setPropClick }) {
    const localstorage_user = JSON.parse(localStorage.getItem('user'));
    if(localstorage_user != null){
        var userId = localstorage_user.user_id
    }
    // const navigate = useNavigate();
    var buttonText = ""
    var to_path = ""
    var to_path_edit = ""
    var displayType = 'block'
    var reserveDisplay = 'block'
    var reserveText = "Reserve"
    var avail = ''
    var availability = prop.availability
    var op = ""
    if (userId) {
        if (page == "favorites") {
            buttonText = "Remove from favorites";
            to_path = '/favorites/' + userId
        }
        else if (page == "reservations") {
            reserveDisplay = 'none'
            availability = 'Check-in:' + prop.stay_start
            avail = 'Check-out:' + prop.stay_end
            var date1 = new Date(prop.stay_start);
            var date2 = new Date();
            const diffTime = date1 - date2;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            console.log(diffDays)
            if (diffDays < 2) {
                displayType = 'none'
            }
            else {
                buttonText = "Cancel";
                to_path = '/reservations/' + userId
            }

        }
        else if(page == "hostpage"){
            buttonText = "Delete the Property"
            reserveText = "Edit the Property"
            to_path_edit = '/addForm/'+prop.property_id

            if(prop.availability=="Not Available")
            {
                displayType = 'none'  
            }
        }
        else {
            buttonText = "Add to favorites";
        }
    }
    else {
        buttonText = "Add to favorites";
        // navigate('/')
    }

    const s = {
        width: "18rem"
    }
    const handleclick = () => {
        // setPropClick(prop.property_id)
    }

    const handleFavClick = (e) => {

        if (userId) {
            if (page == "favorites") {
                op = "remove";

                fetch('http://localhost:9000/users?user_id=' + userId + '&property_id=' + prop.property_id + '&op=' + op, { method: 'PUT', body: JSON.stringify() })
                    .then(res => { return res.json() })
                    .then((data) => {

                    })
                    .catch(console.log)
            }
            else if (page == "reservations") {

                fetch('http://localhost:9000/reservations?reservation_id=' + prop.reservation_id + '&user_id=' + userId + '&property_id=' + prop.property_id, { method: 'DELETE', body: JSON.stringify() })
                    .then(res => { return res.json() })
                    .then((data) => {

                    })
                    .catch(console.log)
            }
            else if (page == "hostpage"){
                fetch('http://localhost:9000/users/host?user_id=' + userId  + '&property_id=' + prop.property_id, { method: 'PUT', body: JSON.stringify() })
                    .then(res => { return res.json() })
                    .then((data) => {

                    })
                    .catch(console.log)
                    
            }
            
            else {
                op = "add"
                e.target.textContent = "Added to favorite";
                fetch('http://localhost:9000/users?user_id=' + userId + '&property_id=' + prop.property_id + '&op=' + op, { method: 'PUT', body: JSON.stringify() })
                    .then(res => { return res.json() })
                    .then((data) => {

                    })
                    .catch(console.log)

            }
        }
        else {
            // navigate('/login')
        }

    }
    var unique_id = "#carousel".concat(prop.property_id);
    var carousel_id = "carousel".concat(prop.property_id);
    var prop_detail_path = "/properties/".concat(prop.property_id)
    var x = [];
    prop.images.forEach(img => {
        x.push(<div class="carousel-item active">
            <img src={img} class="d-block w-100 img-height" alt="..." />
        </div>)
    });
    return (
        <div class="col property-listing">
            <div class="card" style={s} >
                <div id={carousel_id} class="carousel slide carousel-fade"
                    data-bs-interval="false">
                    <Link to={prop_detail_path}>
                        <div class="carousel-inner" onClick={handleclick}>
                            {x}
                        </div>
                    </Link>
                    <button class="carousel-control-prev" type="button"
                        data-bs-target={unique_id} data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button"
                        data-bs-target={unique_id} data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
                <div class="card-body">
                    <div onClick={handleclick}>
                        <h5 class="card-title p-margin">{prop.title},{prop.state}
                        </h5>
                        <p class="p-margin">{availability}<br />{avail}</p>
                        <p class="p-margin" >${prop.nightly_fee} per night</p>
                        <p> </p>
                        <Link to={to_path_edit} >
                        <button class="btn btn-danger" style={{ "display": reserveDisplay }}>{reserveText}</button>
                        </Link>

                        <p></p>
                    </div>

                    <Link to={to_path} onClick={handleFavClick} >
                        <button class="btn btn-danger" id="add-to-fav" style={{ "display": displayType }} >{buttonText}</button>
                    </Link>


                </div>
            </div>
        </div >

    )
}

function PropertyList({ categoryFilter, cityFilter, page, props, filterText, propId, setPropClick }) {
    const rows = [];
    //console.log(categoryFilter);
    if (categoryFilter) {
        props.forEach(prop => {
            if ((categoryFilter.toLowerCase()) === (prop.category.toLowerCase())) {
                //console.log(prop)
                rows.push(
                    <Property page={page} prop={prop} setPropClick={setPropClick} />);
            }
        });
    }
    else if (cityFilter) {
        props.forEach(prop => {
            if ((cityFilter.toLowerCase()) === (prop.city.toLowerCase())) {
                //console.log(prop)
                rows.push(
                    <Property page={page} prop={prop} setPropClick={setPropClick} />);
            }
        });
    }
    else {
        props.forEach(prop => {
            var fil = prop.title.concat(" ", prop.state)
            if (
                (fil.toLowerCase().indexOf(
                    filterText.toLowerCase()
                ) === -1)

            ) { return; }


            rows.push(
                <Property page={page} prop={prop} setPropClick={setPropClick} />);
        });
    }

    return (
        <div class="row">
            {rows}
        </div>
    );
}

// props.find(el => categoryFilter.toLowerCase().includes(el.category.toLowerCase()));
//         console.log()

// var p = null;
    // if (propId !== '') {
    //     props.forEach(prop => {

    //         if (propId === prop.property_id) {
    //             p = prop;
    //         }

    //     });
    //     return (
    //        <PropertyDetails property={p} />
    //     );

    // }
    // else {