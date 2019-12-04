let markers;
var map;
$(document).ready(function () {
    $('#get-ajax').click(function () {
        sendDataToServer();
    })
    $('.send_btt').on('click', function() {
        sendPhone();  
    })
    var timeInterval=setInterval(myTime,1000);

});
function validateVietNamPhone(mobile){
    var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    
    if(mobile !==''){
        if (vnf_regex.test(mobile) == false) 
        {
            alert('Số điện thoại của bạn không đúng định dạng!');
            return 1;
        }else{
            
            return 0;
        }
    }else{
        alert('Bạn chưa điền số điện thoại!');
        return 2;
    }
}
function sendPhone(){
    var number=$('.info_contact .phone_num').val();
    var ret=validateVietNamPhone(number);
   
    debugger
    if(0==ret){
        $.ajax({
            url:'/sendPhone',
            type:'POST',
            data:JSON.stringify({
                "phone":number
            }),
            dataType:'json',
            contentType: 'application/json; charset=utf-8',
            success: function(res){
                console.log(res);
            }
        })

    }

}
function sendDataToServer(){

    $.ajax({
        url:'/sendDataToServer',
        type:'POST',
        data:JSON.stringify({
            MessageSim:"CLBS: 0,105.851631,21.000396,550    OK  "
        }),
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
            $('.lat').text(result.lat);
            $('.long').text(result.lng);
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
function myTime(){
    var date=new Date();
    $('.time').text(date.toLocaleTimeString())
}