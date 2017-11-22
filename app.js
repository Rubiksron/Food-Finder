'use strict';

const resultsArray = [];
let map;
     function initMap() {
       map = new google.maps.Map(document.getElementById('map'), {
         zoom: 4,
         center: new google.maps.LatLng(47.608013,-122.335167),
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
         let resultsEl = document.getElementById('results');
         let hrEl = document.createElement('hr');
         hrEl.textContent = `Location: ${place} --- Magnitude: ${magnitude}`;
         resultsEl.appendChild(hrEl);
       }
       resultsArray.push(results)
       console.log(' inside callback  --  resultsArray[0].features[1].properties.place:  ', resultsArray[0].features[1].properties.place);
     }
     console.log('outside callback  --  resultsArray', resultsArray);




     function listResults(resultsArray) {
       console.log(resultsArray, "resultsArray:  ");
     }
     // listResults();








// let zomato = require('zomato');
//
// let client = zomato.createClient({
//   userKey: '1816915b03a9fa391c88703a243405d0'
// });
//
// client.getCities({
//   q:"Seattle",
//   lat:"47.608013",
//   lon:"-122.335167",
//   count:"10"
// }, function(err, result) {
//   if(!err) {
//     console.log(result);
//   } else {
//     console.log(err);
//   }
// });
