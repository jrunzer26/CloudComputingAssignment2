function gitLogin() {
    window.location = '/github';
}

socket.on('active', function (data) {
  updateActive();
});

socket.on('unactive', function (data) {
    removeActive();
});

function updateActive() {
    $('#active').text(parseInt($('#active').text()) + 1);
}

function removeActive() {
    $('#active').text(parseInt($('#active').text()) - 1);
}