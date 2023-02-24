var express = require('express');
var router = express.Router();

const bcrypt = require('bcryptjs');

var monk = require('monk');
var db = monk('localhost:27017/vidzy');

var collection_property = db.get('properties')
var collection_user = db.get('users');

/* GET users listing. */
router.get('/', function(req, res) {
  const idQuery=req.query.user_id;
  // show all users
    if (idQuery){
        collection_user.findOne({user_id: idQuery}, function(err, user){
          if (err) throw err;
          if(user!="null"){
          collection_property.find({ property_id: { $in: user.favorites }}, function(err, prop){
            if (err) throw err;
            res.json(prop);
        });
          }
          else{
          res.json({
            message:"invalid user details"
          });
        }
      });
      }
});


router.get('/host', function(req, res) {
  const idQuery=req.query.user_id;
  // show all users
    if (idQuery){
        collection_user.findOne({user_id: idQuery}, function(err, user){
          if (err) throw err;
          if(user!="null"){
        
          collection_property.find({ host_id: user.user_id }, function(err, prop){
            if (err) throw err;
            res.json(prop);

        });
          }
          else{
          res.json({
            message:"no properties by host"
          });
        }
      });
      }
});


router.put('/', function(req, res) {
	const idQuery=req.query.user_id;
  const property_id = req.query.property_id;
  const operation = req.query.op;
  if (operation == "remove") {
    collection_user.update({ user_id: idQuery }, {
      $pull: {
        favorites: property_id
      }
    }, function (err, user) {
      if (err) throw err;
      res.json(user);
    });
  } else if (operation == "add") {
    collection_user.update({ user_id: idQuery }, {
      $addToSet: {
        favorites: property_id
      }
    }, function (err, user) {
      if (err) throw err;
      res.json(user);
    });
  }
  
});

router.put('/host', function(req, res) {
	// const idQuery=req.query.user_id;
  const property_id = req.query.property_id;
  // const operation = req.query.op;
  // if (operation == "remove") {
    collection_property.update({ property_id: property_id}, {
      $set: {
        availability: "Not Available"
      }
    }, function (err, prop) {
      if (err) throw err;
      res.json(prop);
    });
  // } else if (operation == "add") {
  //   collection_user.update({ user_id: idQuery }, {
  //     $addToSet: {
  //       favorites: property_id
  //     }
  //   }, function (err, user) {
  //     if (err) throw err;
  //     res.json(user);
  //   });
  // }
  
});


router.post('/', function (req, res) {
  //req.body is used to read form input
  var collection = db.get('users');
  var hashedPassword 
  bcrypt.genSalt(10, function (err, Salt) {
  bcrypt.hash(req.body.password, Salt, function (err, hash) {
      if (err) {
        return console.log('Cannot encrypt');
      }
      hashedPassword = hash;
      collection.insert({
        user_id: req.body.user_id,
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        contact_number: req.body.contact,
        address: req.body.address,
        favorites: req.body.favorites,
        isHost: req.body.isHost
      }, function (err, user) {
        if (err) throw err;
        // if insert is successfull, it will return newly inserted object
        res.json(user);
      });
  });
});
});


router.post('/login', function (req, res) {
  //req.body is used to read form input
  collection_user.findOne({email: req.body.email}, function(err, user){
    if (err) throw err;
    if(user!=null){
    var hashedPassword = user.password
    
      bcrypt.compare(req.body.password, hashedPassword, 
        async function (err, isMatch) {

        // Comparing the original password to
        // encrypted password   
        if (isMatch) {
            res.json(user);
        }

        else {
          
            res.json({
              message:"invalid details"
            });
        }
        // res.json(req);
    });
  }
  else{
    res.json({
      message:"invalid user details"
    });
  }
  }); 
  });

module.exports = router;

