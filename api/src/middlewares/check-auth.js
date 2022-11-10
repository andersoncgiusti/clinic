const jwt = require("jsonwebtoken");
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {
  try { 
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, authConfig.secret);
    req.userData = { userEmail: decodedToken.userEmail, userId: decodedToken.userId, userPermission: decodedToken.userPermission };
    next();
  } catch (error) {
    res.status(401).json({ message: "You are not authenticated!" });
  }
}