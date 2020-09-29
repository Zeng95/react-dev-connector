const jwt = require('jsonwebtoken')
const config = require('config')

exports.verifyToken = async (req, res, next) => {
  // Get token from header
  let token = req.headers['x-auth-token'] || req.headers['authorization']

  // Check if there is a token
  if (!token) {
    return res.status(401).json({
      success: false,
      msg: 'No authentication token, authorization denied'
    })
  }

  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length)
  }

  try {
    // Verify token
    const decoded = await jwt.verify(token, config.get('jwtSecret'))
    req.userId = decoded.userId
    next()
  } catch (err) {
    return res.status(401).json({
      success: false,
      msg: 'Token verification failed, authorization denied'
    })
  }
}
