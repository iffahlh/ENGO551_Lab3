# ENGO551_Lab3
This website allows users to query building permits in Calgary by date of issue (or ranges for dates of issue) via the Open Calgary API. Locations of queried building permits are then visualized on an interactive map. The video demo for this project can be found [here]()

This website was built with HTML and Javascript. The following libraries and plugins were used in development:
- **[Leaflet.js](https://github.com/Leaflet/Leaflet)** for creating the interactive map
- **[Leaflet.marketcluster](https://github.com/Leaflet/Leaflet.markercluster)** to provide Marker Clustering functionality at certain zoom levels
- **[OverlappingMarkerSpiderfier-Leaflet](https://github.com/jawj/OverlappingMarkerSpiderfier-Leaflet)** to provide Google Earth-like functionality for overlapping markers
- **[Bootstrap 5](https://github.com/twbs/bootstrap)** to create the grid layout of the HTML page

## Project Files
**map.html** - HTML file defining the layout of the site and facilitates the user inputs for date range
**map.js** - Javascript file providing the map and api functionality of this website, using the HTML input dates 