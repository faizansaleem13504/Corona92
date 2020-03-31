// Write your JavaScript code.



var infectedData = [];
var hospitalData = [];
var infectedLayer = null;
var hospitalLayer = null;
var map = null;
var currentLocMarker = null;
var currentLocCircle = null;
var data = null;
var hdata = null;
var provinces = [];
var provinceCount = [];
var cities = [];
var cityCount = [];
function initializeData(data1, data2) {
    data = data1;
    hdata = data2;
    document.getElementById("locationicondiv").style.display = "block";
    document.getElementById("mapbuttondiv").style.display = "block";
}

function addBaseMaps() {
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

function addInfectedCities() {
    for (var d in data) {
        // window.alert(data[d]["province"]);
        if (data[d]["confirmed"] !== 0) {
            if (data[d]["latitude"] !== 0.0) {
                //window.alert(data[d]["city"]);
                var t_data = document.createElement("p");
                t_data.className = "tooltipmapdata";
                t_data.innerHTML = "<b>" + data[d]["city"] + "</b><br>Confirmed&nbsp " + data[d]["confirmed"].toString(10) + "<br>Deaths &nbsp&nbsp&nbsp&nbsp&nbsp " + data[d]["deaths"].toString(10) + "<br>Recovered " + data[d]["recovered"].toString(10);

                var circle = L.circle([data[d]["latitude"], data[d]["longitude"]], {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.8,
                    radius: 5000 * Math.log(data[d]["confirmed"] + 1)
                }).bindTooltip(t_data);
                infectedData.push(circle);
            }
        }
    }
    infectedLayer = L.layerGroup(infectedData);
}
function addHospitals() {
    var hIcon = L.icon({
        iconUrl: '../images/hospital.png',
        iconSize: [24, 24],
    });
    for (var d in hdata) {
        var t_data = document.createElement("p");
        t_data.className = "tooltipmapdata";
        t_data.innerHTML = "<b>" + hdata[d]["name"] + "</b><br> " + hdata[d]["address"] + "<br>" + hdata[d]["city"] + "<br>" + hdata[d]["province"];
        try {
            hospitalData.push(L.marker([hdata[d]["latitude"], hdata[d]["longitude"]], { icon: hIcon }).bindPopup(t_data, { closeButton: false }));
        }
        catch (err) {
            //alert(err);
        }
    }
    //alert("Hospital marker created.");
    hospitalLayer = L.layerGroup(hospitalData);
    //alert("hospital Layer is completed.");
}
function showInfectedLayer() {
    infectedLayer.addTo(map);
    //hospitalLayer.removeLayer(map);
}

function showInfectedLayerWrapper() {
    try {
        map.removeLayer(hospitalLayer);
    }
    catch (err) {
        //alert(err);
    }

    map.addLayer(infectedLayer);
    //alert("Infected Layer added");
}
function showHospitalLayerWrapper() {
    map.removeLayer(infectedLayer);
    map.addLayer(hospitalLayer);
    //alert("Hospital Layer added");
}
function showMap() {
    if (deviceType() == "Mobile") {
        document.getElementById("mapid").style.width = "auto";
        document.getElementById("mapid").style.height = "400px";
        map = L.map('mapid').setView([30.580470, 71.041105], 4);
        //window.alert("map set");
        addBaseMaps(map);
        //window.alert("base maps added");
        addInfectedCities();
        showInfectedLayerWrapper();
        addHospitals();

    }
    else {
        //document.getElementById("mapid").style.width = "unset";
        //document.getElementById("mapid").style.height = "unset";
        map = L.map('mapid').setView([30.580470, 71.041105], 5);
        //window.alert("map set");
        addBaseMaps(map);
        //window.alert("base maps added");
        addInfectedCities();
        showInfectedLayerWrapper();
        addHospitals();
    }
   
    //window.alert("infected cities added");
}


function getLocationLeaflet() {
    if (currentLocMarker === null) {
        map.on('locationfound', onLocationFound);
        map.on('locationerror', onLocationError);

        map.locate({ setView: true, maxZoom: 10 });
    }
    else {
        map.removeLayer(currentLocMarker);
        map.removeLayer(currentLocCircle);
        currentLocMarker = null;
        currentLocCircle = null;
        if (deviceType() == "Mobile") {
            map.setView([30.580470, 71.041105], 4);
        }
        else {
            map.setView([30.580470, 71.041105], 5);
        }

        
        //map.locate({ setView: true, maxZoom: 18 });
    }
}

function onLocationFound(e) {
    if (currentLocMarker === null) {
        var radius = e.accuracy / 10;
        var location = e.latlng;
        currentLocMarker = L.marker(location);
        currentLocCircle = L.circle(location, radius);
        map.addLayer(currentLocMarker);
        map.addLayer(currentLocCircle);
    }
}

function onLocationError(e) {
    //alert(e.message);
}

function checkJson() {
    var otherCount = 0;
    var lowCount = 0;
    for (var d in data) {
        //var city = data[d]["city"];
        if (data[d]["confirmed"] !== 0) {
            if (data[d]["city"] === "Islamabad") {
                cities.push(data[d]["city"]);
                cityCount.push(data[d]["confirmed"]);
                provinces.push(data[d]["province"]);
                provinceCount.push(data[d]["confirmed"]);
            }
            else if (data[d]["city"] === "Total") {
                if (data[d]["province"] !== "Pakistan") {
                    provinces.push(data[d]["province"]);
                    provinceCount.push(data[d]["confirmed"]);

                }
            }
            else {
                if (data[d]["city"] === "Others") {
                    otherCount = otherCount + data[d]["confirmed"];
                } else if (data[d]["confirmed"] < 15) {
                    lowCount = lowCount + data[d]["confirmed"];
                }
                else {
                    cities.push(data[d]["city"]);
                    cityCount.push(data[d]["confirmed"]);
                }

            }
        }
    }

    cities.push("Unspecified Cities");
    cityCount.push(otherCount);
    cities.push("Other Cities (Cumulative)");
    cityCount.push(lowCount);
    console.log("button pressed");
    if (deviceType() == "Mobile") {
        //document.getElementById("comingsoon").innerHTML = "Coming soon on Mobile ......";
        //document.getElementById("myChart").width = "300px";
        document.getElementById("myChart").height = 450;
        //document.getElementById("myChart2").width = "300px";
        document.getElementById("myChart2").height = 600;


        var ctx = document.getElementById("myChart").getContext('2d');
        renderProvinceChart(ctx, provinces, provinceCount);
        //id of div canvas is used to display a chart
        var ctx2 = document.getElementById("myChart2").getContext('2d');
        //Same as above function.
        //Only receives the province name
        renderIndividualProvince(ctx2, cities, cityCount, 'Punjab');

    }
    else {
        //id of div canvas is used to display a chart
        
        //document.getElementById("myChart").width = "100px";
        //document.getElementById("myChart").height = "300px";

        var ctx = document.getElementById("myChart").getContext('2d');


        renderProvinceChart(ctx, provinces, provinceCount);

        //id of div canvas is used to display a chart
        var ctx2 = document.getElementById("myChart2").getContext('2d');


        //Same as above function.
        //Only receives the province name
        renderIndividualProvince(ctx2, cities, cityCount, 'Punjab');    
    }
}

function setVid() {
    try {
        if (deviceType() == "Mobile") {
            document.getElementById("videoframe").width = "300";
            document.getElementById("videoframe").height = "168";
        }
        else {

        }
    }
    catch(err){

    }
}
function my_logo_set() {
    try {
        if (deviceType() == "Mobile") {
            document.getElementById("mymainlogo").width = 85;
            document.getElementById("mymainlogo").height = 64;
            document.getElementById("mymaintext").style.fontSize = "20px";
        }
        else {
           
        }
    }
    catch (err) {

    }
}
function deviceType() {
    var OSName = "Mobile";
    if (navigator.appVersion.indexOf("Win") != -1 && navigator.appVersion.indexOf("Phone") === -1) OSName = "Windows";
    if (navigator.appVersion.indexOf("Macintosh") != -1) OSName = "MacOS";
    if (navigator.appVersion.indexOf("X11") != -1) OSName = "UNIX";
    if (navigator.appVersion.indexOf("Linux") != -1 && navigator.appVersion.indexOf("Android") === -1) OSName = "Linux";
    if (navigator.appVersion.indexOf("facebook.com") != -1) OSName = "facebook";
    if (navigator.appVersion.indexOf("bot") != -1) OSName = "bot";
    if (navigator.appVersion.indexOf("Slerp") != -1) OSName = "bot";
    return OSName;
}

function checkString() {
    alert("string");
}