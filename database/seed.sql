insert into users
(displayname, username, email, password)
VALUES
('Charles','Charles', 'charles@gmail.com', 'qwerty1'),
('Sean','Sean','sean@gmail.com', 'qwerty2');
select * from users;


insert into events
(name, location, event_time, creator_id)
VALUES
('Bubble Tea Meetup', 'Doraville', '2019-08-30 16:00:00', 1),
('Cortez Family Reunion (all friends welcome)', 'cheesecake factory', '2019-09-06 16:00:00', 2);

select * from events;

insert into event_rels
(userId, eventId)
VALUES
(1,1),
(2,2);
select * from event_rels;


