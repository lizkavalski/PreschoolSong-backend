// authMiddleware.js

// Middleware to check if the user is authenticated with Google
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    // If the user is authenticated, continue to the next middleware or route handler
    return next();
  }

  // If the user is not authenticated, redirect them to the login page or handle the authentication process
  res.redirect('/login');
}

module.exports = ensureAuthenticated;
