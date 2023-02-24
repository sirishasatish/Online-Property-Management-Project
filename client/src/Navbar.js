 import { Link, useNavigate} from 'react-router-dom';
 import React, { useState } from 'react';

export default function Navbar() {
    // const navigate=useNavigate();
    // const [buttonText, setButtonText]=useState('Become a Host')
    var buttonText = "";
    let url = "#";
    // let home = "/"
    // const navigate = useNavigate();
    const localstorage_user = JSON.parse(localStorage.getItem('user'));
    const localstorage_host = JSON.parse(localStorage.getItem('host'));
    // console.log("App"+localstorage_host.hostId);
    // buttonText = "Become a Host";
    var signupText = 'Sign Up'
    var loginText = 'Log In'
    // console.log(localstorage_host);
    if(localstorage_host.hostId == "notLoggedIn") {
        buttonText = "";
        // setButtonText("");
        // signupText = "";
        // loginText = "Log Out";
    } else {
        buttonText = "Become a Host";
        signupText = "";
        loginText = "Log Out";
    }

    // if(localstorage_host.hostId == "false") {
    //     buttonText = "Become a Host";
    //     signupText = "";
    //     loginText = "Log Out";
    // }

    
    if (localstorage_user != null) {
        var userId = localstorage_user.user_id
    }
    // if (userId) {
        //var userId = localstorage_user.user_id
        // const handleLogout = (e)=>{
        //      localstorage_user = JSON.parse(localStorage.removeItem('user'));
        //      //navigate('/')
        // }
        var path_to= '/host/'+userId;


        const handleHost = (e)=>{
            if(e.target.textContent.toLowerCase()===("Become a Host").toLowerCase()){
                    // setButtonText("Host")
                   // navigate('/')
            }
        }
        return (
            <nav class="navbar navbar-expand-lg bg-light custom-navbar">
                <div class="container-fluid">
                    <a class="navbar-brand caption-style" href="/">
                        <img src="assets/images/StayCation-logo.png" alt="" width="50" height="50" /> StayCation!
                    </a>

                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0" onClick={handleHost}>
                        <Link to={path_to} >
                        <li class="nav-item">
                       
                                <a class="nav-link" aria-current="page" href="#">{buttonText}</a></li></Link>
                            {/* <Link to='/login' > */}
                            <li class="nav-item">
                                <a class="nav-link" aria-current="page" href="/login">{loginText}</a></li>
                            {/* </Link> */}

                            {/* <Link to='/signup' > */}
                            <li class="nav-item">
                                <a class="nav-link" aria-current="page" href="/signup">{signupText}</a>
                            </li>
                            {/* </Link> */}
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href={url} role="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    English(US)
                                </a>
                                <ul class="dropdown-menu drop-style" >
                                    <li><a class="dropdown-item" href={url}>English(US)</a></li>
                                    <li><a class="dropdown-item" href={url}>Español</a></li>
                                    <li><a class="dropdown-item" href={url}>English(UK)</a></li>
                                    <li><a class="dropdown-item" href={url}>English(India)</a></li>
                                </ul>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#footer">Contact Us</a>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
// }