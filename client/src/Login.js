import Navbar from "./Navbar";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
export default function Login() {
    const navigate = useNavigate();
    const [text,setText]=useState('')
    const handleLoginSubmit = (e)=>{
        e.preventDefault();
        console.log("clicked");
        fetch('http://localhost:9000/users/login', {
          method: "POST",
          headers : { 
            'Content-Type': 'application/json',
             'Accept': 'application/json'
          },
          body: JSON.stringify( {  // you will get user information from login form

            "email": e.target.username.value,
            "password": e.target.password.value,

          } )
        })
        .then( res => res.json() )
        .then( (data) => { 
            

            if(data.message){
                setText('invalid user details');
                // navigate('/');
            }
             else{
                navigate('/')
                console.log(data);

            let inMemoryToken = data.token;
            console.log(inMemoryToken);

            localStorage.setItem('user', JSON.stringify(data));
            let hostId = {"hostId":"false"}
            localStorage.setItem("host", JSON.stringify(hostId));
            }
            
        })
        .catch((error) => {
          console.log(error.message);
        
        });

    }

    return (
        <div>
            <Navbar />
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-5">
                        <div class="card card-style">
                            <h2 class="card-title text-center">Login!</h2>
                            <div class="card-body py-md-4">
                                <form onSubmit={handleLoginSubmit}>
                                    <div class="form-group">
                                        <input type="text" class="form-control" name="username" placeholder="Email" />
                                    </div>

                                    <div class="form-group">
                                        <input type="password" class="form-control" name="password" placeholder="password" />
                                    </div>
                                    <button type="submit" class="btn btn-danger"> Login</button>
                                    <p>{text}</p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            
        </div >

    )
}