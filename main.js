const weatherForm = document.querySelector('.weatherForm');
const cityInput = document.querySelector('.cityInput');
const card = document.querySelector('.card')
const apiKey = 'ed6cc2aa736eeb50733972c90bf654b9';

weatherForm.addEventListener("submit", async event => {

    event.preventDefault()

    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){  
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError('Please enter a city')
    }
});

async function getWeatherData(city){

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    
    const response = await fetch(apiUrl);
    
    if(!response.ok){
        throw new Error('Could not fetch weather data')
    }

    return await response.json();

    
}

function displayWeatherInfo(data){
    const {name: city,
        main:{temp, humidity},
        weather: [{description}]} = data;

    card.textContent = '';
    card.style.display = "flex";

    const cityDisplay = document.createElement('h1');
    const tempDisplay = document.createElement('h1');
    const humidityDisplay = document.createElement('p');
    const descDisplay = document.createElement('p');

    cityDisplay.textContent = city + '📍';
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;

    cityDisplay.classList.add('cityDisplay');
    tempDisplay.classList.add('tempDisplay');
    humidityDisplay.classList.add('humidityDsiplay');
    descDisplay.classList.add('descDisplay');

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
}

function displayError(message){

    const errorDisplay = document.createElement('p');
    errorDisplay.textContent = message;
    errorDisplay.classList.add('errorDisplay')

    card.textContent = '';
    card.style.display = 'flex';
    card.appendChild(errorDisplay);
}