function getPostings() {
  $.ajax({
    type: 'POST',
    url: '/feed/positions',
    contentType: "application/json; charset=utf-8",
    success: function(res) {
      console.log("Successfull feed");
      console.log(res[0].title);
      console.log(res[0].url);
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
    jobFeedHtml += "No Job Postings"
  }
  insertIntoList(jobFeedHtml);
}

function insertIntoList(jobFeedHtml) {
  $('#jobs').append(jobFeedHtml);
}

$(document).ready(function() {
  getPostings();
});
