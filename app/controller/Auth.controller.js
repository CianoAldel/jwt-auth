
require('dotenv').config()
var initModels = require("../../models/init-models");
const sequelize = require('../config/database');
var models = initModels(sequelize);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const fetch = require('node-fetch');


let refreshTokens = []

const token = (req, res) => {
  const refreshToken = req.body.token

  if (refreshToken == null)
    return res.sendStatus(401)

  if (!refreshTokens.includes(refreshToken))
    return res.sendStatus(403)

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ name: user.name })
    res.json({ accessToken: accessToken })
  })
};

const logout = (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204)
}

const login = async (req, res) => {
  console.log(req.body);

  const findUserDB = await models.tb_user.findOne(
    {
      where: {
        username: req.body.username
      },
      raw: true
    }
  ).then(element => {
    return element
  });
  // Authenticate User
  if (findUserDB === null) {
    res.json({
      status: 400,
      message: 'Please register your account'
    })
  } else {
    let data = {
      username: findUserDB.username,
    }
    const accessToken = generateAccessToken(data)
    const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken)

    res.json({ accessToken: accessToken, refreshToken: refreshToken })
    
  }
};

const register = async (req, res) => {
  try {
    const findUserDB = await models.tb_user.findOne(
      {
        where: {
          username: req.body.username
        },
        raw: true
      }
    ).then(element => {
      return element
    });

    if (findUserDB !== null) {

      res.json({
        status: 400,
        message: 'Username already exists'
      })

    } else {

      const genSalt = await bcrypt.genSalt();
      const hashedPassword = await (await bcrypt.hash(req.body.password, genSalt)).toString();
      const user = { name: req.body.username, password: hashedPassword };
      const sendToDB = await models.tb_user.create(
        {
          username: user.name,
          password: user.password
        }
        , {
          fields: [
            'username',
            'password'
          ]
        });

      res.json({
        status: 200,
        message: 'Register success'
      })
    }

  } catch (error) {
    res.status(500).send();

  }

}

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' })
}


module.exports = {
  token,
  login,
  logout,
  register
};


