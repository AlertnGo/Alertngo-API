create database alertngo;
use alertngo;

CREATE TABLE user (
    id char(36) NOT NULL,
    name varchar(100) NOT NULL,
    lastname varchar(100) NOT NULL,
    email varchar(100) NOT NULL,
	password varchar(100) NOT NULL,
    telephone  int NOT NULL,
    theme boolean default 0,
    UNIQUE (ID)
);


insert into user (id,name,lastname,email,password,telephone) values ("d314ae5f-942f-4353-9fe9-7e95bb0771ee" , "vishnu" , "gopy" , "gopoy@gmail.com" , "000000" , "0767654321");

CREATE TABLE voiture (
    id char(36) NOT NULL,
    ndp char(36) NOT NULL,
    user_id char(36) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id)
    UNIQUE (ID)
);

insert into voiture (id , ndp , user_id) values ("d6678c9b-1812-408e-abaf-32ef3edfecab", "ch876rj" , "d314ae5f-942f-4353-9fe9-7e95bb0771ee");