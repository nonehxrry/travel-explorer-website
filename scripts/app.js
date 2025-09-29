// --- API KEYS ---
// You MUST sign up for accounts and get your own API keys for this code to work.
const OPENWEATHER_API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; 
const UNSPLASH_ACCESS_KEY = 'YOUR_UNSPLASH_ACCESS_KEY';

// --- DOM ELEMENTS ---
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const destinationInfo = document.getElementById('destination-info');
const destinationName = document.getElementById('destination-name');
const weatherTemp = document.getElementById('weather-temp');
const weatherDesc = document.getElementById('weather-desc');
const photoGrid = document.getElementById('photo-grid');
const loadingMessage = document.getElementById('loading-message');
const errorMessage = document.getElementById('error-message');

// --- EVENT LISTENERS ---
searchBtn.addEventListener('click', handleSearch);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

// --- CORE FUNCTIONS ---

/**
 * Main function to handle the search button click.
 */
function handleSearch() {
    const city = cityInput.value.trim();
    if (!city) {
        alert('Please enter a destination name.');
        return;
    }

    // Reset previous state
    destinationInfo.classList.add('hidden');
    errorMessage.classList.add('hidden');
    loadingMessage.classList.remove('hidden');

    // Fetch data concurrently
    Promise.all([
        fetchWeatherData(city),
        fetchUnsplashPhotos(city)
    ])
    .then(([weatherData, photoUrls]) => {
        loadingMessage.classList.add('hidden');
        if (weatherData && photoUrls) {
            updateWeatherUI(weatherData);
            updatePhotoUI(photoUrls, city);
            destinationInfo.classList.remove('hidden');
        } else {
            // This case is handled by the fetch functions showing the error
        }
    })
    .catch(error => {
        console.error('Fetch error:', error);
        loadingMessage.classList.add('hidden');
        errorMessage.classList.remove('hidden');
    });
}

/**
 * Fetches weather data from OpenWeatherMap API.
 * @param {string} city - The city name to search for.
 */
async function fetchWeatherData(city) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${OPENWEATHER_API_KEY}`;
    
    try {
        const response = await fetch(weatherUrl);
        if (!response.ok) {
            throw new Error('Weather data not found');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather:', error);
        errorMessage.classList.remove('hidden');
        return null;
    }
}

/**
 * Fetches relevant photos from Unsplash API.
 * @param {string} query - The search query for photos.
 */
async function fetchUnsplashPhotos(query) {
    // Request 6 photos for the grid
    const unsplashUrl = `https://api.unsplash.com/search/photos?query=${query}&per_page=6&client_id=${UNSPLASH_ACCESS_KEY}`;
    
    try {
        const response = await fetch(unsplashUrl);
        if (!response.ok) {
            throw new Error('Photo data not found');
        }
        const data = await response.json();
        // Return an array of image URLs
        return data.results.map(photo => photo.urls.small);
    } catch (error) {
        console.error('Error fetching photos:', error);
        // Do not show a full error if only photos fail, maybe show a partial view.
        // For simplicity here, we'll return an empty array if an error occurs.
        return [];
    }
}

/**
 * Updates the weather information on the UI.
 * @param {object} data - The weather API response data.
 */
function updateWeatherUI(data) {
    const tempCelsius = Math.round(data.main.temp);
    const description = data.weather[0].description;

    destinationName.textContent = data.name;
    weatherTemp.textContent = `${tempCelsius}°C`;
    weatherDesc.textContent = description.charAt(0).toUpperCase() + description.slice(1);
}

/**
 * Updates the photo gallery on the UI.
 * @param {string[]} urls - Array of photo URLs.
 * @param {string} altText - Alt text for images.
 */
function updatePhotoUI(urls, altText) {
    photoGrid.innerHTML = ''; // Clear existing photos

    if (urls.length === 0) {
        photoGrid.innerHTML = '<p>No photos available for this query.</p>';
        return;
    }

    urls.forEach(url => {
        const photoDiv = document.createElement('div');
        photoDiv.classList.add('photo-item');
        
        const img = document.createElement('img');
        img.src = url;
        img.alt = `View of ${altText}`;
        
        photoDiv.appendChild(img);
        photoGrid.appendChild(photoDiv);
    });
}
