//Global variables
let lat;
let lon;
let apiKey = "4d7cdd2af95414593ff647ba977d07cf";

document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.getElementById('submit');
    submitButton.addEventListener('click', function(event) {
        event.preventDefault(); // prevent the default form submission
        const city = document.getElementById('city').value.trim(); //trims to remove extra spaces
        const country = document.getElementById('country').value.trim();
        if(city && country) {
            fetchCoords(city, country);
            fetchWeather();
        } else {
            alert("Please enter a valid location");
        }
    })
}) 


//Function to fetch lat and lon for a given city and country
async function fetchCoords(city, country) {


    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=1&appid=${apiKey}`;
    
    try {
        const response = await fetch(url);
        if(!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        console.log(data);

        if(data.length>0) {
            lat = data[0].lat;
            lon = data[0].lon;

            document.getElementById("coords").innerText = `Weather for: ${city}, ${country}`;
        } else {
            throw new Error("No data found for the specified location");
        } 
    } catch(error) {
        console.error("Error fetching coordinates: ",error);
        document.getElementById("coords").innerText = "Error: Enter a valid location";
    }
}


//Function to fetch weather data for a given lat and lon
async function fetchWeather() {
    
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);


        const data = await response.json();
        console.log("Weather data: ",data);

        //Extract relevant weather details
        const temp = data.main.temp;
        const description = data.weather[0].description;
        const feelsLike = data.main.feels_like;
        const windSpeed = data.wind.speed;

        //Convert UTC time to local time based on timezone offset
        const timezoneOffset = data.timezone; 
        const utcTime = new Date();
        const localTime = new Date(utcTime.getTime() + timezoneOffset * 1000);
        const formattedTime = localTime.toLocaleTimeString();
        document.getElementById("time").innerText = `${formattedTime}`;
        

        //Update UI with weather data
        document.getElementById("weather").innerText = `${temp}°C, `;
        document.getElementById("desc").innerText = `${description}`;
        document.getElementById("feelslike").innerText = `${feelsLike}°C,`;
        document.getElementById("windspeed").innerText = `${windSpeed} m/s`;
    
        if(temp>15 && windSpeed<=5) { //if temp is greater than 15 and wind speed is less than 5
            document.getElementById("item1").innerText="Singlet";
            document.getElementById("clothesImage1").src="images/singlet.png";
            document.getElementById("item2").innerText="Shorts";
            document.getElementById("clothesImage2").src="images/shorts.png";
            document.getElementById("item3").innerText="Sunglasses";
            document.getElementById("clothesImage3").src="images/sunglasses.png";
            document.getElementById("item4").innerText="Cap";
            document.getElementById("clothesImage4").src="images/cap.png";
            document.getElementById("item5").innerText="";
            document.getElementById("clothesImage5").src="";
            document.getElementById("item6").innerText="";
            document.getElementById("clothesImage6").src="";
        } else if(temp>15 && wind>5) { //if temp is greater than 15 and wind speed is greater than 5
            document.getElementById("item1").innerText="Singlet";
            document.getElementById("clothesImage1").src="images/singlet.png";
            document.getElementById("item2").innerText="Shorts";
            document.getElementById("clothesImage2").src="images/shorts.png";
            document.getElementById("item3").innerText="Sunglasses";
            document.getElementById("clothesImage3").src="images/sunglasses.png";
            document.getElementById("item4").innerText="Cap";
            document.getElementById("clothesImage4").src="images/gloves.png";
            document.getElementById("item5").innerText="Arm warmers";
            document.getElementById("clothesImage5").src="images/armwarmers.png";
            document.getElementById("item6").innerText="";
            document.getElementById("clothesImage6").src="";

        } else if((temp<=15 && temp>10) && (windSpeed<=5)) { //if temp is less than or equal to 15 and greater than 10 and wind speed is less than 5
            document.getElementById("item1").innerText="T-shirt";
            document.getElementById("clothesImage1").src="images/tshirt.png";
            document.getElementById("item2").innerText="Shorts";
            document.getElementById("clothesImage2").src="images/shorts.png";
            document.getElementById("item3").innerText="Sunglasses";
            document.getElementById("clothesImage3").src="images/sunglasses.png";
            document.getElementById("item4").innerText="Cap";
            document.getElementById("clothesImage4").src="images/cap.png";
            document.getElementById("item5").innerText="";
            document.getElementById("clothesImage5").src="";
            document.getElementById("item6").innerText="";
            document.getElementById("clothesImage6").src="";
        } else if((temp<=15 && temp>10) && (windSpeed>5)) {
            document.getElementById("item1").innerText="T-shirt";
            document.getElementById("clothesImage1").src="images/tshirt.png";
            document.getElementById("item2").innerText="Shorts";
            document.getElementById("clothesImage2").src="images/shorts.png";
            document.getElementById("item3").innerText="Sunglasses";
            document.getElementById("clothesImage3").src="images/sunglasses.png";
            document.getElementById("item4").innerText="Cap";
            document.getElementById("clothesImage4").src="images/cap.png";
            document.getElementById("item5").innerText="Arm warmers";
            document.getElementById("clothesImage5").src="images/armwarmers.png";
            document.getElementById("item6").innerText="";
            document.getElementById("clothesImage6").src="";

        } else if((temp<=10 && temp>5) && (windSpeed<=5)) { //if temp is less than or equal to 10 and greater than 5 and wind speed is less than 5
            document.getElementById("item1").innerText="Long Sleeve";
            document.getElementById("clothesImage1").src="images/longsleeve.png";
            document.getElementById("item2").innerText="Shorts";
            document.getElementById("clothesImage2").src="images/shorts.png";
            document.getElementById("item3").innerText="Cap";
            document.getElementById("clothesImage3").src="images/cap.png";
            document.getElementById("item4").innerText="";
            document.getElementById("clothesImage4").src="";
            document.getElementById("item5").innerText="";
            document.getElementById("clothesImage5").src="";
            document.getElementById("item6").innerText="";
            document.getElementById("clothesImage6").src="";
        } else if((temp<=10 && temp>5) && (windSpeed>5)) { //if temp is less than or equal to 10 and greater than 5 and wind speed is greater than 5
            document.getElementById("item1").innerText="Long Sleeve";
            document.getElementById("clothesImage1").src="images/longsleeve.png";
            document.getElementById("item2").innerText="Shorts";
            document.getElementById("clothesImage2").src="images/shorts.png";
            document.getElementById("item3").innerText="Jacket";
            document.getElementById("clothesImage3").src="images/jacket.png";
            document.getElementById("item4").innerText="Cap";
            document.getElementById("clothesImage4").src="images/cap.png";
            document.getElementById("item5").innerText="";
            document.getElementById("clothesImage5").src="";
            document.getElementById("item6").innerText="";
            document.getElementById("clothesImage6").src="";

        } else if((temp<=5 && temp>0) && (windSpeed<=5)) { // if temp is less than or equal to 5 and greater than 0 and wind speed is less than 5
            document.getElementById("item1").innerText="Long Sleeve";
            document.getElementById("clothesImage1").src="images/longsleeve.png";
            document.getElementById("item2").innerText="Tights";
            document.getElementById("clothesImage2").src="images/tights.png";
            document.getElementById("item3").innerText="Jacket";
            document.getElementById("clothesImage3").src="images/jacket.png";
            document.getElementById("item4").innerText="Beanie";
            document.getElementById("clothesImage4").src="images/beanie.png";
            document.getElementById("item5").innerText="";
            document.getElementById("clothesImage5").src="";
            document.getElementById("item6").innerText="";
            document.getElementById("clothesImage6").src="";
        } else if((temp<=5&&temp>0)&&(windSpeed>5)) { // if temp is less than or equal to 5 and greater than 0 and wind speed is greater than 5
            document.getElementById("item1").innerText="Long Sleeve";
            document.getElementById("clothesImage1").src="images/longsleeve.png";
            document.getElementById("item2").innerText="Tights";
            document.getElementById("clothesImage2").src="images/tights.png";
            document.getElementById("item3").innerText="Jacket";
            document.getElementById("clothesImage3").src="images/jacket.png";
            document.getElementById("item4").innerText="Beanie";
            document.getElementById("clothesImage4").src="images/beanie.png";
            document.getElementById("item5").innerText="Gloves";
            document.getElementById("clothesImage5").src="images/gloves.png";
            document.getElementById("item6").innerText="";
            document.getElementById("clothesImage6").src="";

        } else if((temp<=0&&temp>-5) && (windSpeed<=5)) { // if temp is less than or equal to 0 and greater than -5 and wind speed is less than 5
            document.getElementById("item1").innerText="Long Sleeve";
            document.getElementById("clothesImage1").src="images/longsleeve.png";
            document.getElementById("item2").innerText="Tights";
            document.getElementById("clothesImage2").src="images/tights.png";
            document.getElementById("item3").innerText="Jacket";
            document.getElementById("clothesImage3").src="images/jacket.png";
            document.getElementById("item4").innerText="Beanie";
            document.getElementById("clothesImage4").src="images/beanie.png";
            document.getElementById("item5").innerText="Gloves";
            document.getElementById("clothesImage5").src="images/gloves.png";
            document.getElementById("item6").innerText="Snood";
            document.getElementById("clothesImage6").src="images/snood.png";
        } else if((temp<=0&&temp>-5) && (windSpeed>5)) { // if temp is less than or equal to 0 and greater than -5 and wind speed is greater than 5
            document.getElementById("item1").innerText="Long Sleeve";
            document.getElementById("clothesImage1").src="images/longsleeve.png";
            document.getElementById("item2").innerText="Tights";
            document.getElementById("clothesImage2").src="images/tights.png";
            document.getElementById("item3").innerText="Jacket";
            document.getElementById("clothesImage3").src="images/jacket.png";
            document.getElementById("item4").innerText="Beanie";
            document.getElementById("clothesImage4").src="images/beanie.png";
            document.getElementById("item5").innerText="Gloves";
            document.getElementById("clothesImage6").src="images/gloves.png";
            document.getElementById("item6").innerText="Snood";
            document.getElementById("clothesImage6").src="images/snood.png";

        } else if(temp<=-5) { // if temp is less than or equal to -5
            document.getElementById("item1").innerText="Long Sleeve";
            document.getElementById("clothesImage1").src="images/longsleeve.png";
            document.getElementById("item2").innerText="Tights";
            document.getElementById("clothesImage2").src="images/tights.png";
            document.getElementById("item3").innerText="Heavy Jacket";
            document.getElementById("clothesImage3").src="images/heavyjacket.png";
            document.getElementById("item4").innerText="Beanie";
            document.getElementById("clothesImage4").src="images/beanie.png";
            document.getElementById("item5").innerText="Gloves";
            document.getElementById("clothesImage5").src="images/gloves.png";
            document.getElementById("item6").innerText="Snood";
            document.getElementById("clothesImage6").src="images/snood.png";
        }


        

    } catch (error) {
        console.error("Error fetching weather:", error);
        document.getElementById("weather").innerText = "";
    }
}


//Fetch waether data every 2 seconds
fetchWeather();
setInterval(fetchWeather, 2000); 





