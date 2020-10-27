window.addEventListener("message", receiveMessage, false);
      var map = L.map('map', {
          center: [41.225895, -7.3329045],
          zoom: 10
      });

L.control.scale().addTo(map);




L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar', attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'}).addTo(map);

      

//Dados base------------------------------------------------------------------------------------------------------------------------------------------------------------------------
L.geoJSON(RDD).addTo(map);
//L.geoJSON(geocaching).addTo(map)
//L.geoJSON(Flickr).addTo(map)
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//Cluster geocaching----------------------------------------------------------------------------------------------------------------------------------------------------------------
var markers = L.markerClusterGroup();

var geoJsonLayer = L.geoJson(geocaching, {
    onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.address);
    }
});
markers.addLayer(geoJsonLayer);

map.addLayer(markers);
map.fitBounds(markers.getBounds());
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//Cluster Flickr----------------------------------------------------------------------------------------------------------------------------------------------------------------
var markers = L.markerClusterGroup();

var geoJsonLayer = L.geoJson(Flickr, {
    onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.address);
    }
});
markers.addLayer(geoJsonLayer);

map.addLayer(markers);
map.fitBounds(markers.getBounds());
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

      
function receiveMessage(event) {
    if (!event.origin.includes('wix')) {
        return; 
        }
    const location = event.data;
        map.panTo(location);
        L.marker(location).addTo(map);
        console.log(event);
    }