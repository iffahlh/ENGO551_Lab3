// function to set api call
var handleFetch = (date1, date2) => {
    var target="";
    // sets date target depending on which date input is specified by the user
    if(date1!="" && date2==""){
        target=`issueddate=${date1}`;
    }else if (date1=="" && date2!=""){
        target=`issueddate=${date2}`;
    }else if(date1!="" && date2!=""){
        target=`$where=issueddate > '${date1}' and issueddate < '${date2}'`
    }

    // issuing api call 
    if (target!="") {
        fetch(' https://data.calgary.ca/resource/c2es-76ed.geojson?'+target,{
            method: 'get',
            dataType: 'jsonp',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                return response.json(); // Parse the response data as JSON
                } else {
                throw new Error('API request failed');
                }
            })
            .then(data => {
                // send received data to be displayed on map
                console.log(data); // Logging the data to the console
                displayMarkers(data)
                return data;
            })
            .catch(error => {
                // Handle any errors here
                console.error(error); // Logging the error to the console
            })
    }};

// displaying data received from api response on the map
function displayMarkers(data){
    features=data['features'];
    
    // iterating through each point in the api response
    for (feature of features) {
        // setting coordinates of marker
        let long=feature['properties']['longitude'];
        let lat=feature['properties']['latitude'];
        let marker=L.marker([lat, long]);

        //setting marker description to be displayed on popup 
        let issueddate=feature['properties']['issueddate']; 
        let wcg=feature['properties']['workclassgroup'];
        let contractor=feature['properties']['contractorname'];
        let community=feature['properties']['communityname'];
        let address=feature['properties']['originaladdress'];
        let message=`<b>issueddate: </b> ${issueddate}<br><b>workclassgroup: </b> ${wcg}<br><b>contractorname: </b> ${contractor}<br><b>communityname: </b> ${community}<br><b>originaladdress: </b> ${address}<br>`
        marker.desc=message;
        // adding marker to markerClusterGroup class
        markers.addLayer(marker);
        
        // adding the marker to OverlappingMarkerSpidifier class
        oms.addMarker(marker);  // <-- here
    }
    map.addLayer(markers)

}

// map display
var map = L.map('map').setView([51.03, -114.066666], 10);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// classes for overlapping markers and clustered markers
var oms = new OverlappingMarkerSpiderfier(map);
var popup=new L.Popup()
var markers = L.markerClusterGroup({disableClusteringAtZoom: 12});

// listeners for overlapping marker class to open/close popup
oms.addListener('click', function(marker) {
        popup.setContent(marker.desc);
        popup.setLatLng(marker.getLatLng());
        map.openPopup(popup);
});

oms.addListener('spiderfy', function(markers) {
    map.closePopup();
});

// listening for user input and sending inputs to api call
document.querySelectorAll('.dateinput')
.forEach(function(element){
        element.addEventListener('change', function(event){
            map.removeLayer(markers)
            let d1=document.getElementById("date1").value;
            let d2=document.getElementById("date2").value;
            let response=handleFetch(d1,d2);
        });
});