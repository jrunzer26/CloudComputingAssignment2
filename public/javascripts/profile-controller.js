/**
 * Posts a users profile to the server.
 */
function saveProfile() {
  console.log('save profile');
  var postData = {
    location: $('#location').val(),
    search: $('#search').val()
  };
  $.ajax({
    type: 'POST',
    url: '/profile/save',
    data: JSON.stringify(postData),
    contentType: "application/json; charset=utf-8",
    success: function(res) {
      profileSaved();
    },
    error: function(res) {
      console.log(res);
    }
  });
}

/**
 * Navigate to default page after profile setup.
 */
function profileSaved(){
  window.location = "/feed";
}

/**
 * Show the profile items.
 */
function showProfile() {
    $('#search').val($.cookie('search'));
    $('#location').val($.cookie('location'));
}

/**
 * On ready, show the user's profile.
 */
$(document).ready(function() {
    showProfile();
});
