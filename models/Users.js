var pgp = require('pg-promise')();
var cn = {
    host: 'rds-postgresql-jobdb.cd1uzalikdbi.us-west-2.rds.amazonaws.com',
    port: 5432,
    database: 'jobdb',
    user: 'jason',
    password: 'cloud-computing'
};

var db = pgp(cn);

exports.getUser = function(id, callback) {
  db.any('SELECT * FROM public."Users" WHERE id = $1;', [id])
  .then(function(data) {
    console.log(data);
    return callback(data);
  })
  .catch(function(err) {
    console.log(err);
  });
}

exports.addUser = function(id, username, callback) {
  db.none('INSERT INTO public."Users" VALUES($1, $2);', [id, username])
    .then(function() {
      console.log('success');
      callback();
    })
    .catch(function(err) {
      console.log(err);
    });  
}

exports.updateProfile = function(id, search, location, callback) {
  console.log('save id: ' + id);
  console.log('save location: ' + location);
  db.none('UPDATE public."Users" SET location = $1, search = $2 WHERE id = $3;', [location, search, id])
    .then(function() {
      console.log('success update');
      callback(true);
    })
    .catch(function(err) {
      console.log(err);
      callback(false);
    });  
}

exports.favoriteJob = function(userID, jobID) {
  db.none('INSERT INTO public."Favorites" COLUMNS(jobID, userID) VALUES($1, $2);', [jobID, userID])
    .then(function() {
      console.log('success');
      console.log
    })
    .catch(function(err) {
      console.log(err);
    });
}

exports.getFavorites = function(id, callback) {
  console.log('faves');
  db.any('SELECT * FROM public."Favorites" WHERE id = $1;', [id])
  .then(function(data) {
    return callback(data);
  })
  .catch(function(err) {
    console.log(err);
  });
}