'use strict';

const resultsArray = [];
const resultsEl = document.getElementById('results');
let map, lat, lon;

  navigator.geolocation.getCurrentPosition(function(location) {
    lat = location.coords.latitude;
    lon = location.coords.longitude;
    initMap(lat, lon);
    console.log(`Your exact location latitude and longitude is: ${lat},${lon}`);
  });


   function initMap(lat, lon) {
       map = new google.maps.Map(document.getElementById('map'), {
         zoom: 13,
         center: new google.maps.LatLng(lat, lon),
         mapTypeId: 'terrain'
       });

       let script = document.createElement('script');
       script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
       document.getElementsByTagName('head')[0].appendChild(script);
     }

     window.eqfeed_callback = function(results) {
       for (let i = 0; i < results.features.length; i++) {
         let magnitude = results.features[i].properties.mag;
         let place = results.features[i].properties.place;
         let coords = results.features[i].geometry.coordinates;
         let latLng = new google.maps.LatLng(coords[1],coords[0]);
         let marker = new google.maps.Marker({
           position: latLng,
           map: map
         });
         //BELOW IS A TEST TO ENSURE THE USERS LOCATION IS BEING ACCESSED, SO I CREATED A MARKER AT THE COORDINATES FOR PROOF.
         latLng = new google.maps.LatLng(lat, lon);
         marker = new google.maps.Marker({
           position: latLng,
           map: map

         });


         let hrEl = document.createElement('hr');
         hrEl.textContent = `Location: ${place} - Magnitude: ${magnitude}`;
         resultsEl.appendChild(hrEl);
       }

       resultsArray.push(results)
       // console.log(' inside callback  --  resultsArray[0].features[1].properties.place:  ', resultsArray[0].features[1].properties.place);
     }

     // console.log('outside callback  --  resultsArray', resultsArray);
