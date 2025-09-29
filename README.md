Travel Explorer Website
✈️ Project Overview
The Travel Explorer Website is a lightweight, single-page application designed to simplify the initial stages of trip planning. Users can quickly search for any global destination to instantly view essential information, including current weather conditions and a gallery of high-quality photos. This project eliminates the need to jump between multiple platforms, providing a clean and intuitive interface for exploration.

✨ Key Features
Destination Search: Users can input any city or destination to retrieve data.

Real-time Weather: Displays current temperature (in Celsius) and weather description powered by the OpenWeatherMap API.

Dynamic Photo Gallery: Fetches and displays a grid of beautiful, high-resolution images of the destination using the Unsplash API.

Clean, Responsive Design: Built with modular HTML and CSS for an optimal viewing experience on both desktop and mobile devices.

🛠️ Technology Stack
This project uses a simple, modern stack based on client-side technologies:

Category	Technology	Purpose
Structure	HTML5	Provides the foundational structure of the webpage.
Styling	CSS3	Responsible for clean aesthetics and responsive layouts.
Interactivity	JavaScript (ES6+)	Handles the core logic, API calls, and dynamic UI updates.
Data Sources	OpenWeatherMap API	Supplies current weather data.
Data Sources	Unsplash API	Provides the image catalog for destinations.

Export to Sheets
🚀 Getting Started
Prerequisites
You need to obtain API keys for the external services:

OpenWeatherMap: Sign up and get your API Key.

Unsplash: Register as a developer and get your Access Key.

Installation and Setup
Clone the repository:

Bash

git clone [YOUR GITHUB REPOSITORY LINK]
cd travel-explorer-website
Insert API Keys:
Open the file scripts/app.js and replace the placeholder variables with your actual keys:

JavaScript

const OPENWEATHER_API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; 
const UNSPLASH_ACCESS_KEY = 'YOUR_UNSPLASH_ACCESS_KEY';
Run Locally:
Since this is a static website, you can simply open the index.html file in your web browser. Alternatively, you can use a local server extension (like VS Code's Live Server) for development.

💡 Future Scope (Enhancements)
User Accounts: Implement a backend (e.g., Node.js) to allow users to create accounts and save their favorite destinations.

Itinerary Planner: Integrate features to help users plan and save a multi-day itinerary.

Maps Integration: Use a Maps API (like Google Maps) to display a location map and points of interest.

Advanced Search: Implement auto-suggestion and more robust error handling for user inputs.

Loading States: Enhance the user experience with better visual loading indicators during API fetch times.
