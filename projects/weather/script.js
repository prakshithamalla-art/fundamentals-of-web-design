class WeatherApp {
    constructor() {
        this.API_KEY = 'YOUR_API_KEY'; // Get from OpenWeatherMap
        this.BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
        this.recentSearches = this.loadRecent() || [];
        
        this.init();
    }

    init() {
        // DOM elements
        this.cityInput = document.getElementById('cityInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.locationBtn = document.getElementById('locationBtn');
        this.weatherCard = document.getElementById('weatherCard');
        this.errorMessage = document.getElementById('errorMessage');
        this.loading = document.getElementById('loading');
        
        // Event listeners
        this.searchBtn.addEventListener('click', () => this.searchCity());
        this.locationBtn.addEventListener('click', () => this.getUserLocation());
        this.cityInput.addEventListener('keypress', (e) => {
            if(e.key === 'Enter') this.searchCity();
        });
        
        // Load recent searches
        this.displayRecent();
        
        // Try to load last searched city
        const lastCity = localStorage.getItem('lastCity');
        if(lastCity) {
            this.cityInput.value = lastCity;
            this.searchCity();
        }
    }

    async searchCity() {
        const city = this.cityInput.value.trim();
        if(!city) {
            this.showError('Please enter a city name');
            return;
        }

        this.showLoading();
        try {
            const data = await this.fetchWeather(city);
            this.displayWeather(data);
            this.addToRecent(city);
            localStorage.setItem('lastCity', city);
        } catch(error) {
            this.showError('City not found. Please check the name and try again.');
        } finally {
            this.hideLoading();
        }
    }

    getUserLocation() {
        if(!navigator.geolocation) {
            this.showError('Geolocation is not supported by your browser');
            return;
        }

        this.showLoading();
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const data = await this.fetchWeatherByCoords(
                        position.coords.latitude,
                        position.coords.longitude
                    );
                    this.displayWeather(data);
                    this.cityInput.value = data.name;
                    this.addToRecent(data.name);
                } catch(error) {
                    this.showError('Unable to fetch weather for your location');
                } finally {
                    this.hideLoading();
                }
            },
            () => {
                this.hideLoading();
                this.showError('Unable to get your location. Please enable location access.');
            }
        );
    }

    async fetchWeather(city) {
        const response = await fetch(
            `${this.BASE_URL}?q=${city}&units=metric&appid=${this.API_KEY}`
        );
        
        if(!response.ok) {
            throw new Error('City not found');
        }
        
        return await response.json();
    }

    async fetchWeatherByCoords(lat, lon) {
        const response = await fetch(
            `${this.BASE_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${this.API_KEY}`
        );
        
        if(!response.ok) {
            throw new Error('Location not found');
        }
        
        return await response.json();
    }

    displayWeather(data) {
        document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
        document.getElementById('date').textContent = new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        document.getElementById('temp').textContent = Math.round(data.main.temp);
        document.getElementById('description').textContent = data.weather[0].description;
        document.getElementById('humidity').textContent = `${data.main.humidity}%`;
        document.getElementById('windSpeed').textContent = `${data.wind.speed} m/s`;
        
        // Sunrise/Sunset
        const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
        const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();
        document.getElementById('sunrise').textContent = sunrise;
        document.getElementById('sunset').textContent = sunset;
        
        // Weather icon
        const iconCode = data.weather[0].icon;
        document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        
        this.weatherCard.style.display = 'block';
        this.errorMessage.style.display = 'none';
    }

    showError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.style.display = 'block';
        this.weatherCard.style.display = 'none';
        
        setTimeout(() => {
            this.errorMessage.style.display = 'none';
        }, 3000);
    }

    showLoading() {
        this.loading.style.display = 'block';
        this.weatherCard.style.display = 'none';
    }

    hideLoading() {
        this.loading.style.display = 'none';
    }

    addToRecent(city) {
        if(!this.recentSearches.includes(city)) {
            this.recentSearches.unshift(city);
            if(this.recentSearches.length > 5) {
                this.recentSearches.pop();
            }
            this.saveRecent();
            this.displayRecent();
        }
    }

    displayRecent() {
        const container = document.getElementById('recentList');
        container.innerHTML = this.recentSearches.map(city => `
            <div class="recent-item" onclick="weatherApp.searchRecent('${city}')">
                <span class="city">${city}</span>
                <span class="temp">Click to search</span>
            </div>
        `).join('');
    }

    searchRecent(city) {
        this.cityInput.value = city;
        this.searchCity();
    }

    saveRecent() {
        localStorage.setItem('recentSearches', JSON.stringify(this.recentSearches));
    }

    loadRecent() {
        const saved = localStorage.getItem('recentSearches');
        return saved ? JSON.parse(saved) : [];
    }
}

// Initialize app
const weatherApp = new WeatherApp();
window.weatherApp = weatherApp; // For recent searches onclick