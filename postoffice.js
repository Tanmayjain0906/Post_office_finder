const userlocation = JSON.parse(localStorage.getItem("location"));

const ipAddress = localStorage.getItem("ip");

const tokenValue = "42e2dd1127b8be";
navigator.geolocation.getCurrentPosition(onSuccess, onError);

function onSuccess(position)
{
    return;
}

function onError(error) {

    
    window.location.href = "./index.html";
    localStorage.removeItem("location");
    localStorage.removeItem("ip");
    localStorage.removeItem("token");
}

const ipAddressValue = document.getElementById("ip-address");
ipAddressValue.innerText = ipAddress;

const lat = document.getElementById("lat");
lat.innerText = userlocation.lat;

const long = document.getElementById("long");
long.innerText = userlocation.long;

const city = document.getElementById("city");
const region = document.getElementById("region");
const org = document.getElementById("org");
const hostname = document.getElementById("host");
const pincode = document.getElementById("pincode");
const cardContainer = document.getElementsByClassName("card-container")[0];
const mapContainer = document.getElementsByClassName("map")[0];
const message = document.getElementById("message");
const date = document.getElementById("date-time");
const timeZone = document.getElementById("time-zone");

async function fetchInfoData()
{
    let ip = localStorage.getItem("ip");
    let url = `https://ipinfo.io/${ip}/geo?token=${tokenValue}`

    let response = await fetch(url);
    let data = await response.json();

    console.log(data);
    addDataToUi(data);
}

fetchInfoData();

function addDataToUi(data)
{
  city.innerText = data.city;
  region.innerText = data.region;
  org.innerText = data.org;
  hostname.innerText = data.hostname?data.hostname:"N/A";
  pincode.innerText = data.postal;
  timeZone.innerText = data.timezone;
  date.innerText = new Date().toLocaleString("en-US", { timeZone: `${data.timezone}` });

  mapContainer.innerHTML = ` <h1>Your Current Location</h1>
  <iframe src="https://maps.google.com/maps?q=${userlocation.lat}, ${userlocation.long}&z=15&output=embed" width="100%" height="550px" frameborder="0" style="border:0"></iframe>`

  fetchPostalData(data.postal);
}

async function fetchPostalData(userPincode)
{
    let url = `https://api.postalpincode.in/pincode/${userPincode}`

    let response = await fetch(url);
    let data = await response.json();

    message.innerText = data[0].Message;
    addDataToCard(data[0].PostOffice);
}

function addDataToCard(data)
{
  data.forEach((ele) => {

    let div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<p>${ele.Name}</p>
    <p>${ele.BranchType}</p>
    <p>${ele.DeliveryStatus}</p>
    <p>${ele.District}</p>
    <p>${ele.Division}</p>`

    cardContainer.appendChild(div);
  })
 
}

function search()
{
  let searchInput = document.getElementById("search").value.toUpperCase().trim();
  
  
  let card = document.getElementsByClassName("card");
  console.log(card[0].children[0]);

  for(let i=0;i<card.length;i++)
  {
    let name = card[i].children[0];
    let nameText = name.innerText.toUpperCase();

    if(nameText.indexOf(searchInput) > -1)
    {
      card[i].style.display = "";
    }
    else
    {
      card[i].style.display = "none";
    }
  }
}