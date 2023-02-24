import Navbar from "./Navbar";
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import SignupForm from './SignupCheck';

export default function Signup() {
   

    return (
        <div>
            <Navbar />
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-5">
                        <div class="card card-style">
                            <h2 class="card-title text-center">Signup for StayCation!</h2>
                            <div class="card-body py-md-4">
                                {/* <form onSubmit={handleSignUpSubmit}>
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="username" name="username"  onFocus={handleFocusUsername} placeholder="Username" />
                                        <p>{userText}</p>
                                    </div>

                                    <div class="form-group">
                                        <input type="email" class="form-control" id="email" name="email" onFocus={handleFocusEmail} placeholder="Email" />
                                        <p>{emailText}</p>
                                    </div>

                                    <div class="form-group">
                                        <input type="text" class="form-control" id="street" name="street" placeholder="Street" />
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="city" name="city" placeholder="City" />
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="zipcode" name="zip" placeholder="Zipcode" />
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="phone_no" name="phone_no" placeholder="Phone Number" />
                                    </div>
                                    <div class="form-group">
                                        <input type="password" class="form-control" id="password" name="password" placeholder="Password" />
                                        <p>{passText}</p>
                                    </div>

                                    <div class="d-flex flex-row align-items-center justify-content-between">
                                        <Link to='/Login'>
                                            <a href="">I'm already a member</a></Link>
                                            
                                            <button class="btn btn-danger">Create Account</button>
                
                                    </div>
                                </form> */}
                               <SignupForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}