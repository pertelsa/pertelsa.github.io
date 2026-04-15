let map = L.map('map').setView([58.373523, 26.716045], 12);

const esri_world= L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
});
esri_world.addTo(map)

// default map settings
function defaultMapSettings() {
  map.setView([58.373523, 26.716045], 12)
}



addGeoJson('geojson/tartu_city_celltowers_edu.geojson')

// add geoJSON layer
async function addGeoJson(url) {
  const response = await fetch(url)
  const data = await response.json()
  const heatData = data.features.map(heatDataConvert)
  const heatMap = L.heatLayer(heatData, { radius: 10 })
  heatMap.addTo(map)
}
function heatDataConvert(feature) {
  return [
    feature.geometry.coordinates[1],
    feature.geometry.coordinates[0],
    feature.properties.area,
  ]
}




