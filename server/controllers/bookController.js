const Book = require('../models/Book')

async function index (req, res) {
  try {
      const books = await Book.getAll();
      res.status(200).json(books);
  } catch (err) {
      res.status(500).json({ error: err.message })
  }
}

async function show (req, res) {
  try {
      const id = parseInt(req.params.id);
      const book = await Book.getOneById(id);
      res.status(200).json(book);
  } catch (err) {
      res.status(404).json({ error: err.message })
  }
}

async function findByGenre (req, res) {
  try {
      const genre = req.params.genre.toLowerCase()
      const book = await Book.findByGenre(genre);
      res.status(200).json(book);
  } catch (err) {
      res.status(404).json({ error: err.message })
  }
}

async function create (req, res) {
  try {
      const data = req.body
      const newBook = await Book.create(data);
      res.status(201).json(newBook);
  } catch (err) {
      res.status(404).json({ error: err.message})
  }
}

async function update (req, res) {
  try {
      const data = req.body
      const id = parseInt(req.params.id)
      const bookToUpdate = await Book.getOneById(id)
      
      if (!bookToUpdate) {
          return res.status(404).send({ message: 'Book not found' });
      }

      const result = await bookToUpdate.update(data);
      res.status(200).json(result);

  } catch (err) {
      res.status(404).json({error: err.message})
  }
}

async function destroy (req, res) {
  try {
      const id = parseInt(req.params.id);
      const bookToDelete = await Book.getOneById(id);
      await bookToDelete.destroy();
      res.sendStatus(204)
  } catch (err) {
      res.status(404).json({ error: err.message })
  }
}

module.exports = {
  index,
  show,
  findByGenre,
  create,
  update,
  destroy
}
