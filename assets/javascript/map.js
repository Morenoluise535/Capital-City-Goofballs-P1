  //google maps API Places library

  // populating the map postion
  window.initAutocomplete = function() {
      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 34.0522, lng: -118.2437},
        zoom: 13,
        mapTypeId: 'roadmap'
      });
  
      // Create the search box and link it to the UI element.
      var input = document.getElementById('pac-input');
      var searchBox = new google.maps.places.SearchBox(input); 

      // Bias the SearchBox results towards current map's viewport.
      map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
      });
     
      // bring searchBox and do the search
      searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();
          document.getElementById("businessDisplay").innerHTML=""; //clear businessDisplay 
          console.log(places);

          if (places.length == 0) {
            return;
          }

          // initial an marker array  
          var markers = [];
          // iniialize previous infowindow and set it False
          var previous_infowindow = false;

          // For each place, create icon used by marker, bubbleContent using by infowindow
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
              if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
              }

              //create icons for markers
              var icon = {  
                  url: place.icon,
                  size: new google.maps.Size(71, 71),
                  origin: new google.maps.Point(0, 0),
                  anchor: new google.maps.Point(17, 34),
                  scaledSize: new google.maps.Size(25, 25)
              };

              // create bubbleContent and put that in infowindow
              var bubbleContent = "<div class='business-name'>" + place.name +"</div>" + place.formatted_address;
              console.log(bubbleContent);
              var infowindow = new google.maps.InfoWindow({
                    content:bubbleContent
              });

              // Create a marker for each place.
              var marker = new google.maps.Marker({
                  map: map,
                  icon: icon,
                  title: place.name,
                  position: place.geometry.location
              });

            //push marker to array of markers[] with bubbleContent
            markers.push(marker);
            
            //creating div to each place and append to businessDisplayDiv
            var item=document.createElement("div");
            item.innerHTML+="<div class='business-name'>"+place.name+"</div>";
            item.innerHTML+="<div>"+place.formatted_address+"</div>";
            document.getElementById("businessDisplay").appendChild(item);
            
            //onclick on item, invoke infowindow on map's marker
            item.onclick=function(){
                if( previous_infowindow ) { //if previous infowindow is true, which is initialized as False
                  previous_infowindow.close();
                }    
                previous_infowindow = infowindow; 
                infowindow.open(map,marker);
            }

            //on click marker, invoke infowindow on map's marker
            marker.addListener('click', function() {
                if( previous_infowindow ) {
                  previous_infowindow.close();
                }    
                previous_infowindow = infowindow;
                infowindow.open(map, marker);
            });

            if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });

      map.fitBounds(bounds);
      });
  }

