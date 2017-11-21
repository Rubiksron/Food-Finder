'use strict';

function initMap() {
  let seattle = {
    lat: 47.608013, lng: -122.335167
  };
  let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: seattle
  });
  let marker = new google.maps.Marker({
    position: seattle,
    map: map
  });
}
