'use strict';

const resultsEl = document.getElementById('results');
let map, lat, lon;

  navigator.geolocation.getCurrentPosition(function(location) {
    lat = location.coords.latitude;
    lon = location.coords.longitude;
    initMap(lat, lon);

    let latLng = new google.maps.LatLng(lat, lon);
    let marker = new google.maps.Marker({
      position: latLng,
      map: map
    });

    console.log(`Your latitude and longitude is: ${lat}, ${lon}`);
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
       if(results) console.log('success we have got results');
       if(!results) console.error(err);
       for (let i = 0; i < results.features.length; i++) {
         let magnitude = results.features[i].properties.mag;
         let place = results.features[i].properties.place;
         let coords = results.features[i].geometry.coordinates;
         let latLng = new google.maps.LatLng(coords[1],coords[0]);
         let marker = new google.maps.Marker({
           position: latLng,
           map: map
         });

         let hrEl = document.createElement('hr');
         hrEl.textContent = `Location: ${place} - Magnitude: ${magnitude}`;
         resultsEl.appendChild(hrEl);
       }
     }

     $.ajax({
       url: 'https://randomuser.me/api/',
       dataType: 'json',
       success: function(results) {
         console.log('results.info.seed: ', results.info.seed);
       }
     })
     .then(() => console.log('++++++in the .then() of $.ajax call++++++'));
