//import logo from './logo.svg';
//import { Routes } from 'react-router-dom';
import './App.css';
import Routing from './Routing';


function App() {
  let hostId = {"hostId":"notLoggedIn"}
  if(localStorage.getItem("host")) {

  } else {
    localStorage.setItem("host", JSON.stringify(hostId));
  }
  
  
  return (
    <div className="App">
     <Routing />
    </div>
  );
}
export default App;
