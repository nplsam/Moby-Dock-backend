const Trade = require('../models/Trade')

async function index (req, res) {
  try {
      const trades = await Trade.getAll();
      res.status(200).json(trades);
  } catch (err) {
      res.status(500).json({ error: err.message })
  }
}

async function show (req, res) {
  try {
      const id = parseInt(req.params.id);
      const trade = await Trade.getOneById(id);
      res.status(200).json(trade);
  } catch (err) {
      res.status(404).json({ error: err.message })
  }
}

async function create (req, res) {
  try {
      const data = req.body
      const newTrade = await Trade.create(data);
      res.status(201).json(newTrade);
  } catch (err) {
      res.status(404).json({ error: err.message})
  }
}

async function update (req, res) {
  try {
      const data = req.body
      const id = parseInt(req.params.id)
      const tradeToUpdate = await Trade.getOneById(id)
      
      if (!tradeToUpdate) {
          return res.status(404).send({ message: 'Trade post not found' });
      }

      const result = await tradeToUpdate.update(data);
      res.status(200).json(result);

  } catch (err) {
      res.status(404).json({error: err.message})
  }
}

async function destroy (req, res) {
  try {
      const id = parseInt(req.params.id);
      const tradeToDelete = await Trade.getOneById(id);
      await tradeToDelete.destroy();
      res.sendStatus(204)
  } catch (err) {
      res.status(404).json({ error: err.message })
  }
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy
}
