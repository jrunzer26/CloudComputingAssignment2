function getPostings() {
  var location = $.cookie('location');
  var des = $.cookie('search');
  var postData = {location: location, des: des};
  $.ajax({
    type: 'POST',
    url: '/feed/positions',
    data: JSON.stringify(postData),
    contentType: "application/json; charset=utf-8",
    success: function(res) {
      console.log("Successfull feed");
      insertPostings(res);
    },
    error: function(res) {
      console.log(res);
    }
  });
}

function insertPostings(postings) {
  var jobFeedHtml = "";
  for (var i = 0; i < postings.length; i++) {
    jobFeedHtml +=
    '<div class="row row-centered">'+
      '<div class="col-centered">'+
        '<div class="aJob">'+
          '<h3 class="title">'+
            '<a href="'+postings[i].url+'">'+
              postings[i].title +
            '</a>'+
          '</h3>'+
          '<div class="jobDes">'+
            '<label>Type</label>'+
            '<div class="type">' +postings[i].type+'</div><br>'+
            '<label>Company</label>'+
            '<div class="company">'+postings[i].company+'</div><br>'+
            '<label>Date</label>'+
            '<div class="date">'+postings[i].created_at+'</div><br>'+
            '<div class="favButton">favorite</div>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</div>';
  }
  if (postings.length == 0) {
    jobFeedHtml += "<p>No Job Postings</p>"
  }
  insertIntoList(jobFeedHtml);
}

function insertIntoList(jobFeedHtml) {
  $('#jobs').append(jobFeedHtml);
}

$(document).ready(function() {
  getPostings();
});
