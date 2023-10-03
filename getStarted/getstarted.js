/* Add "https://api.ipify.org?format=json" statement
           this will communicate with the ipify servers in
           order to retrieve the IP address $.getJSON will
           load JSON-encoded data from the server using a
           GET HTTP request */
if (!localStorage.getItem("location")) {
    window.location.href = "../index.html";
}

const bold = document.getElementById("ip-address");

$.getJSON("https://api.ipify.org?format=json", function (data) {

    // Setting text of element P with id gfg
    //    $("#ip-address").html(data.ip); // 1st method 
    bold.innerText = data.ip; // 2nd method

})