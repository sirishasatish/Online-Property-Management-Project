import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';
import Home from './Home';
import PropertyDetailsPage from './PropertyDetailsPage';
import Login from './Login';
import Signup from './Signup';
import AddForm from './AddForm';


export default function Routing() {
    return (
        <Router>
            <Routes>
                <Route exact path='/' element={< Home />}></Route>
                <Route exact path='/login' element={<Login />}></Route>
                <Route exact path='/signup' element={<Signup />}></Route>
                <Route exact path='/addForm' element={<AddForm />}></Route>
                <Route exact path='/addForm/:id' element={<AddForm />}></Route>
                <Route exact path='/host/:id' element={<Home page="hostpage" />}></Route>
                <Route exact path='/favorites/:id' element={< Home page = "favorites" />}></Route>
                <Route exact path='/reservations/:id' element={< Home page = "reservations" />}></Route>
                <Route exact path='/properties/:id' element={< PropertyDetailsPage />}></Route>
            </Routes>
        </Router>
    )
}