DROP TABLE IF EXISTS books cascade;
DROP TABLE IF EXISTS user_account cascade;
DROP TABLE IF EXISTS token;
DROP TABLE IF EXISTS reserved_books;
DROP TABLE IF EXISTS trades;

CREATE TABLE books(
    id INT GENERATED ALWAYS AS IDENTITY, 
    name VARCHAR (100) NOT NULL,
    author VARCHAR (50) NOT NULL,
    genre VARCHAR (30) NOT NULL,
    reserved BOOLEAN default FALSE,
    image VARCHAR (1000) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO books (name, author, genre, reserved, image)
VALUES
    ('Moby-Dick', 'Herman Melville', 'Fiction', FALSE, 'https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781681778488/moby-dick-9781681778488_hr.jpg'),
    ('The Great Gatsby', 'F. Scott Fitzgerald', 'Tragedy', FALSE, 'https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg'),
    ('Pride and Prejudice', 'Jane Austen', 'Romance', FALSE, 'https://almabooks.com/wp-content/uploads/2016/10/9781847493699.jpg'),
    ('The Da Vinci Code', 'Dan Brown', 'Crime', FALSE, 'https://m.media-amazon.com/images/I/71tUTxjHHQL._AC_UF894,1000_QL80_.jpg'),
    ('Harry Potter and the Deathly Hallows', 'J.K. Rowling', 'Fiction', FALSE, 'https://m.media-amazon.com/images/I/51tB0kftR-L._AC_UF894,1000_QL80_.jpg'),
    ('Harry Potter and the Philosophers Stone', 'J.K. Rowling', 'Fiction', FALSE, 'https://res.cloudinary.com/bloomsbury-atlas/image/upload/w_568,c_scale/jackets/9781526646651.jpg'),
    ('Fifty Shades of Grey', 'E.L. James', 'Romance', FALSE, 'https://m.media-amazon.com/images/I/81MQxZWmXWL._AC_UF894,1000_QL80_.jpg'),
    ('Harry Potter and the Goblet of Fire', 'J.K. Rowling', 'Fiction', FALSE, 'https://m.media-amazon.com/images/I/41AF6KHRGML._AC_UF894,1000_QL80_.jpg'),
    ('Harry Potter and the Chamber of Secrets', 'J.K. Rowling', 'Fiction', FALSE, 'https://onlineshop.oxfam.org.uk/ccstore/v1/images/?source=/file/v4379030915960582687/products/HD_301587516.1.jpg&height=940&width=940'),
    ('Harry Potter and the Prisoner of Azkaban', 'J.K. Rowling', 'Fiction', FALSE, 'https://assets.mugglenet.com/wp-content/uploads/2018/01/PoA-Amazon-Kindle-Cover-683x1024.jpeg'),
    ('Angels and Demons', 'Dan Brown', 'Crime', FALSE, 'https://m.media-amazon.com/images/I/41XfUhPVBSL.jpg'),
    ('Harry Potter and the Half-blood Prince', 'J.K. Rowling', 'Fiction', FALSE, 'https://upload.wikimedia.org/wikipedia/en/b/b5/Harry_Potter_and_the_Half-Blood_Prince_cover.png'),
    ('Fifty Shades Darker', 'E.L. James', 'Romance', FALSE, 'https://cdn.penguin.co.uk/dam-assets/books/9781529199796/9781529199796-jacket-large.jpg'),
    ('Twilight', 'Stephenie Meye', 'Fiction', FALSE, 'https://m.media-amazon.com/images/I/615ZIxEDozL._AC_UF1000,1000_QL80_.jpg'),
    ('Girl with the Dragon Tattoo, The:Millennium Trilogy', 'Stieg Larsson', 'Crime', FALSE, 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1684638853l/2429135.jpg'),
    ('Fifty Shades Freed', 'E.L. James', 'Romance', FALSE, 'https://media.lovehoneyassets.com/i/lovehoney/37880_000?$primary$&h=765&w=574'),
    ('The Lost Symbol', 'Dan Brown', 'Crime', FALSE, 'https://images.penguinrandomhouse.com/cover/9780307950680'),
    ('New Moon', 'Stephenie Meyer', 'Fiction', FALSE, 'https://m.media-amazon.com/images/P/1904233880.01._SCLZZZZZZZ_SX500_.jpg'),
    ('Deception Point', 'Dan Brown', 'Crime', FALSE, 'https://pictures.abebooks.com/isbn/9780552159722-uk.jpg'),
    ('Eclipse', 'Stephenie Meyer', 'Fiction', FALSE, 'https://ccu.marmot.org/bookcover.php?size=large&id=87e3d621-5545-46ec-b1e4-e1f50781e290&type=overdrive'),
    ('The Lovely Bones', 'Alice Sebold', 'Fiction', FALSE, 'https://m.media-amazon.com/images/I/41sSMTDFBCL._SX327_BO1,204,203,200_.jpg'),
    ('Digital Fortress', 'Dan Brown', 'Crime', FALSE, 'https://m.media-amazon.com/images/I/61MaBq+c2RL._AC_UF894,1000_QL80_.jpg'),
    ('The Curious Incident of the Dog in the Night-time', 'Mark Haddon', 'Crime', FALSE, 'https://m.media-amazon.com/images/I/71tuo9YISuL._AC_UF894,1000_QL80_.jpg'),
    ('A Short History of Nearly Everything', 'Bill Bryson', 'Science', FALSE, 'https://m.media-amazon.com/images/I/81IFXnlXNKL._AC_UF894,1000_QL80_.jpg'),
    ('Girl Who Played with Fire,The:Millennium Trilogy', 'Stieg Larsson', 'Crime', FALSE, 'https://m.media-amazon.com/images/I/51qjTM41IXL._AC_UF894,1000_QL80_.jpg'),
    ('Breaking Dawn', 'Stephenie Meyer', 'Fiction', FALSE, 'https://m.media-amazon.com/images/I/51sjfP080VL._AC_UF894,1000_QL80_.jpg'),
    ('The Gruffalo', 'Eric Carle', 'Picture Books', FALSE, 'https://m.media-amazon.com/images/P/0333901762.01._SCLZZZZZZZ_SX500_.jpg'),
    ('Jamies 30-Minute Meals', 'Jamie Oliver', 'Food', FALSE, 'https://m.media-amazon.com/images/P/B06XCB1LSB.01._SCLZZZZZZZ_SX500_.jpg'),
    ('The Kite Runner', 'Khaled Hosseini', 'Fiction', FALSE, 'https://productimages.worldofbooks.com/1408845474.jpg'),
    ('One Day', 'David Nicholls', 'Fiction', FALSE, ''),
    ('A Thousand Splendid Suns', 'Stephenie Meyer', 'Fiction', FALSE, ''),
    ('Girl Who Kicked the Hornets Nest,The:Millennium Trilogy', 'Stieg Larsson', 'Crime', FALSE, ''),
    ('The Time Travelers Wife', 'Audrey Niffenegger', 'Fiction', FALSE, ''),
    ('Atonement', 'Ian McEwan', 'Fiction', FALSE, ''),
    ('Bridget Jones Diary:A Novel', 'Pan Macmillan', 'Fiction', FALSE, ''),
    ('The World According to Clarkson', 'Jeremy Clarkson', 'Humour', FALSE, ''),
    ('Captain Corellis Mandolin', 'Louis de Bernieres', 'Fiction', FALSE, ''),
    ('The Sound of Laughter', 'Peter Kay', 'Autobiography', FALSE, ''),
    ('Life of Pi', 'Yann Martel', 'Fiction', FALSE, ''),
    ('Billy Connolly', 'Pamela Stephenson', 'Biography', FALSE, ''),
    ('A Child Called It', 'Dave Pelzer', 'Autobiography', FALSE, ''),
    ('The Gruffalos Child', 'Dave Pelzer', 'Autobiography', FALSE, ''),
    ('Angelas Ashes:A Memoir of a Childhood', 'Frank McCourt', 'Autobiography', FALSE, ''),
    ('Birdsong', 'Sebastian Faulks', 'Fiction', FALSE, ''),
    ('S.Northern Lights:His Dark Materials', 'Philip Pullman', 'Fiction', FALSE, ''),
    ('Labyrinth', 'Kate Mosse', 'Fiction', FALSE, ''),
    ('Harry Potter and the Half-blood Prince', 'J.K. Rowling', 'Fiction', FALSE, ''),
    ('The Help', 'Kathryn Stockett', 'Fiction', FALSE, ''),
    ('Man and Boy', 'Tony Parsons', 'Fiction', FALSE, ''),
    ('Memoirs of a Geisha', 'Arthur Golden', 'Fiction', FALSE, ''),
    ('No.1 Ladies Detective Agency,The:No.1 Ladies Detective Agency', 'Alexander McCall Smith', 'Crime', FALSE, ''),
    ('The Island', 'Victoria Hislop', 'Fiction', FALSE, ''),
    ('PS, I Love You', 'Cecelia Ahern', 'Fiction', FALSE, ''),
    ('You are What You Eat:The Plan That Will Change Your Life', 'Gillian McKeith', 'Fitness', FALSE, ''),
    ('The Very Hungry Caterpillar', 'Eric Carle', 'Picture Books', FALSE, ''),
    ('The Shadow of the Wind', 'Carlos Ruiz Zafon', 'Fiction', FALSE, ''),
    ('The Tales of Beedle the Bard,', 'J.K. Rowling ', 'Fiction', FALSE, ''),
    ('The Broker', 'John Grisham', 'Crime', FALSE, ''),
    ('Dr. Atkins New Diet Revolution:The No-hunger, Luxurious Weight Loss P', 'Robert C. Atkins', 'Fitness', FALSE, ''),
    ('Subtle Knife,The:His Dark Materials S.', 'Philip Pullman', 'Fiction', FALSE, ''),
    ('Eats, Shoots and Leaves:The Zero Tolerance Approach to Punctuation', 'Lynne Truss', 'Guides', FALSE, ''),
    ('Delias How to Cook:(Bk.1)', 'Delia Smith', 'Food', FALSE, ''),
    ('Chocolat', 'Joanne Harris', 'Fiction', FALSE, ''),
    ('The Boy in the Striped Pyjamas', 'John Boyne', 'Fiction', FALSE, ''),
    ('My Sisters Keeper', 'Jodi Picoult', 'Fiction', FALSE, ''),
    ('Amber Spyglass,The:His Dark Materials', 'Philip Pullman', 'Fiction', FALSE, ''),
    ('To Kill a Mockingbird', 'Harper Lee', 'Fiction', FALSE, ''),
    ('Men are from Mars, Women are from Venus', 'John Gray', 'Pop Culture', FALSE, ''),
    ('Dear Fatty', 'Dawn French', 'Autobiography', FALSE, ''),
    ('A Short History of Tractors in Ukraine', 'Marina Lewycka', 'Fiction', FALSE, ''),
    ('Hannibal', 'Thomas Harris', 'Crime', FALSE, ''),
    ('The Lord of the Rings', 'J.R.R. Tolkien', 'Fiction', FALSE, ''),
    ('Stupid White Men', 'Michael Moore', 'Current Affairs', FALSE, ''),
    ('The Interpretation of Murder', 'Jed Rubenfeld', 'Crime', FALSE, ''),
    ('Sharon Osbourne Extreme', 'Sharon Osbourne', 'Autobiography', FALSE, ''),
    ('Alchemist,The:A Fable About Following Your Dream', 'Paulo Coelho', 'Fiction', FALSE, ''),
    ('At My Mothers Knee ...:and Other Low Joints', 'Paul OGrady', 'Autobiography', FALSE, ''),
    ('Notes from a Small Island', 'Bill Bryson', 'Travel', FALSE, ''),
    ('The Return of the Naked Chef', 'Jamie Oliver', 'Food', FALSE, ''),
    ('Bridget Jones: The Edge of Reason', 'Helen Fielding', 'Fiction', FALSE, ''),
    ('Jamies Italy', 'Jamie Oliver', 'Fiction', FALSE, ''),
    ('I Can Make You Thin', 'Paul McKenna', 'Fitness', FALSE, ''),
    ('Down Under', 'Bill Bryson', 'Travel', FALSE, ''),
    ('The Summons', 'John Grisham', 'Crime', FALSE, ''),
    ('Small Island', 'Andrea Levy', 'Fiction', FALSE, ''),
    ('Nigella Express', 'Nigella Lawson', 'Food', FALSE, ''),
    ('Brick Lane', 'Monica Ali', 'Fiction', FALSE, ''),
    ('The Memory Keepers Daughter', 'Kim Edwards', 'Fiction', FALSE, ''),
    ('Room on the Broom', 'Julia Donaldson', 'Picture Book', FALSE, ''),
    ('About a Boy', 'Nick Hornby', 'Fiction', FALSE, ''),
    ('My Booky Wook', 'Russell Brand', 'Autobiography', FALSE, ''),
    ('The God Delusion', 'Richard Dawkins', 'Science', FALSE, ''),
    ('White Teeth', 'Zadie Smith', 'Fiction', FALSE, ''),
    ('The House at Riverton', 'Kate Morton', 'Fiction', FALSE, ''),
    ('The Book Thief', 'Stephenie Meyer', 'Fiction', FALSE, ''),
    ('Nights of Rain and Stars', 'Maeve Binchy', 'Fiction', FALSE, ''),
    ('The Ghost', 'Robert Harris', 'Fiction', FALSE, ''),
    ('Happy Days with the Naked Chef', 'Jamie Oliver', 'Food', FALSE, ''),
    ('Hunger Games,The:Hunger Games Trilogy', 'Suzanne Collins', 'Fiction', FALSE, ''),
    ('Lost Boy, A Foster Childs Search for the Love of a Family', 'Dave pelzer', 'Biography', FALSE, ''),
    ('Jamies Ministry of Food:Anyone Can Learn to Cook in 24 Hours', 'Jamie Oliver', 'Food', FALSE, '');


CREATE TABLE user_account (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(30) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE token (
    id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user_account("user_id")
);

CREATE TABLE reserved_books (
    reserved_id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(100),
    book_id INT REFERENCES books(id),
    user_id INT REFERENCES user_account(user_id),
    pick_up_by DATE,
    PRIMARY KEY (reserved_id)
);

CREATE TABLE trades (
    post_id INT GENERATED ALWAYS AS IDENTITY,
    title VARCHAR (100) NOT NULL,
    author VARCHAR (100) NOT NULL,
    genre VARCHAR (50) NOT NULL,
    email VARCHAR (300) NOT NULL,
    PRIMARY KEY (post_id)
);

INSERT INTO trades (title, author, genre, email)
VALUES
('Harry Potter', 'J.K. Rowling','Fiction', 'bobby@gmail.com' );

