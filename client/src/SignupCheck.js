import React, { useEffect, useState } from 'react';
import SignupValidator from './SignupValidator';
import { Link, useNavigate } from 'react-router-dom';


const SignupForm = ({ submitForm }) => {
    // const [successMsg,setSuccessMsg]  =useState('')
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        phno: ""
    });

    const [errors, setErrors] = useState({});
    const [dataIsCorrect, setDataIsCorrect] = useState(false);

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0 && dataIsCorrect) {
            submitForm(true);
        }

    }, [errors]);
    const handleSignUpSubmit = (e) => {
        var re = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!@#$%^&*+]).{8,}$/;
        var username = e.target.username.value
        var email = e.target.email.value
        var password = e.target.password.value
        e.preventDefault();
        setErrors(SignupValidator(values));
        setDataIsCorrect(true);

        if (email != '' && password != '' && re.test(password)) {
            console.log("dd");
            var user_details = {
                user_id: Date.now().toString(),
                name: username,
                password: password,
                email: email,
                contact: e.target.phone_no.value,
                address: {
                    street: e.target.street.value,
                    city: e.target.city.value,
                    zipcode: e.target.zipcode.value
                },
                favorites: [],
                isHost: false
            }
            fetch('http://localhost:9000/users', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify(user_details) })
                .then(res => { console.log(res.json()) })
                .then((data) => {
                    navigate('/Login')
                })
                .catch(console.log)
        }

    };

    return (

        <div>
            <form onSubmit={handleSignUpSubmit}>
                <div class="form-group">
                    <input type="text" class="form-control" id="username" name="username" placeholder="Username" />

                </div>

                <div class="form-group">
                    <input type="email" class="form-control" id="email" name="email" value={values.email}
                        onChange={handleChange} placeholder="Email" />
                    {errors.email && <p className='error'>{errors.email}</p>}
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
                    <input type="password" class="form-control" id="password" name="password" value={values.password}
                        onChange={handleChange} placeholder="Password" />
                    {errors.password && <p className='error'>{errors.password}</p>}
                </div>

                <div class="d-flex flex-row align-items-center justify-content-between">

                    <a href="/Login">I'm already a member</a>
                    <button class="btn btn-danger">Create Account</button>

                </div>
            </form>
        </div>

    );
}

export default SignupForm