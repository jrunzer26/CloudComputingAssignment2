/**
 * Gets the users favorites from the server.
 */
function getFavorites() {
  console.log('faves');
  $.ajax({
    type: 'GET',
    url: '/favorites/getAll',
    contentType: "application/json; charset=utf-8",
    success: function(res) {
      processFavoriteList(res);
    },
    error: function(res) {
      console.log(res);
    }
  });
}

/**
 * Inserts the favorites into the list.
 */
function processFavoriteList(res) {
  if (res.length == 0) {
    $('#jobs').append('<p>No Favorites</p>');
  } else {
    for (var i = 0; i < res.length; i++) {
      getPostData(res[i]);
    }
  }
}

/**
 * Gets the github data for a job.
 */
function getPostData(res) {
  $.ajax({
    type: 'POST',
    url: '/favorites/getAJob',
    data: JSON.stringify({jobID: res.jobID}),
    contentType: "application/json; charset=utf-8",
    success: function(res) {
      processFavorite(res);
    },
    error: function(res) {
      console.log(res);
    }
  });
}

/**
 * Processes the favorite job posting into html.
 */
function processFavorite(posting) {
  console.log(posting);
  var jobFeedHtml = '' +
    '<div id="'+posting.id+'" class="row row-centered">'+
      '<div class="col-centered">'+
        '<div class="aJob">'+
          '<h3 class="title">'+
            '<a href="'+posting.url+'">'+
              posting.title +
            '</a>'+
          '</h3>'+
          '<div class="jobDes">'+
            '<label>Type</label>'+
            '<div class="type">' +posting.type+'</div><br>'+
            '<label>Company</label>'+
            '<div class="company">'+posting.company+'</div><br>'+
            '<label>Date</label>'+
            '<div class="date">'+posting.created_at+'</div><br>'+
            '<i class="fa fa-star clickable" aria-hidden="true" onclick="favorite(\''+posting.id+'\')"></i>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</div>';
  $('#jobs').append(jobFeedHtml);
}

/**
 * Remove a favorited job id.
 */
function favorite(id) {
  console.log(id);
  $('#'+id).remove();
  removeFavoriteFromServer(id);
}

/**
 * Removes a favorite from a server.
 */
function removeFavoriteFromServer(id) {
  $.ajax({
    type: 'POST',
    url: '/favorites/remove',
    data: JSON.stringify({jobID: id}),
    contentType: "application/json; charset=utf-8"
  });
}
/**
 * Get the favorites on ready.
 */
$(document).ready(function() {
  getFavorites();
});
