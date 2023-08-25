const bcrypt = require('bcrypt')
const User = require('../models/Users')
const Token = require('../models/Tokens')

async function register (req, res) {
  try {
      const data = req.body;
      const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
      data.password = await bcrypt.hash(data.password, salt);
      const result = await User.create(data);
      res.status(201).send(result);
  } catch (err) {
      res.status(400).json({ error: err.message })
  }
}

async function login (req, res) {
  try {
      const data = req.body;
      const user = await User.getOneByUsername(data.username);
      const authenticated = await bcrypt.compare(data.password, user.password);
      if (!authenticated) {
          throw new Error('Incorrect credentials.');
      } else {
          const token = await Token.create(user["user_id"]);
          res.status(200).json({ authenticated: true, token: token.token });
      }     
  } catch (err) {
      res.status(401).json({ error: err.message })
  }
}

async function logout(req, res) {
  try {
    const token = req.headers["authorization"];
    await Token.destroyByToken(token);
    res.status(200).json("Successfully logged out.");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  register,
  login,
  logout
}
