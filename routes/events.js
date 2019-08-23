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

router.post('/submitEvent', (req, res) => {
  let {eventName, eventAvatarURL, eventTime, eventLocation, eventComments} = req.body;

  if(eventAvatarURL === '') {
    eventAvatarURL = 'https://png.pngtree.com/png-clipart/20190117/ourmid/pngtree-delicious-drink-taiwan-milk-tea-png-image_437973.jpg'
  };

  const submitEventQuery = `
  INSERT INTO events(name, location, avatar_url, event_time, comments)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING id
  `
  const submitEventRelsQuery = `
  INSERT INTO event_rels(userId, eventId)
  VALUES ($1,$2)
  RETURNING id
  `
  const findUserQuery = `
  SELECT * FROM users WHERE username=$1
  `

  db.one(submitEventQuery, [eventName, eventLocation, eventAvatarURL, eventTime, eventComments ]).then( resp => {
    db.one(findUserQuery, [req.session.username]).then( resp1 => {
      db.one(submitEventRelsQuery, [resp1.id, resp.id]).then( resp2 => {
        res.redirect(`/events/${resp.id}?msg=createdEvent`)
      })
    })


    // console.log('respid is');
    // console.log(resp.id);
  })
});

module.exports = router;
