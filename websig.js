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


L.control.layers(baseMaps, overlayMaps, {collapsed:false}).addTo(map);

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//legenda-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

var legenda1 = L.control({position: 'bottomright'});
var legenda2 = L.control({position: 'bottomright'});
var legenda3 = L.control({position: 'bottomright'});
//var legenda4 = L.control({position: 'bottomright'});
//var legenda5 = L.control({position: 'bottomright'});
var legenda6 = L.control({position: 'bottomright'});
var legenda7 = L.control({position: 'bottomright'});
var legenda8 = L.control({position: 'bottomright'});

//configuração das legendas---------------------------------------------------

legenda1.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'legend1');
    div.innerHTML += 'Região Demarcada do Douro     ' + '<img style="vertical-align:middle" src="Imagens/legenda1.png">'
    return div;
};
legenda1.addTo(map);

var legenda2 = L.control({position: 'bottomright'});
legenda2.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'legend2');
  div.innerHTML += 'Fotografias do Flickr     ' + '<img style="vertical-align:middle, height;17px, width:17px" src="Imagens/flickr_min.png">'
  return div;
};
legenda2.addTo(map);

var legenda3 = L.control({position: 'bottomright'});
legenda3.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'legend3');
  div.innerHTML += 'Localização de uma Geocache     ' + '<img style="vertical-align:middle, height;17px, width:17px" src="Imagens/geocaching_min.png">'
  return div;
};
legenda3.addTo(map);

//var legenda4 = L.control({position: 'bottomright'});
//legenda4.onAdd = function (map) {
//  var div = L.DomUtil.create('div', 'legend4');
//  div.innerHTML +=  '<img>'   +  'Heatmap com os dados do Flickr     ' + '<br>'
//  return div;
//};

//var legenda5 = L.control({position: 'bottomright'});
//legenda5.onAdd = function (map) {
//  var div = L.DomUtil.create('div', 'legend5');
//  div.innerHTML +=  '<img>'   +  'Heatmap com os dados do Geocaching     ' + '<br>'
//  return div;
//};

var legenda6 = L.control({position: 'bottomright'});
legenda6.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'legend6');
  div.innerHTML += 'Percursos pedestres realizados pelos utilizadores do Wikiloc     ' + '<img style="vertical-align:middle" src="Imagens/legenda6.png">'
  return div;
};

var legenda7 = L.control({position: 'bottomright'});
legenda7.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'legend7');
  div.innerHTML += 'Pontos de Partida dos percursos do Wikiloc     ' + '<img style="vertical-align:middle" src="Imagens/legenda7.png">'
  return div;
};

var legenda8 = L.control({position: 'bottomright'});
legenda8.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'legend8');
  div.innerHTML +=  'Pontos de Partida dos percursos do Chegada     ' + '<img style="vertical-align:middle" src="Imagens/legenda8.png">'
  return div;
};

//adicionar e retirar a legenda---------------------------------------------------

//legenda1
map.on('overlayadd', function (eventLayer) {
  if (eventLayer.name === 'Região Demarcada do Douro') {
    legenda1.addTo(this); 
  }else {  
}});
map.on('overlayremove', function (eventLayer) {
  if (eventLayer.name === 'Região Demarcada do Douro') {
    this.removeControl(legenda1); 
  }else {
}});

//legenda2
map.on('overlayadd', function (eventLayer2) {
if (eventLayer2.name === 'Flickr') {
  legenda2.addTo(this); 
}else { 
}
});
map.on('overlayremove', function (eventLayer2) {
if (eventLayer2.name === 'Flickr') {
  this.removeControl(legenda2); 
}else {
}});

//legenda3
map.on('overlayadd', function (eventLayer3) {
if (eventLayer3.name === 'Geocaching') {
  legenda3.addTo(this); 
}else { 
}
});
map.on('overlayremove', function (eventLayer3) {
if (eventLayer3.name === 'Geocaching') {
  this.removeControl(legenda3); 
}else {
}});

//legenda4
//map.on('overlayadd', function (eventLayer4) {
//  if (eventLayer4.name === 'Flickr: heatmap') {
//    legenda4.addTo(this); 
//  }else { 
//}});
//map.on('overlayremove', function (eventLayer4) {
//  if (eventLayer4.name === 'Flickr: heatmap') {
//    this.removeControl(legenda4); 
//  }else {
//}});

//legenda5
//map.on('overlayadd', function (eventLayer5) {
//  if (eventLayer5.name === 'Geocaching: heatmap') {
//    legenda5.addTo(this); 
//  }else { 
//}});
//map.on('overlayremove', function (eventLayer5) {
//  if (eventLayer5.name === 'Geocaching: heatmap') {
//    this.removeControl(legenda5); 
//  }else {
//}});

//legenda6
map.on('overlayadd', function (eventLayer6) {
  if (eventLayer6.name === 'Trilhos Wikiloc') {
    legenda6.addTo(this); 
  }else { 
}});
map.on('overlayremove', function (eventLayer6) {
  if (eventLayer6.name === 'Trilhos Wikiloc') {
    this.removeControl(legenda6); 
  }else {
}});

//legenda7
map.on('overlayadd', function (eventLayer7) {
  if (eventLayer7.name === 'Pontos de partida Wikiloc') {
    legenda7.addTo(this); 
  }else { 
}});
map.on('overlayremove', function (eventLayer7) {
  if (eventLayer7.name === 'Pontos de partida Wikiloc') {
    this.removeControl(legenda7); 
  }else {
}});

//legenda8
map.on('overlayadd', function (eventLayer8) {
  if (eventLayer8.name === 'Pontos de chegada Wikiloc') {
    legenda8.addTo(this); 
  }else { 
}});
map.on('overlayremove', function (eventLayer8) {
  if (eventLayer8.name === 'Pontos de chegada Wikiloc') {
    this.removeControl(legenda8); 
  }else {
}});
