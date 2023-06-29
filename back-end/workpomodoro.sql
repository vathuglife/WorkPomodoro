CREATE TABLE Users(
	UID varchar PRIMARY KEY ,
	name nvarchar(50) NOT NULL,
	username varchar(30) NOT NULL,
	password varchar(30) NOT NULL,
	role char(2) NOT NULL,
	status bit NOT NULL
)

CREATE TABLE Tasks(
	tid varchar PRIMARY KEY,
	name nvarchar(50) NOT NULL,
	details varchar(512),		
	status bit NOT NULL,
	UID varchar REFERENCES Users(UID) ,
)
ALTER TABLE Tasks
ALTER Column details varchar(512)

CREATE TABLE Songs(
	sid varchar PRIMARY KEY,
	name nvarchar(50) NOT NULL,
	link varchar(512),		
	status bit NOT NULL,
	UID varchar REFERENCES Users(UID) ,
)

SELECT * FROM Accounts
DELETE FROM Accounts