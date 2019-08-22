insert into users
(displayname, username, email, password)
VALUES
('friend1','imurfriend', 'friend@gmail.com', 'qwerty1'),
('friend2','urmyfriend','friends@gmail.com', 'qwerty2');
select * from users;


insert into events
(name, location, event_time)
VALUES
('bobabattle', 'duluth', '1999-01-08 04:05:06'),
('eat cake till I die', 'cheesecake factory', '1999-01-08 04:05:06');

select * from events;

INSERT INTO groups
(name, is_private)
VALUES
('boba buddies', TRUE),
('Cake Friends', FALSE);

select * from groups;


INSERT INTO group_rels
(userId, groupId)
VALUES
(1,1),
(2,2);
select * from group_rels;

insert into event_rels
(userId, eventId)
VALUES
(1,1),
(2,2);
select * from event_rels;


