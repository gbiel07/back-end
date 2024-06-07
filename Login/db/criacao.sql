CREATE DATABASE Usuarios;
USE Usuarios;


CREATE TABLE User (
   iduser int,
    username VARCHAR(20) NULL,
    password VARCHAR(8) NULL,
    PRIMARY KEY(iduser)
);

insert into User (iduser, username, password) Values (1, 'Gabriel', '12345678');

select * from user;


