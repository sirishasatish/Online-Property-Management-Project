var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/vidzy');

//show properties
router.get('/', function (req, res) {
  var collection = db.get('properties');
  const idQuery = req.query.property_id;
  // show all properties
  if (!idQuery) {
    collection.find({}, function (err, property) {
      if (err) throw err;
      res.json(property);
    });
  } else {   // show a property
    collection.find({ property_id: idQuery }, function (err, prop) {
      if (err) throw err;
      res.json(prop);
    });
  }
});

//insert a property
router.post('/', function (req, res) {
  //req.body is used to read form input
  const userId = req.query.user_id;
  var collection = db.get('properties');
  if(userId){
  collection.insert({
    property_id: req.body.property_id,
    title: req.body.title,
    host_id: userId,
    city: req.body.city,
    state: req.body.state,
    description: req.body.description,
    nightly_fee: req.body.nightly_fee,
    cleaning_fee: req.body.cleaning_fee,
    service_fee: req.body.service_fee,
    amenities: req.body.amenities,
    bedrooms: req.body.bedrooms,
    bathrooms: req.body.bathrooms,
    availability: req.body.availability,
    guests: req.body.guests,
    images: req.body.images,
    available_start_date: req.body.available_start_date,
    available_end_date: req.body.available_end_date,
    category: req.body.category,
    rating: req.body.rating
  }, function (err, property) {
    if (err) throw err;
    // if insert is successfull, it will return newly inserted object
    res.json(property);
  });
}
else{
  res.json({
    "message":"User Id is empty"
  });
}
});

//update a property
router.put('/', function (req, res) {
  var collection = db.get('properties');
  //req.body is used to read form input
  collection.update({ property_id: req.query.property_id },
    {
      $set: {
        title: req.body.title,
        host_id: req.body.host_id,
        city: req.body.city,
        state: req.body.state,
        description: req.body.description,
        nightly_fee: req.body.nightly_fee,
        cleaning_fee: req.body.cleaning_fee, 
        service_fee: req.body.service_fee,
        amenities: req.body.amenities,
        bedrooms: req.body.bedrooms,
        bathrooms: req.body.bathrooms,
        availability: req.body.availability,
        guests: req.body.guests,
        images: req.body.images,
      }
    }, function (err, property) {
      if (err) throw err;
      // if update is successfull, it will return updated object
      res.json(property);
    });
});

//delete a property
router.delete('/', function (req, res) {
  var collection = db.get('properties');
  collection.remove({ property_id: req.query.property_id }, function (err, property) {
    if (err) throw err;
    res.json(property);
  });
});

module.exports = router;
