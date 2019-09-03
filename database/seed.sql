insert into users
(displayname, username, email, password)
VALUES
('Sean','Sean','sean@gmail.com', 'qwerty2'),
('Charles','Charles', 'charles@gmail.com', 'qwerty1');


insert into events
(name, location, event_time, creator_id)
VALUES
('Bubble Tea Meetup', 'Doraville', '2019-08-30 16:00:00', 1),
('Cortez Reunion', 'cheesecake factory', '2019-09-06 16:00:00', 2);

insert into event_rels
(userId, eventId)
VALUES
(1,1),
(2,2);


