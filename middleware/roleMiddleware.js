//middleware/roleMiddleware.js
const roleMiddleware = (role) => (req, res, next) => {
    if (req.user && req.user.role === role) {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden' });
    }
  };
  
  module.exports = roleMiddleware;
  