const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.status(401).json("You are not authorized");
  };
  
  const isAdmin = (req, res, next) => {
    if (req.isAuthenticated()) {
      if (req.user.role === "admin") {
        return next();
      }
    }
    return res.status(401).json("You need to be admin");
  };
  
  module.exports = {
    isAuthenticated,
    isAdmin,
  };