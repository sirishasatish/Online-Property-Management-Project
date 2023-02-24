var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/vidzy');

//show reservations for particular user
router.get('/', function(req, res) {
    var collection_reservation = db.get('reservation');
    const idQuery=req.query.user_id;
    // // show all properties
    // if (!idQuery){
    //     collection.find({}, function(err, reservation){
    //       if (err) throw err;
    //         res.json(reservation);
    //     });
    //   } else { 
    //     collection.find({user_id : idQuery}, function(err, reservation){
    //         if (err) throw err;
    //           res.json(reservation);
    //     });}

    collection_reservation.aggregate([
      { "$match":  {"user_id" : idQuery} },
      {
          "$lookup": {
              "from": "properties",
              "localField": 'property_id',
              "foreignField": 'property_id',
              "as": 'property'
          }
      }, 
      {$unwind: '$property'},
      {
         "$project" : { 
              "stay_start": "$stay_start",
              "stay_end": "$stay_end",
              "reservation_id": "$reservation_id",
              "property_id": "$property.property_id",
              "hosted_by": "$property.hosted_by",
              "category": "$property.category",
              "title": "$property.title",
              "city": "$property.city",
              "state": "$property.state",
              "description": "$property.description",
              "availability": "$property.availability",
              "nightly_fee": "$property.nightlyfee",
              "cleaning_fee": "$property.cleaningfee",
              "service_fee": "$property.servicefee",
              "amenities": "$property.amenities",
              "bedrooms": "$property.bedrooms",
              "nightly_fee": "$property.nightly_fee",
              "bathrooms": "$property.bathrooms",
              "guests": "$property.guests",
              "images": "$property.images"
          } 
      }
    ], function(err, reservations) {
      if (err) throw err;
      res.json(reservations);
    });
    
});


//insert a reservation
router.post('/', function(req, res) {
	//req.body is used to read form input
    var collection = db.get('reservation');
    var userId = req.query.user_id;
    if(userId){collection.insert({ 
		reservation_id: req.body.reservation_id,
        user_id:userId,
        property_id: req.body.property_id,
        payment_id: req.body.payment_id,
        stay_start: req.body.stay_start,
        stay_end: req.body.stay_end,
        guests: req.body.guests
	}, function(err, reservation){
		if (err) throw err;
		// if insert is successfull, it will return newly inserted object
	  	res.json(reservation);
	});}
    else{
        err="Need to pass a user_id for adding the reservation"
        res.send(err);
    }
	
});


//delete a reservation
router.delete('/', function(req, res) {
    var collection = db.get('reservation');
	collection.remove({ reservation_id: req.query.reservation_id,user_id: req.query.user_id,property_id: req.query.property_id }, function(err, reservation){
		if (err) throw err;
	  	res.json(reservation);
	});
});

module.exports = router;
