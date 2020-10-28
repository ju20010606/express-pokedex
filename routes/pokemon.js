const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');
// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
  .then(foundUsers=>{
        res.send(foundUsers)
        res.render('views/pokemon/index.ejs')
    })

});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.create({
        name: `${req.body.name}`,
    })
    .then(createdUser=>{
      console.log("Created User", createdUser)
      res.redirect('/pokemon')
      })
});

router.get('/:id', function(req, res){
  db.pokemon.findOne({
        where: {id:req.params.id }
    }).then(foundUser=>{
      
      axios.get(`http://pokeapi.co/api/v2/pokemon/${foundUser.name}/`)
      .then(response =>{
        //  res.send(response.data)
         res.render('show',{data: response.data})
      })
      .catch(err=>{
          console.log(err)
      })
        })
})

module.exports = router;
