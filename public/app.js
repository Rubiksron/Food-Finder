'use strict';


var map;
     function initMap() {
       map = new google.maps.Map(document.getElementById('map'), {
         zoom: 4,
         center: new google.maps.LatLng(47.608013,-122.335167),
         mapTypeId: 'terrain'
       });

       var script = document.createElement('script');
       script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
       document.getElementsByTagName('head')[0].appendChild(script);
     }

     window.eqfeed_callback = function(results) {
       for (var i = 0; i < results.features.length; i++) {
         var coords = results.features[i].geometry.coordinates;
         var latLng = new google.maps.LatLng(coords[1],coords[0]);
         var marker = new google.maps.Marker({
           position: latLng,
           map: map
         });
       }
     }








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
