var express = require('express');
var router = express.Router();
const request = require('request');
const db = require('../db');

/* GET users listing. */
router.get('/', function(req, res, next) {
    // console.log('sdfkaj');
    // console.log(req.session);
    
    // NEED TO: Add a where clause for datetime>current
    const allEventsQuery = `
    SELECT users.username, events.avatar_url, events.name 
    FROM events, event_rels, users
    WHERE events.id = event_rels.eventId
        AND users.id = event_rels.userId
    `
    
    db.any(allEventsQuery).then( resp => {
        console.log(resp);
        // res.render('events',{})
        res.render('events', {
            eventsData: resp
          });
        });
      });
      
router.get('/event-signup', (req, res) => {
  res.render('event-signup', {

  });
});

router.get('/:id', (req, res) => {
  const eventId = req.params.id;
  // console.log(eventId);

  const singleEventQuery = `
  SELECT users.username, events.avatar_url, events.name, events.location, event_time 
  FROM events, event_rels, users
  WHERE events.id = event_rels.eventId
      AND users.id = event_rels.userId
      AND events.id = $1
      `

  db.one(singleEventQuery,[eventId]).then( resp => {
    console.log(resp);
    res.render('single-event', {
      title: resp.name,
      image_url: resp.avatar_url,
      location: resp.location,
      event_time: resp.event_time,
      creator: resp.username
  })
  }).catch(err => {
    res.redirect('/events?msg=NoSuchEvent')
  });
});


module.exports = router;
