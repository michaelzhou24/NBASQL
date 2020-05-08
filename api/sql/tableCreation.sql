USE nbadb;

Drop table if exists playerplaysfor;
Drop table if exists seasonof;
Drop table if exists TeamPlaysGame;
Drop table if exists game;
drop table if exists funds;
drop table if exists stadium;
Drop table if exists coach;
Drop table if exists teamplaysin;
drop table if exists city;
drop table if exists sponsorships;
drop table if exists hasmascot;
drop table if exists country;
drop view if exists teamplayers;

CREATE TABLE City(
    abbrev varchar(4),
    name varchar(20),
    coordinates varchar(50),
    gdp INTEGER,
    population INTEGER,
    country char(3),
    PRIMARY KEY (abbrev)
);

CREATE TABLE TeamPlaysIn (
    id integer AUTO_INCREMENT,
    city varchar(4),
    name varchar(20) UNIQUE,
    logo varchar(20),
    PRIMARY KEY (id, city),
    FOREIGN KEY (city) REFERENCES City(abbrev)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE PlayerPlaysFor(
    id integer AUTO_INCREMENT,
    teamID integer,
    number INTEGER,
    name varchar(20),
    position varchar(3),
    zscore FLOAT,
    PRIMARY KEY (id),
    FOREIGN KEY (teamID) REFERENCES TeamPlaysIn(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Coach(
    id integer,
    name varchar(20),
    years integer,
    specialization varchar(20),
    teamID integer,
    PRIMARY KEY (id),
    FOREIGN KEY (teamID) REFERENCES TeamPlaysIn (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Stadium(
    id integer AUTO_INCREMENT,
    name varchar(24),
    city varchar(4),
    PRIMARY KEY (id),
    FOREIGN KEY (city) REFERENCES City(abbrev) ON DELETE CASCADE
);

CREATE VIEW teamPlayers AS
SELECT teamplaysin.name AS teamname, playerplaysfor.name AS playername,
       playerplaysfor.number AS playernum, playerplaysfor.position AS playerposition,
       playerplaysfor.zscore AS zscore, playerplaysfor.id AS playerID
FROM teamplaysin Inner JOIN playerplaysfor
                            ON teamplaysin.id=playerplaysfor.teamID
ORDER BY teamname;