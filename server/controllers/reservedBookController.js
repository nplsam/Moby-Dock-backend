const ReservedBooks = require('../models/ReservedBook')

async function index (req, res) {
  try {
      const reservedBooks = await reservedBooks.getAll();
      res.status(200).json(reservedBooks);
  } catch (err) {
      res.status(500).json({ error: err.message })
  }
}

async function showById (req, res) {
  try {
      const id = parseInt(req.params.id);
      const reservedBook = await ReservedBooks.getOneById(id);
      res.status(200).json(reservedBook);
  } catch (err) {
      res.status(404).json({ error: err.message })
  }
}

async function showByName (req, res) {
  try {
      const name = parseInt(req.params.name);
      const reservedBook = await ReservedBooks.getOneByName(name);
      res.status(200).json(reservedBook);
  } catch (err) {
      res.status(404).json({ error: err.message })
  }
}

async function create (req, res) {
  try {
      const data = req.body
      const newReservedBook = await ReservedBooks.create(data);
      res.status(201).json(newReservedBook);
  } catch (err) {
      res.status(404).json({ error: err.message})
  }
}

async function destroy (req, res) {
  try {
      const book_id = parseInt(req.params.id);
      const reservedBookToDelete = await ReservedBooks.getOneById(book_id);
      await reservedBookToDelete.destroy();
      res.sendStatus(204)
  } catch (err) {
      res.status(404).json({ error: err.message })
  }
}

module.exports = {
  index,
  showById,
  showByName,
  create,
  destroy
}
