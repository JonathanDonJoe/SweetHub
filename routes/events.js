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
  SELECT users.username, events.avatar_url, events.name , events.id
  FROM events, users
  WHERE events.creator_id = users.id
  `
  
  db.any(allEventsQuery).then( resp => {
    // console.log(resp);
    // res.render('events',{})
    res.render('events', {
        eventsData: resp
    });
  });
});
      
// Require being logged in to create an event
router.get('/event-signup', (req, res, next) => {
  if(! req.session.loggedin){
    res.redirect('/login?msg=mustLogIn')
  } else {
    next();
  }
});

router.get('/event-signup', (req, res) => {
  res.render('event-signup', {

  });
});

// Require being logged in to join an event
router.get('/join-event:id', (req, res, next) => {
  if(! req.session.loggedin){
    res.redirect('/login?msg=mustLogIn')
  } else {
    next();
  }
});

router.get('/join-event:id', (req, res) => {
  const eventId = req.params.id;
  const addEventQuery = `
  INSERT INTO event_rels (userid, eventid)
  VALUES ($1, $2)
  RETURNING id
  `;

  db.one(addEventQuery, [req.session.userId, eventId]).then( resp => {
    // res.render('join-event', {

    // })
    // .catch(err => {
    //   res.json(err);
    // })
  
  res.redirect(`/events?msg=joinedEvent`)
  });
});

router.get('/:id', (req, res) => {
  const eventId = req.params.id;
  // console.log(eventId);

  const singleEventQuery = `
  SELECT users.username, events.avatar_url, events.name, events.location, event_time, events.comments 
  FROM events, users
  WHERE events.creator_id = users.id
      AND events.id = $1
      `

  const eventParticipantsQuery = `
  SELECT  DISTINCT users.username
  FROM events, users, event_rels
  WHERE events.id = event_rels.eventid
    AND users.id = event_rels.userid
    AND events.id = $1
  `

  db.one(singleEventQuery,[eventId]).then( resp => {
    // console.log(resp);
    // console.log(resp.username)
    // console.log(req.session.username)
    const isOwner = resp.username === req.session.username;

    db.any(eventParticipantsQuery, [eventId]).then( resp2 => {
      // console.log(resp2);
      res.render('single-event', {
        title: resp.name,
        image_url: resp.avatar_url,
        location: resp.location,
        event_time: resp.event_time,
        creator: resp.username,
        eventId,
        comments:resp.comments,
        participants: resp2,
        isOwner
      })
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
  INSERT INTO events(name, location, avatar_url, event_time, comments, creator_id)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING id
  `
  const submitEventRelsQuery = `
  INSERT INTO event_rels(userId, eventId)
  VALUES ($1,$2)
  RETURNING id
  `
  // console.log(req.session);

  db.one(submitEventQuery, [eventName, eventLocation, eventAvatarURL, eventTime, eventComments, req.session.userId]).then( resp => {
    // console.log(resp);
    db.one(submitEventRelsQuery, [req.session.userId, resp.id]).then( resp2 => {
      res.redirect(`/events/${resp.id}?msg=createdEvent`)
    })
    // console.log('respid is');
    // console.log(resp.id);
  })
});

router.use('/delete/:id', (req, res)=>{
  const eventId = req.params.id;
  // console.log(eventId);
  const singleEventQuery = `
  DELETE FROM events
  WHERE
  id = $1
  returning id`;
  db.one(singleEventQuery, [eventId]).then(resp =>{
    res.redirect(`/events?msg=pleasework`)
  })
})

module.exports = router;
