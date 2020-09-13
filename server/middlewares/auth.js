const jwt = require('jsonwebtoken')
const config = require('config')

exports.verifyToken = async (req, res, next) => {
  // Get token from header
  let token = req.headers['x-access-token'] || req.headers['authorization']

  // Check if there is a token
  if (!token) {
    return res.status(401).json({
      success: false,
      msg: 'No token, authorization denied'
    })
  }

  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length)
  }

  // Verify token
  try {
    const decoded = await jwt.verify(token, config.get('jwtSecret'))
    req.userId = decoded.userId
    next()
  } catch (error) {
    return res.status(401).send({
      success: false,
      msg: 'Unauthorized'
    })
  }
}