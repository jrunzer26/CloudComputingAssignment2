/**
 * Navigation to github oAuth login.
 */
function gitLogin() {
    window.location = '/github';
}

/**
 * Update the user count.
 */
socket.on('active', function (data) {
  updateActive();
});

/**
 * Remove a user count.
 */
socket.on('unactive', function (data) {
    removeActive();
});

function updateActive() {
    $('#active').text(parseInt($('#active').text()) + 1);
}

function removeActive() {
    $('#active').text(parseInt($('#active').text()) - 1);
}