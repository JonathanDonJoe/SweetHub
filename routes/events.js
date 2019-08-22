var express = require('express');
var router = express.Router();
const request = require('request');
const db = require('../db');

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log('sdfkaj');
    
    // NEED TO: Add a where clause for datetime>current
    const allEventsQuery = `
    SELECT users.username, events.avatar_url, events.name 
    FROM events, event_rels, users
    WHERE events.id = event_rels.eventId
        AND users.id = event_rels.userId`
    
    db.any(allEventsQuery).then( resp => {
        console.log(resp);
        // res.render('events',{})
        res.render('events', {
            eventsData: resp
        });
    });
});

module.exports = router;
