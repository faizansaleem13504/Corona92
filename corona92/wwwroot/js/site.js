// Write your JavaScript code.

document.addEventListener("DOMContentLoaded", function () {
    // showMap();
});

function myfoo() {

    var lat = new Array(1)
    var long = new Array(1)
    lat[0] = 31.549722;
    long[0] = 74.343611;
    var infected = 6;
    var circle = L.circle([lat[0], long[0]], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 10000 * infected
    }).addTo(mymap).bindPopup("Infected: " + infected.toString(10));


}



function addBaseMaps(map) {
    /*
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1
    }).addTo(map);
  */
    /* //MUBAHSIR CHOICE
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
        maxZoom: 18
    }).addTo(map);
    L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/adminb/webmercator/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    */
    //FAIZAN CHOICE
    L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
}

function addInfectedCities(map, data) {
    for (var d in data) {
        // window.alert(data[d]["province"]);
        var lat = data[d]["latitude"];
        var long = data[d]["longitude"];
        if (data[d]["confirmed"] !== 0) {
            if (data[d]["latitude"] !== 0.0) {
                //window.alert(data[d]["city"]);
                var t_data = document.createElement("p");
                t_data.className = "tooltipmapdata";
                t_data.innerHTML = "<b>" + data[d]["city"] + "</b><br>Confirmed&nbsp " + data[d]["confirmed"].toString(10) + "<br>Deaths &nbsp&nbsp&nbsp&nbsp&nbsp " + data[d]["deaths"].toString(10) + "<br>Recovered " + data[d]["recovered"].toString(10);

                L.circle([data[d]["latitude"], data[d]["longitude"]], {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.8,
                    radius: 5000 * Math.log(data[d]["confirmed"])
                }).addTo(map).bindTooltip(t_data);
            }
        }
    }
}

function showMap(data) {

    var map = L.map('mapid').setView([30.580470, 71.041105], 5);
    //window.alert("map set");
    addBaseMaps(map);
    //window.alert("base maps added");
    var ab = "mub";
    addInfectedCities(map, data);
    //window.alert("infected cities added");
}
