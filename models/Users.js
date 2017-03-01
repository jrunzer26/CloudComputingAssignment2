var pgp = require('pg-promise')();
var cn = {
    host: 'rds-postgresql-jobdb.cd1uzalikdbi.us-west-2.rds.amazonaws.com',
    port: 5432,
    database: 'jobdb',
    user: 'jason',
    password: 'cloud-computing'
};

var db = pgp(cn);

/**
 * Gets the user from the database.
 */
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

/**
 * Adds a user to the database.
 */
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

/**
 * Updates a user in the database.
 */
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

/**
 * Adds a favorite to the user's favorites.
 */
exports.favoriteJob = function(userID, jobID) {
  db.any('SELECT * FROM public."Favorites" WHERE "userID" = $1 AND "jobID" = $2;', [userID, jobID])
  .then(function(data) {
    if (data.length < 1) {
      db.none('INSERT INTO public."Favorites"("jobID", "userID") VALUES($1, $2);', [jobID, userID])
        .then(function() {
          console.log('success');
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  })
  .catch(function(err) {
    console.log(err);
  })
}

/**
 * Gets the favorites for a given user.
 */
exports.getFavorites = function(id, callback) {
  console.log('faves');
  db.any('SELECT * FROM public."Favorites" WHERE "userID" = $1;', [id])
  .then(function(data) {
    console.log('success');
    console.log(data);
    return callback(data);
  })
  .catch(function(err) {
    console.log(err);
  });
}

/**
 * Removes a favorite for a given user.
 */
exports.removeFavorite = function(userID, jobID) {
  console.log('remove fave');
  db.none('DELETE FROM public."Favorites" WHERE "userID" = $1 AND "jobID" = $2;', [userID, jobID])
  .then(function() {
    console.log('success');
  })
  .catch(function(err){
    console.log(err);
  });
}

/**
 * Gets the count of active users.
 */
exports.getActiveUsers = function(callback) {
  console.log('active users');
  db.any('SELECT * FROM public."Active";')
  .then(function(userCount) {
    callback(userCount[0].count);
  })
  .catch(function(err) {
    console.log(err);
  });
}

/**
 * Increments the count of active users.
 */
exports.addActiveUser = function(callback) {
  db.any('UPDATE public."Active" SET "count" = "count" + 1;')
  .then(function() {
    console.log('updated');
    callback();
  })
  .catch(function(err) {
    console.log(err);
  });
}

/**
 * Decrements the active user count.
 */
exports.removeActiveUser = function(callback) {
  db.any('UPDATE public."Active" SET "count" = "count" - 1;')
  .then(function() {
    console.log('updated remove');
    callback();
  })
  .catch(function(err) {
    console.log(err);
  });
}

