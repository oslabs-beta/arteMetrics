CREATE TABLE Users
(
	_id serial NOT NULL,
	api_key varchar(255) NOT NULL UNIQUE,
	username varchar(255) NOT NULL UNIQUE,
	password varchar(255) NOT NULL,
	CONSTRAINT Users_pk PRIMARY KEY (_id)
)
WITH (
  OIDS=FALSE
);



CREATE TABLE Queries
(
	_id serial NOT NULL,
	api_key varchar(255) NOT NULL,
	name varchar(255) NOT NULL,
	start_time TIMESTAMP(255) NOT NULL,
	end_time TIMESTAMP(255) NOT NULL,
	duration int NOT NULL,
	resolvers json NOT NULL,
	CONSTRAINT Queries_pk PRIMARY KEY (_id)
)
WITH (
  OIDS=FALSE
);



