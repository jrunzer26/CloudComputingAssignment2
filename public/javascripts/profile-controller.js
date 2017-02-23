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

function profileSaved(){
  window.location = "/feed";
}

function showProfile() {
    $('#search').val($.cookie('search'));
    $('#location').val($.cookie('location'));
}

$(document).ready(function() {
    showProfile();
});
