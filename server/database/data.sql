DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS user_account;
DROP TABLE IF EXISTS token;

CREATE TABLE books (
    id INT GENERATED ALWAYS AS IDENTITY, 
    name VARCHAR (100) NOT NULL,
    genre VARCHAR (30) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO books (name, genre)
VALUES
    ('Moby-Dick', 'Adventure Fiction');

CREATE TABLE user_account (
    id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(30) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES user_account("user_id")
);