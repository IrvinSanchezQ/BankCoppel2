const { Router } = require('express');
const res = require('express/lib/response');
const router = Router();
const _ =require('underscore');
const movies = require('../sample.json');
//console.log(movies);


router.get('/', (req, res) => {
    res.json(movies);
});

router.post('/', (req, res) => {
    const{ Tittle, Director, year, rating }= req.body;
    if(Tittle && Director && year && rating){
        const id = movies.length + 1;
        const newMovie = {...req.body, id};
        movies.push(newMovie);
       
       // console.log(newMovie); 
        res.json(movies);
    } else{
        res.json({error: 'Wrong Request'});
    }
    
});

router.put('/:id', (req,res) => {
    const {id} = req.params;
    const { Tittle, Director, year, rating }= req.body;
    if(Tittle && Director && year && rating){
        _.each(movies, (movie, i) => {
            if(movie.id == id) {
                movie.Tittle = Tittle;
                movie.director = Director;
                movie.year = year;
                movie.rating = rating;
            }
        });
        res.json(movies);
    
    } else { 
        res.status(500).json({error: 'hubo error'});
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    _.each(movies, (movie, i) => {
        if(movie.id == id){
            movies.splice(i, 1);
        }
    });
    //console.log(req.params);
    res.send(movies);
});

module.exports = router;