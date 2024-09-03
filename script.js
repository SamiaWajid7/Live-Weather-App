const input = document.getElementById("cityInput");
const button = document.getElementById("searchBtn");

const weatherInfo = document.getElementById("weatherInfo");
const cityName = document.getElementById("city-name");
const cityTime = document.getElementById("city-time");
const cityTemp = document.getElementById("city-temp");

// Function to fetch weather data from the API
async function getData(cityName) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=f5adad0a75074cfdae1134303240309&q=${cityName}&aqi=yes`
    );
    // Check if the response is not ok
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    // Return the JSON data
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error; // Rethrow to handle it in the calling function
  }
}

// Add click event listener to the search button
button.addEventListener("click", async () => {
  const value = input.value.trim();

  // Check if the input field is empty
  if (value === "") {
    alert("Please enter a city name.");
    return;
  }

  // Disable the button and show loading text
  button.disabled = true;
  button.innerText = "Loading...";

  try {
    const result = await getData(value);

    // Display the weather information
    weatherInfo.style.display = "block";

    // Update the weather information elements with the fetched data
    cityName.innerText = `${result.location.name}, ${result.location.region} - ${result.location.country}`;
    cityTime.innerHTML = result.location.localtime;
    cityTemp.innerHTML = `${result.current.temp_c}°C`;
  } catch (error) {
    // Alert user if there is an error fetching data
    alert("Failed to fetch data. Please try again.");
  } finally {
    // Re-enable the button and reset the text
    button.disabled = false;
    button.innerText = "Search";
  }
});
