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

var pp_style = {
    radius: 4,
    fillColor: "#228B22",
    color: "#006400",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.9
};

var pontos_partida = L.geoJSON(pp, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, pp_style);
}});

var pc_style = {
    radius: 4,
    fillColor: "#FF0000",
    color: "#8B0000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.9
};

var pontos_chegada = L.geoJSON(pc, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, pc_style);
}});



//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//wikiloc---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var style_wkl = {
    "color": "#2B2626",
    "weight": 0.75,
    "opacity": 0.6
};


var wikiloc_total = L.geoJSON(wikiloc_total_aw, {
    style: style_wkl
});


//var style_wkl1 = {
//    "color": "#ffffb2",
//    "weight": 2,
//    "opacity": 2
//};
//var style_wkl2 = {
//    "color": "#fecc5c",
//    "weight": 2,
//    "opacity": 1
//};
//var style_wkl3 = {
//    "color": "#fd8d3c",
//    "weight": 2,
//    "opacity": 1
//};
//var style_wkl4 = {
//    "color": "#f03b20",
//    "weight": 2,
//    "opacity": 1
//};
//var style_wkl5 = {
//    "color": "#bd0026",
//    "weight": 2,
//    "opacity": 1
//};

//var wikiloc1 = L.geoJSON(wikiloc_1, {
//    style: style_wkl1
//});
//var wikiloc2 = L.geoJSON(wikiloc_2, {
//    style: style_wkl2
//});
//var wikiloc3 = L.geoJSON(wikiloc_3, {
//    style: style_wkl3
//});
//var wikiloc4 = L.geoJSON(wikiloc_4, {
//    style: style_wkl4
//});
//var wikiloc5 = L.geoJSON(wikiloc_5, {
//    style: style_wkl5
//});

//var wikiloc = L.layerGroup([wikiloc1, wikiloc2, wikiloc3, wikiloc4, wikiloc5]);


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//Cluster geocaching-----------------------------------------------------------------------------------------------------------------------------------------------------------------


var geocaching = L.esri.Cluster.featureLayer({
    url: 'https://services5.arcgis.com/AMh9EzyFGgthLT1q/ArcGIS/rest/services/Geocaching/FeatureServer/0',
    spiderfyOnMaxZoom: false,
    removeOutsideVisibleBounds: true,
    disableClusteringAtZoom: 15,
        iconCreateFunction: function (cluster) {
      var count = cluster.getChildCount();
      var digits = (count + '').length;
      return L.divIcon({
        html: count,
        className: 'cluster digits-' + digits,
        iconSize: null
      });
    },
    pointToLayer: function (geojson, latlng) {
      var magnitude = (geojson.properties.magnitude);
      var earthquakeSymbol = 'Imagens/geocaching.png';
      var mapIcon = L.icon({
        iconUrl: earthquakeSymbol,
        iconSize: [20, 20]
      });

      return L.marker(latlng, {
        icon: mapIcon
      });
    }
}).addTo(map);

geocaching.bindPopup(function (layer) {
    return L.Util.template('<a href = https://www.geocaching.com/geocache/{Name} target="_blank"> Geocache </a', layer.feature.properties);
});


//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//Cluster Flickr----------------------------------------------------------------------------------------------------------------------------------------------------------------


var flickr = L.esri.Cluster.featureLayer({
    url: 'https://services5.arcgis.com/AMh9EzyFGgthLT1q/ArcGIS/rest/services/Flickr_RDD/FeatureServer/0',
    spiderfyOnMaxZoom: true,
    removeOutsideVisibleBounds: true,
    disableClusteringAtZoom: 17,
        iconCreateFunction: function (cluster) {
      var count = cluster.getChildCount();
      var digits = (count + '').length;
      return L.divIcon({
        html: count,
        className: 'cluster_flickr digits_flickr-' + digits,
        iconSize: null
      });
    },
    pointToLayer: function (geojson, latlng) {
      var flickrsymbol = 'Imagens/flickr.png';
      var mapIcon = L.icon({
        iconUrl: flickrsymbol,
        iconSize: [20, 20]
      });

      return L.marker(latlng, {
        icon: mapIcon
      });
    }
}).addTo(map);

flickr.bindPopup(function (layer) {
    return L.Util.template('<a href = "https://www.flickr.com/photos/{owner}/{id2}" target="_blank"> Imagem Flickr </a', layer.feature.properties);
  });


//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//Heatmaps--------------------------------------------------------------------------------------------------------------------------------------------------------------------------


var heatmap_flickr = L.esri.Heat.featureLayer({
    url: 'https://services5.arcgis.com/AMh9EzyFGgthLT1q/ArcGIS/rest/services/Flickr_RDD/FeatureServer/0',
    radius: 15
});

var heatmap_geocaching = L.esri.Heat.featureLayer({
    url: 'https://services5.arcgis.com/AMh9EzyFGgthLT1q/ArcGIS/rest/services/Geocaching/FeatureServer/0',
    radius: 50
});










//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



function receiveMessage(event) {
    if (!event.origin.includes('wix')) {
        return; 
        }
    const location = event.data;
        map.panTo(location);
        L.marker(location).addTo(map);
        console.log(event);
};


//Cluster Flickr----------------------------------------------------------------------------------------------------------------------------------------------------------------

var baseMaps = {
    "Open Street Map": OSM,
    "Stamen Terrain": Stamen_Terrain,
    "Esri Imagery": Esri_WorldImagery,
    "Esri Street Map": Esri_WorldStreetMap
};

var overlayMaps = {
    "Região Demarcada do Douro": RDD_layer,
    "Flickr": flickr,
    "Flickr: heatmap": heatmap_flickr,
    "Geocaching": geocaching,
    "Geocaching: heatmap": heatmap_geocaching,
    "Trilhos Wikiloc": wikiloc_total,
    "Pontos de partida Wikiloc": pontos_partida,
    "Pontos de chegada Wikiloc": pontos_chegada
};


L.control.layers(baseMaps, overlayMaps).addTo(map);

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
