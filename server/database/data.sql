DROP TABLE IF EXISTS books;
-- DROP TABLE IF EXISTS user_account;
-- DROP TABLE IF EXISTS token;

CREATE TABLE books (
    id INT GENERATED ALWAYS AS IDENTITY, 
    name VARCHAR (100) NOT NULL,
    author VARCHAR (50) NOT NULL,
    genre VARCHAR (30) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO books (name, author, genre)
VALUES
    ('Moby-Dick', 'Herman Melville', 'Adventure Fiction'),
    ('The Great Gatsby', 'F. Scott Fitzgerald', 'Tragedy'),
    ('Pride and Prejudice', 'Jane Austen', 'Romance');

-- CREATE TABLE user_account (
--     user_id INT GENERATED ALWAYS AS IDENTITY,
--     username VARCHAR(30) UNIQUE NOT NULL,
--     password CHAR(60) NOT NULL,
--     PRIMARY KEY (user_id)
-- );

-- CREATE TABLE token (
--     token_id INT GENERATED ALWAYS AS IDENTITY,
--     user_id INT NOT NULL,
--     token CHAR(36) UNIQUE NOT NULL,
--     PRIMARY KEY (token_id),
--     FOREIGN KEY (user_id) REFERENCES user_account("user_id")
-- );