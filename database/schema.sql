CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    displayname VARCHAR(20) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    avatar_url VARCHAR DEFAULT 'https://png.pngtree.com/png-clipart/20190117/ourmid/pngtree-delicious-drink-taiwan-milk-tea-png-image_437973.jpg',
    favorite_dessert VARCHAR(100)
);

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(200),
    avatar_url VARCHAR DEFAULT 'https://png.pngtree.com/png-clipart/20190117/ourmid/pngtree-delicious-drink-taiwan-milk-tea-png-image_437973.jpg',
    event_time text,
    comments VARCHAR(500),
    creator_id INTEGER
);

CREATE TABLE groups (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    avatar_url VARCHAR(100),
    is_private BOOLEAN DEFAULT FALSE
);

CREATE TABLE group_rels (
    id SERIAL PRIMARY KEY,
    userId INTEGER NOT NULL,
    groupId INTEGER NOT NULL
);

CREATE TABLE event_rels (
    id SERIAL PRIMARY KEY,
    userId INTEGER NOT NULL,
    eventId INTEGER NOT NULL
);

