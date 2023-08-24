const ReservedBooks = require('../models/ReservedBook')

async function index (req, res) {
  try {
      const reservedBooks = await ReservedBooks.getAll();
      res.status(200).json(reservedBooks);
  } catch (err) {
      res.status(500).json({ error: err.message })
  }
}

async function showById (req, res) {
  try {
      const id = parseInt(req.params.id);
      const reservedId = await ReservedBooks.getOneById(id);
      res.status(200).json(reservedId);
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
      const reserved_id = parseInt(req.params.id);
      const reservedBookToDelete = await ReservedBooks.getOneById(reserved_id);
      await reservedBookToDelete.destroy();
      res.sendStatus(204)
  } catch (err) {
      res.status(404).json({ error: err.message })
  }
}

module.exports = {
  index,
  showById,
  create,
  destroy
}
