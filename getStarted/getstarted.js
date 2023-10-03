/* Add "https://api.ipify.org?format=json" statement
           this will communicate with the ipify servers in
           order to retrieve the IP address $.getJSON will
           load JSON-encoded data from the server using a
           GET HTTP request */


navigator.geolocation.getCurrentPosition(onSuccess, onError);

function onSuccess(position) {
    let { latitude, longitude } = position.coords;
    let location = {
        lat: latitude,
        long: longitude
    }
    localStorage.setItem("location", JSON.stringify(location));
}

function onError(error) {

    alert(error.message);
    window.location.href = "../index.html";
    localStorage.removeItem("location");
    localStorage.removeItem("ip");
}

if (!localStorage.getItem("location")) {
    alert("Please Allow Permission");
    window.location.href = "../index.html";
}

const bold = document.getElementById("ip-address");
let ip;

$.getJSON("https://api.ipify.org?format=json", function (data) {

    // Setting text of element P with id gfg
    //    $("#ip-address").html(data.ip); // 1st method 
    bold.innerText = data.ip; // 2nd method
    ip = data.ip;
    console.log(ip);

})



const btn = document.getElementById("get-started");

btn.addEventListener("click", () => {
    localStorage.setItem("ip", ip);
    window.location.href = "/PostOffice/index.html";
})

