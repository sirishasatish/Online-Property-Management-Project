import React, { useState, useEffect } from 'react';
import {  useParams } from 'react-router-dom';
import Navbar from './Navbar'
import Footer from './Footer'
import Sidemenu from './Sidemenu';
import Jumbotron from './Jumbotron';
import PropertyDetails from './PropertyDetails'

export default function PropertyDetailsPage({page}) {
    const [filterText, setFilterText] = useState('');
    const [cityFilter, setCityFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [props, setProp] = useState([]);
    let { id } = useParams();
    let p = 'http://localhost:9000/properties?property_id='+id;
    useEffect(() => {
        fetch(p)
            .then(res => {return res.json()})
            .then((data) => {
                setProp(data)
                // console.log(data)
            })
            .catch(console.log)
    });
    if(props!= undefined){
    return (
        
        <div>
        <Navbar />
       <Jumbotron  
                filterText={filterText}     
                setFilterText={setFilterText}/>
        <div class="row" id="coro">
            <Sidemenu page={page} props={props} setCategoryFilter ={setCategoryFilter} setCityFilter ={setCityFilter} />
            <div class="col-md-9 property-all-listings"><PropertyDetails property={props[0]}/></div>
           
        </div>
        <Footer />
      </div>

    );
    }
    else{
        return(
            <div>
        <Navbar />
       <Jumbotron  
                filterText={filterText}     
                setFilterText={setFilterText}/>
        <div class="row" id="coro">
            <Sidemenu page={page} props={props} setCategoryFilter ={setCategoryFilter} setCityFilter ={setCityFilter}/>
        
        </div>
        <Footer />
      </div>
        )
    }
}