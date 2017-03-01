//
// Author: Jason Runzer
// util.js
// 3/1/2017
// Utility class to check a login.
//

/**
 * Checks a login, if not logged in, redirects to failed login.
 */
exports.checkLogin = function(req, res, next) {
  if (req.user) {
    console.log('user logged in');
    next();
  } else {
    console.log('user not logged in');
    return res.redirect('/?login=failed');
  }
}