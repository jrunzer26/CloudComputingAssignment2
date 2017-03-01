/** 
 * Author: Jason Runzer
 * globalJS.js
 * 3/1/2017
 * Client side javascript for navigation and socket initialization.
 */

var socket = io();

// navigation functions.
function navSignOut() {
  window.location = '/logout';
}

function navFeed() {
  window.location = '/feed';
}

function navFave() {
  window.location = '/favorites';
}

function navProfile() {
  window.location ='/profile';
}
// end navigation functions.