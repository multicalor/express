// const ApiError = require('../error/ApiError');
// const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1]; //Bearer fvbdfgdfgdf
    if (!token) {
      return res.status(401).json({message: "you are not logged in"})
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (e) {
    console.log(e);
    return res.status(200).json({message:"authorization failed"})
  }
};