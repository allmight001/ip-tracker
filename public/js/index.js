
var mymap;
$.getJSON("https://api.ipify.org/?format=json", function(e) {
  console.log(e.ip);
    geoLocation(e.ip);
});


$("form").on("submit", function(e) {
  geoLocation($(".ip").val());

  e.preventDefault();
});

function geoLocation(ip) {

  var api_key = "at_vHem3RNyemFSwhy28OR2DECLY8Sd1";
    $(function () {
       $.ajax({
           url: "https://geo.ipify.org/api/v1",
           data: {apiKey: api_key, ipAddress: ip},
           success: function(data) {
             var info = data;
             if(mymap != undefined) {mymap.remove()};

             mapReset(info);
              // console.log(info);
              //  $("body").append("<pre>"+ JSON.stringify(data,"",2)+"</pre>");
           }
       });
    });
}
function mapReset(info) {
  mymap = new L.map('mapid').setView([info.location.lat, info.location.lng], 13);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidHJpZGVuNDciLCJhIjoiY2tzcWhqMXBuMGNzYzJ2bzZpam5ua2g0NyJ9.DUKYe-OPTSrSXDywZntk_A', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'your.mapbox.access.token'
  }).addTo(mymap);

  var marker = L.marker([info.location.lat, info.location.lng]).addTo(mymap);

  $(".ip-update").text(info.ip);
  $(".location-update").text(info.location.city + ", " + info.location.country);
  $(".timezone-update").text("UTC" + info.location.timezone);
  $(".isp-update").text(info.isp);
}
// var ip = $()
//
// $.ajax({
//   type" "GET",
//   url: 'https://geo.ipify.org/api/v1?apiKey=at_vHem3RNyemFSwhy28OR2DECLY8Sd1&ipAddress=' + ip,
//   success: function(data) {
//     console.log()
//   }
// })

// L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(mymap);
