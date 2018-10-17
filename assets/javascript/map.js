
    // This example adds a search box to a map, using the Google Place Autocomplete
    // feature. People can enter geographical searches. The search box will return a
    // pick list containing a mix of places and predicted search terms.

    // This example requires the Places library. Include the libraries=places
    // parameter when you first load the API. For example:
    // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

        // $("button").on("click", function(){

        // initAutocomplete();
        // });

    function initAutocomplete() {
      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 34.0522, lng: -118.2437},
        zoom: 13,
        mapTypeId: 'roadmap'
      });
 
      // Create the search box and link it to the UI element.
      var input = document.getElementById('pac-input');
      var searchBox = new google.maps.places.SearchBox(input);
      //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  

      // Bias the SearchBox results towards current map's viewport.
      map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
      });

      searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();
        document.getElementById("businessDisplay").innerHTML=""; //clear businessDisplay 
        console.log(places);

        if (places.length == 0) {
          return;
        }

        var markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
          if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
          }
          var icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          };

          // Create a marker for each place.
          var marker = new google.maps.Marker({
            map: map,
            icon: icon,
            title: place.name,
            position: place.geometry.location
          });
          
            //push marker to array of markers[] with bubble
            markers.push(marker);
            var bubbleContent = place.name + " <br />" + place.formatted_address;
            infowindow = new google.maps.InfoWindow({
              content:bubbleContent
          })
          console.log(place.name);
          console.log(place.formatted_address);
          
          //creating div to each place/address and append to businessDisplayDiv
          var item=document.createElement("div");
          item.innerHTML+="<p>"+place.name+"</p>";
          item.innerHTML+="<p>"+place.formatted_address+"</p>";
          document.getElementById("businessDisplay").appendChild(item);

          //onclick business name/address, invoke infowindow on map's marker
          item.onclick=function(){
            infowindow.open(map,marker);
          }
          
          //on click marker, invoke infowindow on map's marker
          marker.addListener('click', function() {
            infowindow.open(map, marker);
          });


          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
      // });
        map.fitBounds(bounds);
      });
    }

