import React, { useEffect } from 'react';
import { useState } from 'react';

export default function Home() {
    const [properties, setProperties] = useState([]);
    const [filterText, setFilterText] = useState('');

    useEffect(() => {
        fetch('http://localhost:9000/properties')
            .then(res => res.json())
            .then((data) => {
                setProperties(data);
            })
            .catch(console.log)
    });

    return (
        <div className="Home">
            <Header filterText={filterText}
                onFilterTextChange={setFilterText} />
            <Jumbotron />
            <MainContainer properties={properties} filterText={filterText} />
            <Footer />
        </div>
    );
}

// MARK: - Property Detail

function PropertyTitle({ property }) {
    return (
        <div class="row h-100">
            <h2>{property.place_detail}</h2>
            <p>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-star-fill" viewBox="0 0 16 16">
                    <path
                        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
                &nbsp;
                {property.rating}
                &nbsp;|&nbsp;
                <u>{property.review_count} reviews</u>
                &nbsp;|&nbsp;
                {property.title}
            </p>
        </div>
    );
}

function PropertyImageDetail({ property }) {
    const imageOne = "Assets/".concat(property.images[0]);
    const imageTwo = "Assets/".concat(property.images[1]);
    const imageThree = "Assets/".concat(property.images[2]);
    return (
        <div class="row">
            <div class="col-md-6 pt-4 pb-4 px-4 m-0 d-flex-column">
                <img src={imageOne} class="img-fluid mainImage" alt="Temple of Hephaistos" />
            </div>
            <div class="col-md-4 m-0 d-flex-column">
                <img src={imageTwo} class="img-fluid sideImage pt-4 pb-2" alt="SomeImage" />
                <img src={imageThree} class="img-fluid sideImage pt-2 pb-4" alt="SomeImage" />
            </div>
        </div>
    );
}

function PropertyAmenities({ amenity }) {
    return (
        <div>
            <h6>{amenity}</h6>
        </div>
    );
}

function PropertyDetailedDesc({ property }) {
    const amenitiesList = []

    property.amenities.forEach((amenity_) => {
        amenitiesList.push(<PropertyAmenities amenity={amenity_} />);
    })

    return (
        <div class="row p-4">
            <div class="col-lg-6 px-2">
                <p>{property.guests} guests | {property.bedrooms} bed | {property.bathrooms} bath</p>
                <hr />
                <p><b>Self Check in</b></p>
                <p>Check yourself in with the lockbox.</p>
                <p><b>Great Location</b></p>
                <p>100% of recent guests gave the location a 5-star rating</p>
                <p>{property.full_description}</p>
                <hr />
                <h4>What this place offers</h4>
                <div class="container p-0">
                    {amenitiesList}
                </div>
                <hr />

            </div>
            <div class="col-lg-5 ml-auto">
                <div id="booking" class="section">
                    <div class="section-center">
                        <div class="container">
                            <div class="row">
                                <div class="booking-form">
                                    <div class="form-header">
                                        <h3>Hold this Moment? </h3>
                                    </div>
                                    <form>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <input class="form-control" type="date" value={property.checkIn} required />
                                                    <span class="form-label">Check In</span>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <input class="form-control" type="date" value={property.checkOut} required />
                                                    <span class="form-label">Check out</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row p-2">
                                            <div class="col-md-4 m-0 p-0">
                                                <div class="form-group">
                                                    <select class="form-control" required>
                                                        <option defaultValue={property.bedrooms} selected hidden>no of rooms</option>
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>3</option>
                                                    </select>

                                                </div>
                                            </div>
                                            <div class="col-md-4 m-0 p-0">
                                                <div class="form-group">
                                                    <select class="form-control" required>
                                                        <option defaultValue={property.guests} selected hidden>no of adults</option>
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>3</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-md-4 m-0 p-0">
                                                <div class="form-group">
                                                    <select class="form-control" required>
                                                        <option defaultValue={property.guests} selected hidden>no of children</option>
                                                        <option>0</option>
                                                        <option>1</option>
                                                        <option>2</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <p><u>Cleaning Fees:</u></p>
                                                    </div>
                                                    <div class="col-md-6 sm-1 text-right">
                                                        <p> {property.cleaningfee} </p>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <p><u>Nightly Fees:</u></p>
                                                    </div>
                                                    <div class="col-md-6 text-right">
                                                        <p> {property.nightlyfee} </p>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <p><u>Service Fees:</u></p>
                                                    </div>
                                                    <div class="col-md-6 text-right">
                                                        <p> {property.servicefee} </p>
                                                    </div>
                                                </div>
                                                <div class="form-btn">
                                                    <button class="submit-btn">Reserve</button>
                                                </div>
                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function PropertyDetail({ property }) {
    return (
        <div class="col px-5 py-3">
            <div class="row">
                <PropertyTitle property={property} />
                <PropertyImageDetail property={property} />
                <PropertyDetailedDesc property={property} />
            </div>
        </div>
    );
}

function SearchBar({ filterText, onFilterTextChange }) {
    return (
        <form class="d-flex" role="search">
            <input class="form-control" type="text" placeholder="Search Properties, Beaches, Places.."
                aria-label="Search"
                value={filterText}
                onChange={(e) => onFilterTextChange(e.target.value)} />
            <button class="search-icon" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search"
                    viewBox="0 0 16 16">
                    <path
                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
            </button>
        </form>
    );
}

// MARK: - Header

function Header({ filterText, onFilterTextChange }) {
    return (
        <nav class="navbar navbar-expand-lg navbar-light static-top custom-navbar ">
            <div class="container-fluid">
                <a class="navbar-brand mr-2" href="#">
                    <img src="Assets/logo_travel.png" alt="logoHere" height="48" class="rounded-circle" /> &nbsp;<b class="logo_title">TAG ALONG!</b>

                </a>
                <button class="navbar-toggler" type="button" height="16" width="16" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <div class="ml-auto mr-auto col-lg-4 col-md-12 p-0">
                        <SearchBar filterText={filterText}
                            onFilterTextChange={onFilterTextChange} />
                    </div>
                    <ul class="navbar-nav align-items-left logo_title">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#" style={{ color: '#416bdf' }}>Home</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: '#416bdf' }}>
                                Login/ Sign Up
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDarkDropdownMenuLink">
                                <li><a class="dropdown-item" href="#">Guest</a></li>
                                <li><a class="dropdown-item" href="#">Host</a></li>
                            </ul>

                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: "#416bdf" }}>
                                Location
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDarkDropdownMenuLink">
                                <li><a class="dropdown-item" href="#">USA</a></li>
                                <li><a class="dropdown-item" href="#">Asia</a></li>
                                <li><a class="dropdown-item" href="#">Africa</a></li>
                                <li><a class="dropdown-item" href="#">South America</a></li>
                                <li><a class="dropdown-item" href="#">Australia</a></li>
                            </ul>

                        </li>

                    </ul>
                </div>


            </div>
        </nav>
    );
}

// MARK: - Jumbotron

function Jumbotron() {
    return (
        <div class="jumbotron mb-0" style={{ "background-image": "url(Assets/jumbo.jpg)", "box-shadow": "inset 0 0 0 2000px rgba(0, 0, 0, 0.3)" }}>
            <div class="col-lg-5 ms-auto mr-auto">

                <div class="jumbheading align-items-center">
                    <center>
                        <h2>
                            Never Miss a Moment!!
                        </h2>
                    </center>

                </div>

                <div class="input-group searchLine" id="jumbElements">
                    <form>
                        <ul class="navbar-nav list-group flex-sm-row flex-column align-items-center" id="sbItems">
                            <li>
                                <i class="fs-2 bi-bootstrap"></i>
                                <div>
                                    <input type="text" class="form-control" id="fDate" placeholder="Email Address" />
                                    <span class="input-group-append"></span>
                                </div>
                            </li>
                            <li>
                                <i class="fs-2 bi-bootstrap"></i>
                                <div>
                                    {/* <div class="input-group date" id="datepicker"> */}
                                    <input type="text" class="form-control" id="fDate" placeholder="City to Tag Along" />
                                    <span class="input-group-append"></span>
                                    {/* </div> */}
                                </div>
                            </li>

                            <li>
                                <button class="form-round propertyButtons py-1 submit-btn" type="button">Subscribe</button>
                            </li>
                        </ul>
                    </form>
                </div>
                <div class="jumbheading align-items-center">
                    <center><h5>Subscribe and be the first to receive our exclusive offers</h5></center>
                </div>

                <center><h6>Benefit from exclusive offers, personalized notifications, seamless booking functions and more. <u>Learn More</u></h6></center>
            </div>
        </div>
    );
}

// MARK: - Main Container

function MainContainer({ properties, filterText }) {
    const [propertyId, setPropertyClicked] = useState('');
    return (
        <div class="container-fluid text-left">
            <div class="row align-items-sm-start">
                <SideMenu />
                <MainContent
                    properties={properties}
                    filterText={filterText}
                    handlePropertyId={setPropertyClicked}
                    propertyId={propertyId} />
            </div>
        </div>
    );
}

// MARK: - List All Properties

function PropertyImage({ propertyImage, isActive }) {
    const image = "Assets/".concat(propertyImage);
    var classvalue = 'carousel-item'
    if (isActive) {
        classvalue = classvalue.concat(' active')
    }
    return (
        <div class={classvalue}>
            <img src={image} class="d-block w-100" alt="..." />
        </div>
    );
}

function Property({ property, handlePropertyId }) {
    const images = [];
    var isActive = false;
    var carouselId = "carouselExampleIndicators".concat(property.id);
    var carouselTarget = "#".concat(carouselId)
    const handleClick = (e) => {
        if (e.target.classList.contains('favButton')) {
            e.target.textContent = 'Added to Favorites';
            e.target.classList.add('noHover')
            e.target.classList.add('disabledButton')
        } else {
            handlePropertyId(property.id);
        }
    }

    property.images.forEach((image_, index) => {
        if (index == 0) {
            isActive = true;
        } else {
            isActive = false;
        }
        images.push(
            <PropertyImage propertyImage={image_} isActive={isActive} />
        );
    });

    return (
        <div class="col-md-4 col-lg-3">
            <div class="card">
                <div id={carouselId} class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                            class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                            aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                            aria-label="Slide 3"></button>
                    </div>
                    <div class="carousel-inner" onClick={handleClick}>
                        {images}
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target={carouselTarget} data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target={carouselTarget} data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
                <div class="card-body" onClick={handleClick}>
                    <h6 class="card-title">{property.title}</h6>
                    <p class="card-text">{property.description}</p>
                    <p>{property.availability}</p>
                    <p>{property.nightlyfee} per night</p>

                    <ul class="navbar-nav list-group flex-sm-row flex-column align-items-left" id="sbItems">
                        <button class="propertyButtons"><a href="#" class="card-link nontextdecoration">View</a></button> &nbsp;
                        <button class="propertyButtons favButton" onClick={handleClick}>
                            {/* <a href="#" class="card-link nontextdecoration"> */}
                                Add to
                            Favorites
                            {/* </a> */}
                            </button>
                    </ul>
                </div>
            </div>
        </div>
    );
}

function MainContent({ properties, filterText, handlePropertyId, propertyId }) {
    const property_list = [];
    var clickedProperty = null;
    if (propertyId != '') {
        properties.forEach((property_) => {
            if (property_.id == propertyId) {
                clickedProperty = property_;
            }
        })
        return (
            <PropertyDetail property={clickedProperty} />
        );
    } else {
        properties.forEach((property_) => {
            if (property_.title.toLowerCase().includes(filterText.toLowerCase())) {
                property_list.push(
                    <Property
                        property={property_} handlePropertyId={handlePropertyId} />
                );
            }
        });
        return (
            <div class="col px-5 py-3">
                <div class="row">
                    {property_list}
                </div>
            </div>
        );
    }
}

// MARK: - SideMenu

function SideMenu() {
    return (
        <div class="col-lg-2 col-md-3 px-sm-2 px-md-0 py-1 custom-navbar">
            <div class="d-flex flex-column  align-items-left align-items-sm-start side-menu-list">
                <div class="container-fluid propertyButtons px-3 py-2">
                    <a href="#" class="d-flex flex-column align-items-left text-decoration-none">
                        <span class="fs-5 sidemenu-buttons" style={{ "color": "white" }}>Specially For you</span>
                    </a>
                </div>
                <ul class="nav nav-pills flex-column align-items-sm-left px-3 side-menu-list" id="menu">
                    <li>
                        <a href="#" class="nav-link align-start px-0">
                            <i class="fs-4 bi-house"></i> <span class="ms-1 sidemenu-buttons side-menu">Your
                                Moments</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="nav-link px-0 align-left">
                            <i class="fs-4 bi-table"></i> <span class="ms-1 sidemenu-buttons side-menu">Upcoming Moments</span></a>
                    </li>
                    <li>
                        <a href="#submenu2" data-bs-toggle="collapse" class="nav-link px-0 align-left ">
                            <i class="fs-4 bi-bootstrap"></i> <span class="ms-1 sidemenu-buttons side-menu">Categories</span></a>
                        <ul class="collapse nav flex-column ms-3" id="submenu2" data-bs-parent="#menu">
                            <li class="w-100">
                                <a href="#" class="nav-link px-0"> <span class="sidemenu-buttons side-menu">Treehouses</span></a>
                            </li>
                            <li>
                                <a href="#" class="nav-link px-0"> <span class="sidemenu-buttons side-menu">Amazing Views</span> </a>
                            </li>
                            <li>
                                <a href="#" class="nav-link px-0"> <span class="sidemenu-buttons side-menu">National Parks</span> </a>
                            </li>
                            <li>
                                <a href="#" class="nav-link px-0"> <span class="sidemenu-buttons side-menu">Lake Front</span> </a>
                            </li>
                            <li>
                                <a href="#" class="nav-link px-0"> <span class="sidemenu-buttons side-menu">Campers</span> </a>
                            </li>
                            <li>
                                <a href="#" class="nav-link px-0"> <span class="sidemenu-buttons side-menu">Cabins</span> </a>
                            </li>
                            <li>
                                <a href="#" class="nav-link px-0"> <span class="sidemenu-buttons side-menu">Tiny Homes</span> </a>
                            </li>
                            <li>
                                <a href="#" class="nav-link px-0"> <span class="sidemenu-buttons side-menu">Islands</span> </a>
                            </li>
                            <li>
                                <a href="#" class="nav-link px-0"> <span class="sidemenu-buttons side-menu">Surfing</span> </a>
                            </li>
                            <li>
                                <a href="#" class="nav-link px-0"> <span class="sidemenu-buttons side-menu">Amazing Pools</span> </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#submenu3" data-bs-toggle="collapse" class="nav-link px-0 align-left">
                            <i class="fs-4 bi-grid"></i> <span class="ms-1 sidemenu-buttons side-menu">Your Favorites</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="nav-link px-0 align-left">
                            <i class="fs-4 bi-people"></i> <span class="ms-1 sidemenu-buttons side-menu">Write to Us</span>
                        </a>
                    </li>
                </ul>

            </div>
        </div>
    );
}

// MARK: - Footer

function Footer() {
    return (
        <footer class="text-center text-lg-start footercolor">
            <section class="">
                <div class="container text-center text-md-start mt-5 py-3">
                    <div class="row mt-3">
                        <div class="col-md-3 col-lg-4 col-xl-8 mx-auto mb-4">
                            <h6 class="text-uppercase fw-bold mb-4">
                                <i class="fas fa-gem me-3 text-secondary"></i>Tag Along
                            </h6>
                            <p>
                                With over 5 million satisfied customers, Tag Along is a leading flight booking company, guaranteeing the
                                best air travel. With so many new flights and airlines to choose from, we, at MakeMyTrip ensure that you
                                get the best of deals every time you book your flight tickets with us. Enjoy a customer-friendly
                                experience for cheap flights as well as hotel and holiday bookings using our desktop site or mobile app.
                            </p>
                        </div>
                        <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                            <h6 class="mb-4">Contact</h6>
                            <p><img src="Assets/house-door-fill.svg" alt="Address" height="16" /> New York, NY 10012, US</p>
                            <p>
                                <img src="Assets/envelope-fill.svg" alt="Email" height="16" /> info@example.com
                            </p>
                            <p><img src="Assets/telephone-fill.svg" alt="telephone" height="16" /> + 01 234 567 88</p>
                            <p><img src="Assets/voicemail.svg" alt="voicemail" height="16" /> + 01 234 567 89</p>
                        </div>
                    </div>
                </div>
            </section>
            <section class="d-flex justify-content-center p-4 border-bottom">
                <div class="me-5 d-lg-block">
                    © 2022 Copyright:
                    <a class="text-reset fw-bold" href="https://tagalong.com">tagalong.com</a>
                </div>
                <div>
                    <a href="" class="me-4 link-secondary">
                        <img src="Assets/facebook.png" alt="facebook" height="16" />
                    </a>
                    <a href="" class="me-4 link-secondary">
                        <img src="Assets/twitter.svg" alt="twitter" height="16" />
                    </a>
                    <a href="" class="me-4 link-secondary">
                        <img src="Assets/youtube.png" alt="youtube" height="16" />
                    </a>
                    <a href="" class="me-4 link-secondary">
                        <img src="Assets/instagram.svg" alt="instagram" height="16" />
                    </a>
                    <a href="" class="me-4 link-secondary">
                        <img src="Assets/linkedin.png" alt="linkedin" height="16" />
                    </a>
                    <a href="" class="me-4 link-secondary">
                        <img src="Assets/messenger.png" alt="messenger" height="16" />
                    </a>
                </div>
            </section>
        </footer>
    );
}
