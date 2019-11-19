let markers;
var map;
$(document).ready(function () {
    $('#get-ajax').click(function () {
        sendDataToServer();
    })
});

function sendDataToServer(){
    $.ajax({
        url:'/sendDataToServer',
        type:'POST',
        data:{
            id: 3,
            name: "Hi"
        },
        contentType: 'application/json',
        success: function(res){
            console.log(res);
            reloadMap();
        }
    })
}

function reloadMap(){
    $.ajax({
        url: '/reloadMap',
        type:'POST',
        contentType: 'application/json',
        success: function (res) {
            var result = JSON.parse(res);
            console.log(result);
            markers.setMap(null);
            let icon = {
                url: "./image/marker.png", // url
                scaledSize: new google.maps.Size(29, 46), // scaled size
            };
            markers = new google.maps.Marker({
                position: result,
                title: "Vị trí hiện tại + 1",
                icon: icon,
            });
            markers.setMap(map);
            //map.setCenter(result);
        }
    });
}
function initMap() {
    var positionCurr = { lat: 21.00136, lng: 105.8484633 };
    map = new google.maps.Map(document.getElementById('map'), {
        center: positionCurr,
        zoom: 18
    });
    markers = new google.maps.Marker({
        position: positionCurr,
        map: map,
        title: "Vị trí hiện tại"
    });
    //addMarker(marker);
    markers.setMap(map);
    //setInterval(function(){ window.location.reload(1); }, 5000);
    setInterval(function(){ reloadMap(); }, 3000);
}
  