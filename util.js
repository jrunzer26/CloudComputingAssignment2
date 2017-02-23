exports.checkLogin = function(req, res, next) {
  if (req.user) {
    console.log('user logged in');
    next();
  } else {
    console.log('user not logged in');
    return res.redirect('/?login=failed');
  }
}