/* =====================
Lab 2: Geocoding and route calculation with Mapzen

So far, we've avoided doing complex operations on our GIS data. With
only front end tools at our disposal and a wide range of competencies
to develop, this is largely unavoidable in a single semester class. Luckily
enough, there now exist *free* online resources which can greatly reduce
the complexity of implementing some of these harder and more computationally
intensive tasks.

In this lab, we'll be using a few new features to actually plot out a route
from (roughly) where you are to a location you specify by typing in an address.

There are a few steps involved here. First, we'll go over (at a very high level)
these steps which the application must complete to be usable as a routing tool.
After that, a sequence of tasks will guide you through the process of building
this logic.

*Overview*

1. We need to know where we are currently (in the form of a lat/lng pair) so
    that we can plot this location and later use it as the origin for our route.
    Note: this has been provided for you. The application should automatically
    determine your location when you open it.
2. We'll need to find some way of converting the text from an input box into
    (at least one) lat/lng pair
3. With both an origin and a destination, we should be able to get directions
4. Directions should come back in a form which can be processed into a line which
    we can then plot on our map


*Tasks*

Task 0 (optional): Prepare your tools so that you can efficiently explore this problem

This could very well be the first complex set of API interactions you've had to
reason about. As is the case with most programming challenges, the faster you can
repeat the steps hypothesis creation ("I think this piece does X when I push Y")
and hypothesis testing ("It looks like X only *sometimes* happens when I push Y"),
the easier your life will be and the faster you'll be able to solve problems. To
this end, there are some nifty tools directly integrated into many modern browsers
which allow us to rapidly prototype API requests.

I suggest Postman, which is available for free in the chrome app store. It provides
a cleaner, easier way to test ajax calls than simply using the console.


Task 1: Use Mapzen's 'Search' API to 'geocode' information from your input

First, check out the documentation here: https://mapzen.com/documentation/search/
You might note that this task is slightly underspecified: there are multiple different
ways to transform text into an address. For the lab, the simplest (unstructured)
text-based 'search' is entirely appropriate. The win for structured search is that it
is far less likely to return bogus results.

To reiterate: you should experiment with this API and come to an understanding of how
it works BEFORE writing code you expect to use it. This can be done in the console or
in a REST client like Postman mentioned above.

Questions you should ask yourself:
  - What are the inputs?
  - How does the output look?
  - What can I do with the output?
  - Can I get a lat/lng from the output?

/* =====================

=====================  */

// https://valhalla.mapzen.com/route?api_key=mapzen-Dok7vcm&json={%22locations%22:[{%22lat%22:41.648188,%22lon%22:-86.133938},{%22lat%22:41.648188,%22lon%22:-86.1347758}],%22costing%22:%22auto%22,%22directions_options%22:{%22units%22:%22miles%22}}


var url = "https://search.mapzen.com/v1/search?api_key=mapzen-Dok7vcm&text=";
var newurl = "";

var urlsmproute = "https://valhalla.mapzen.com/optimized_route?api_key=mapzen-Dok7vcm&json=";
var newurlsmproute = "";

var urlmultiroute = "https://valhalla.mapzen.com/route?api_key=mapzen-Dok7vcm&json=";
var newurlmultiroute = "";

var featureGroup = [];
var filteredfeatureGroup = [];

var jsontoadd = {"locations":[],"costing":"auto","directions_options":{"units":"miles"}};


var OriginLat = "";
var OriginLon = "";
var DestLat = "";
var DestLon = "";

// TESTING WITH SIMPLE POINTS, BUT STILL GETTING ERRORS.
// var routetest = "https://valhalla.mapzen.com/optimized_route?api_key=mapzen-Dok7vcm&json=";
// var newroutetest = "";
// var jsontoadd0 = {"locations":[{"lat":39.91,"lon":-73.16},{"lat":39.92,"lon":-73.15}],"costing":"auto","directions_options":{"units":"miles"}};
// // {"locations":[{"lat":40.042072,"lon":-76.306572},{"lat":39.992115,"lon":-76.781559},{"lat":39.984519,"lon":-76.6956}],"costing":"auto","directions_options":{"units":"miles"}}
// $(document).ready(function(){
//   newroutetest = routetest + JSON.stringify(jsontoadd0);
//   console.log("test1");
//   console.log(newroutetest);
//   $.ajax(newroutetest).done(function(data){
//     console.log("test2");
//     var parsedDatatest = JSON.parse(JSON.stringify(data));
//     console.log(newroutetest);
//   });
// });


$('#Search').click(function(){
  $(document).ready(function() {
    newurl = url + $('#dest').val();
    console.log(newurl);
    $.ajax(newurl).done(function(data){
      console.log("downloaded");
      var parsedData = JSON.parse(JSON.stringify(data));
      console.log("parsed");
      featureGroup.push(L.geoJSON(parsedData,{
      }).addTo(map));
      // DestLat = data.features[0].geometry.coordinates[1];
      // DestLon = data.features[0].geometry.coordinates[0];
      // console.log(featureGroup._layers[50]._latlng);
    });
  });
});


// Problem shooting:
// Use JSON validator to test the problems.
// use valhalla instead of matrix
// limit it to the head one! you can use the underscore function "take"
// var hundered =
// if wanna do multiple points: just use route not optimized_route


///////QUESTIONS 2:
///////STILL NEED TO ASK??? HOW TO EXTRACT FROM OBJECT?// jsontoadd.locations.push({"lat":state.position.marker._latlng.lat,"lon":state.position.marker._latlng.lng},{"lat":featureGroup[0]._layers.100._latlng.lat,"lon":featureGroup[0]._layers.100._latlng.lng});

//https://valhalla.mapzen.com/route?api_key=mapzen-Dok7vcm&json={%22locations%22:[{%22lat%22:41.648188,%22lon%22:-86.133938},{%22lat%22:40.369055,%22lon%22:-79.627758},{%22lat%22:39.791889,%22lon%22:-76.952834},{%22lat%22:40.178526,%22lon%22:-76.360958},{%22lat%22:39.822383,%22lon%22:-75.873631},{%22lat%22:40.780339,%22lon%22:-79.921847},{%22lat%22:40.817744,%22lon%22:-76.902074},{%22lat%22:40.371055,%22lon%22:-77.057653},{%22lat%22:40.102854,%22lon%22:-77.339839},{%22lat%22:40.436952,%22lon%22:-76.077936}],%22costing%22:%22auto%22,%22directions_options%22:{%22units%22:%22miles%22}}

// "lat":state.position.marker._latlng.lat,"lon":state.position.marker._latlng.lon


$('#SmpRoute').click(function(){
  $(document).ready(function() {
    jsontoadd.locations.push({"lat":OriginLat,"lon":OriginLon},{"lat":DestLat,"lon":DestLon});
      console.log("points added");
    // need to remove the last three points!!!
    newurlsmproute = urlsmproute + JSON.stringify(jsontoadd);
    // at=39.993096&focus.point.lon=-75.175034&boundary.circle.lat=39.993096&boundary.circle.lon=-75.175034&boundary.circle.radius=100';
    console.log(newurlsmproute);
    $.ajax(newurlsmproute).done(function(data){

/////QUESTIONS 3:
/////{"error_code":106,"error":"Try any of:'\/locate' '\/route' '\/trace_route' '\/trace_attributes' ","status_code":404,"status":"Not Found"}///////////////
/////Or this one: // {"error_code":154,"error":"Path distance exceeds the max distance limit","status_code":400,"status":"Bad Request"}
      console.log("downloaded1");

    });
  });
});




$('#Route').click(function(){
  $(document).ready(function() {
    // console.log(featureGroup[0]._layers[49]._latlng);
    _.each(featureGroup[0]._layers,function(item){
      jsontoadd.locations.push({"lat":item._latlng.lat,"lon":item._latlng.lng});
      console.log("item run");
    });

    // need to remove the last three points!!!
    newurlmultiroute = urlmultiroute + JSON.stringify(jsontoadd);
    // at=39.993096&focus.point.lon=-75.175034&boundary.circle.lat=39.993096&boundary.circle.lon=-75.175034&boundary.circle.radius=100';
    console.log(newurlmultiroute);

    $.ajax(newurlmultiroute).done(function(data){
      // {"error_code":154,"error":"Path distance exceeds the max distance limit","status_code":400,"status":"Bad Request"}
      console.log("downloaded1");
      var parsedPoints = JSON.parse(JSON.stringify(data));
      filteredfeatureGroup.push(L.geoJSON(parsedPoints,{
      }).addTo(map));
      console.log("parsed1");
    });
  });
});


/* =====================
Task 2: Use Mapzen's 'Mobility' API to generate a route based on your origin and destination

The docs: https://mapzen.com/documentation/mobility/
Again, the task is somewhat underspecified. Let's start with the simplest routing
option available: 'Optimized Route' (https://mapzen.com/documentation/mobility/optimized/api-reference/).
Once you're getting a valid (as best you can tell) response from the server, move
to the next task.

/* =====================

=====================  */

// var points = {"locations":[{"lat":,"lon":},{}]};


$('#Decode').click(function(){
  $(document).ready(function(){
    $.ajax(newurlmultiroute).done(function(data){
      var string = data.trip.legs[0].shape;
      console.log("string");
      var decodedData = decode(string,6);
      console.log(decodedData);

      //CONVERT TO GEOJSON LINE//
      var PlotLine =
      {
              "id": "route",
              "type": "line",
              "source": {
                  "type": "geojson",
                  "data": {
                      "type": "Feature",
                      "properties": {},
                      "geometry": {
                          "type": "LineString",
                          "coordinates": [
                              [decodedData[0][1],decodedData[0][0]],
                              [decodedData[1][1],decodedData[1][0]]
                          ]
                      }
                  }
              }
      };
      console.log(PlotLine);

      /////////////QUESTIONS4:
      /////////////always reporting "invalid geoJSON object".
      // var newlayer = PlotLine.addTo(map);
      L.geoJSON(PlotLine,{}).addTo(map);


    });
  });
});

// if (i<decodedData.length){
//
// };

/* =====================

Task 3: Decode Mapzen's route response

Intrepid readers may have already discovered that Mapzen route responses are NOT
in the familiar GeoJson format. Rather, they use a special encoding standardized
by google to try and cut down on response sizes and response times. The relevant
docs may be found here: https://mapzen.com/documentation/mobility/decoding/

Luckily for you, we've provided the logic to properly decode such shapes (copied
from the documentation to decode.js). The string you'll have to decode will look
something like this:

`ee~jkApakppCmPjB}TfCuaBbQa|@lJsd@dF|Dl~@pBfb@t@bQ?tEOtEe@vCs@xBuEfNkGdPMl@oNl^eFxMyLrZoDlJ{JhW}JxWuEjL]z@mJlUeAhC}Tzi@kAv`...

Note that the file `decode.js` is included, which introduces a function `decode`.
If you pass the shape string to the `decode` function, it will return an array of
points in [lat, lng] format.

To plot these on the map, write a function to convert them to GeoJSON. Remember:
GeoJSON is just an agreed upon format to storing shapes in JSON. Take a look
at what GeoJSON for a line looks like (you may want to create a line on geojson.io
as an example). How can you convert the array of points into the GeoJSON format?
Hint: GeoJSON defines points as [lng, lat] instead of [lat, lng], so you may need
to flip your coordinates.


Task 4: Plot your route to the map

If you've completed step 3 with valid GeoJson (test it at geojson.io), plotting it
to the map should be a breeze.


Task 5: (stretch) Try and display directions

Included in the response from Mapzen is information about the steps a driver or
or pedestrian (this depends on the 'cost' selected in your request) would have to
take to get from your origin to your destination.


Task 6: (stretch) See if you can refocus the map to roughly the bounding box of your route


===================== */

//Mapzen tools
//Mapzen Keys
// optimized route

var state = {
  position: {
    marker: null,
    updated: null
  }
};

/* We'll use underscore's `once` function to make sure this only happens
 *  one time even if weupdate the position later
 */
var goToOrigin = _.once(function(lat, lng) {
  map.flyTo([lat, lng], 14);
});

/* Given a lat and a long, we should create a marker, store it
 *  somewhere, and add it to the map
 */
var updatePosition = function(lat, lng, updated) {
  if (state.position.marker) { map.removeLayer(state.position.marker); }
  state.position.marker = L.circleMarker([lat, lng], {color: "blue"});
  state.position.updated = updated;
  state.position.marker.addTo(map);
  goToOrigin(lat, lng);
};


// var currentlocation = [lat,lng];

$(document).ready(function() {
  /* This 'if' check allows us to safely ask for the user's current position */
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      updatePosition(position.coords.latitude, position.coords.longitude, position.timestamp);
      console.log("origin");
      OriginLat = state.position.marker._latlng.lat;
      OriginLon = state.position.marker._latlng.lng;
    });
  } else {
    alert("Unable to access geolocation API!");
  }


  /* Every time a key is lifted while typing in the #dest input, disable
   * the #calculate button if no text is in the input
   */
  $('#dest').keyup(function(e) {
    if ($('#dest').val().length === 0) {
      $('#calculate').attr('disabled', true);
    } else {
      $('#calculate').attr('disabled', false);
    }
  });

  // click handler for the "calculate" button (probably you want to do something with this)
  $("#calculate").click(function(e) {
    var dest = $('#dest').val();
    console.log(dest);
  });

});
