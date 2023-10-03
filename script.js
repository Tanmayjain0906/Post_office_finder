if(localStorage.getItem("location"))
{
    window.location.href = "/getStarted";
}

navigator.geolocation.getCurrentPosition(onSuccess, onError);

function onSuccess(position)
{
    let {latitude, longitude} = position.coords;
    let location = {
        lat: latitude,
        long: longitude
    }
    localStorage.setItem("location",JSON.stringify(location));
    window.location.href = "/getStarted";
}

function onError(error) {

    alert(error.message);
}