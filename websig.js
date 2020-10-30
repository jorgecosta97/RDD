window.addEventListener("message", receiveMessage, false);
      var map = L.map('map', {
          center: [41.225895, -7.3329045],
          zoom: 10
      });

L.control.scale().addTo(map);




var OSM = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar', attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'}).addTo(map);
var Stamen_Terrain = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 18,
	ext: 'png'
});
var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});
var Esri_WorldStreetMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
});

//Dados base------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var RDD_layer = L.geoJSON(RDD).addTo(map);
//L.geoJSON(geocaching).addTo(map)
//L.geoJSON(Flickr).addTo(map)
//L.geoJSON(wikiloc).addTo(map);
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//Cluster geocaching----------------------------------------------------------------------------------------------------------------------------------------------------------------

var markers = L.markerClusterGroup();

var geoJsonLayer = L.geoJson(geocaching, {
    onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.address);
    }
});
var ex2 = markers.addLayer(geoJsonLayer);

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
var ex1 = markers.addLayer(geoJsonLayer);

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


//Cluster Flickr----------------------------------------------------------------------------------------------------------------------------------------------------------------

var baseMaps = {
    "Open Street Map": OSM,
    "Stamen Terrain": Stamen_Terrain,
    "Esri Imagery": Esri_WorldImagery,
    "Esri Street Map": Esri_WorldStreetMap
    
};

var overlayMaps = {
    "Região Demarcada do Douro": RDD_layer,
    "Geocaching": ex2,
    "Flickr": ex1,
};


L.control.layers(baseMaps, overlayMaps).addTo(map);

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
