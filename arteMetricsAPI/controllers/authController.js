const authController = {};

authController.verify = (req, res, next) => {
  return next();
};
module.exports = authController;
