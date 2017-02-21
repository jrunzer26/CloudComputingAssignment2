function getPostings() {
  $.ajax({
    type: 'POST',
    url: '/feed/positions',
    contentType: "application/json; charset=utf-8",
    success: function(res) {
      console.log("Successfull feed");
      console.log(res[0].title);
    },
    error: function(res) {
      console.log(res);
    }
  });
}

$(document).ready(function() {
  getPostings();
});
