// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://joseph:joeyk@ds011963.mlab.com:11963/heroku_d67d1q61'); // connect to our database

var Board = require('./app/models/board');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Add headers
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var port = process.env.PORT || 8080; // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

router.route('/boards')

.post(function(req, res) {

    var board = new Board(req.body);
    board.save(function(err) {
        if (err)
            res.send(err);

        res.json({message:'Board Created Successfully!',id:board._id});
    });

}).get(function(req, res) {

    Board.find(function(err, b) {
        if (err)
            res.send(err);

        res.json(b);
    });
});

router.route('/boards/:id')

.get(function(req, res) {
        var id = req.params.id;
        if (id) {
            Board.findById(id, function(err, b) {
                if (err)
                    res.send(err);
                res.json(b);
            });
        }
    })
    // more routes for our API will happen here
    // REGISTER OUR ROUTES -------------------------------
    // all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
